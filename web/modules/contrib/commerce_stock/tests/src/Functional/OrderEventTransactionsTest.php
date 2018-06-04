<?php

namespace Drupal\Tests\commerce_stock\Functional;

use Drupal\commerce\Context;
use Drupal\commerce_order\Entity\Order;
use Drupal\commerce_order\Entity\OrderType;
use Drupal\commerce_product\Entity\Product;
use Drupal\commerce_product\Entity\ProductVariationType;
use Drupal\commerce_stock\StockServiceManagerInterface;
use Drupal\commerce_stock\StockTransactionsInterface;
use Drupal\commerce_stock_local\LocalStockChecker;
use Drupal\commerce_stock_local\LocalStockServiceConfig;
use Drupal\commerce_store\StoreCreationTrait;
use Drupal\profile\Entity\Profile;

/**
 * Ensure the stock transactions are performed on order events.
 *
 * @group commerce_stock
 */
class OrderEventTransactionsTest extends StockBrowserTestBase {

  use StoreCreationTrait;

  /**
   * A test product.
   *
   * @var \Drupal\commerce_product\Entity\ProductInterface
   */
  protected $product;

  /**
   * A test variation.
   *
   * @var \Drupal\commerce_product\Entity\ProductVariationInterface
   */
  protected $variation;

  /**
   * A second test variation.
   *
   * @var \Drupal\commerce_product\Entity\ProductVariationInterface
   */
  protected $variation2;

  /**
   * A sample order.
   *
   * @var \Drupal\commerce_order\Entity\OrderInterface
   */
  protected $order;

  /**
   * The stock service manager.
   *
   * @var \Drupal\commerce_stock\StockServiceManagerInterface
   */
  protected $stockServiceManager;

  /**
   * The stock checker.
   *
   * @var \Drupal\commerce_stock\StockCheckInterface
   */
  protected $checker;

  /**
   * The second stock checker.
   *
   * @var \Drupal\commerce_stock\StockCheckInterface
   */
  protected $checker2;

  /**
   * The stock service configuration.
   *
   * @var \Drupal\commerce_stock\stockServiceConfiguration
   */
  protected $stockServiceConfiguration;

  /**
   * The second stock service configuration.
   *
   * @var \Drupal\commerce_stock\stockServiceConfiguration
   */
  protected $stockServiceConfiguration2;

  /**
   * An array of location ids for variation1.
   *
   * @var int[]
   */
  protected $locations;

  /**
   * An array of location ids for variation2.
   *
   * @var int[]
   */
  protected $locations2;

  /**
   * Modules to enable.
   *
   * @var array
   */
  public static $modules = [
    'entity_reference_revisions',
    'path',
    'profile',
    'state_machine',
    'commerce_product',
    'commerce_order',
    'commerce_stock',
    'commerce_stock_field',
    'commerce_stock_local',
    'commerce_stock_local_test',
    'commerce_stock_ui',
    'commerce_store',
  ];

  /**
   * {@inheritdoc}
   */
  protected function setUp() {
    parent::setUp();

    $this->drupalLogin($this->adminUser);

    // Change the workflow of the default order type.
    $order_type = OrderType::load('default');
    $order_type->setWorkflowId('order_fulfillment_validation');
    $order_type->save();

    $user = $this->createUser([], $this->randomString());

    $config = \Drupal::configFactory()
      ->getEditable('commerce_stock.service_manager');
    $config->set('default_service_id', 'local_stock');
    $config->save();
    $this->stockServiceManager = \Drupal::service('commerce_stock.service_manager');

    // Turn off title generation to allow explicit values to be used.
    $variation_type = ProductVariationType::load('default');
    $variation_type->setGenerateTitle(FALSE);
    $variation_type->save();

    $this->variation = $this->createEntity('commerce_product_variation', [
      'type' => 'default',
      'sku' => 'TEST_' . strtolower($this->randomMachineName()),
      'title' => $this->randomString(),
      'status' => 1,
      'price' => [
        'number' => 12.00,
        'currency_code' => 'USD',
      ],
      'field_stock_level' => 10,
    ]);

    $this->variation2 = $this->createEntity('commerce_product_variation', [
      'type' => 'default',
      'sku' => 'TEST_' . strtolower($this->randomMachineName()),
      'title' => $this->randomString(),
      'status' => 1,
      'price' => [
        'number' => 11.00,
        'currency_code' => 'USD',
      ],
      'field_stock_level' => 11,
    ]);

    $this->product = $this->createEntity('commerce_product', [
      'type' => 'default',
      'title' => $this->randomMachineName(),
      'stores' => [$this->store],
      'variations' => [$this->variation, $this->variation2],
    ]);

    $this->checker = $this->stockServiceManager->getService($this->variation)
      ->getStockChecker();
    $this->checker2 = $this->stockServiceManager->getService($this->variation2)
      ->getStockChecker();
    $this->stockServiceConfiguration = $this->stockServiceManager->getService($this->variation)
      ->getConfiguration();
    $this->stockServiceConfiguration2 = $this->stockServiceManager->getService($this->variation2)
      ->getConfiguration();
    $context = new Context($this->loggedInUser, $this->store);
    $this->locations = $this->stockServiceConfiguration->getAvailabilityLocations($context, $this->variation);
    $this->locations2 = $this->stockServiceConfiguration2->getAvailabilityLocations($context, $this->variation2);

    $profile = Profile::create([
      'type' => 'customer',
      'uid' => $user->id(),
    ]);
    $profile->save();

    /** @var \Drupal\commerce_order\Entity\Order $order */
    $order = Order::create([
      'type' => 'default',
      'state' => 'draft',
      'mail' => $user->getEmail(),
      'uid' => $user->id(),
      'ip_address' => '127.0.0.1',
      'order_number' => '6',
      'billing_profile' => $profile,
      'store_id' => $this->store->id(),
    ]);
    $order->save();

    /** @var \Drupal\commerce_order\OrderItemStorageInterface $order_item_storage */
    $order_item_storage = $this->container->get('entity_type.manager')
      ->getStorage('commerce_order_item');

    // Add order item.
    $order_item1 = $order_item_storage->createFromPurchasableEntity($this->variation);
    $order_item1->save();
    $order->addItem($order_item1);
    $order->save();

    $this->order = $order;

  }

  /**
   * Test order save event.
   */
  public function testOrderSaveEvent() {
    // Tests initial stock level transactions set by the field values.
    $this->assertInstanceOf(StockServiceManagerInterface::class, $this->stockServiceManager);
    $this->assertInstanceOf(LocalStockChecker::class, $this->checker);
    $this->assertInstanceOf(LocalStockServiceConfig::class, $this->stockServiceConfiguration);
    $this->assertEquals(10, $this->checker->getTotalStockLevel($this->variation, $this->locations));
    $this->assertEquals(11, $this->checker2->getTotalStockLevel($this->variation2, $this->locations2));
    $query = \Drupal::database()->select('commerce_stock_transaction', 'txn')
      ->fields('txn')
      ->condition('transaction_type_id', StockTransactionsInterface::STOCK_IN);
    $result = $query->execute()->fetchAll();
    $this->assertEquals('1', $result[0]->id);
    $this->assertEquals($this->variation->id(), $result[0]->entity_id);
    $this->assertEquals('stock level set or updated by field', unserialize($result[0]->data)['message']);
    $this->assertEquals('2', $result[1]->id);
    $this->assertEquals($this->variation2->id(), $result[1]->entity_id);
    $this->assertEquals('stock level set or updated by field', unserialize($result[1]->data)['message']);

    // Tests the commerce_order.place.post_transition workflow event.
    $transition = $this->order->getState()->getTransitions();
    $this->order->setOrderNumber('2017/01');
    $this->order->getState()->applyTransition($transition['place']);
    $this->order->save();
    $this->assertEquals($this->order->getState()->getLabel(), 'Validation');
    $this->assertEquals(9, $this->checker->getTotalStockLevel($this->variation, $this->locations));
    $query = \Drupal::database()->select('commerce_stock_transaction', 'txn')
      ->fields('txn')
      ->condition('entity_id', $this->variation->id())
      ->condition('transaction_type_id', StockTransactionsInterface::STOCK_SALE);
    $result = $query->execute()->fetchAll();
    $this->assertCount(1, $result);
    $this->assertEquals('3', $result[0]->id);
    $this->assertEquals($this->variation->id(), $result[0]->entity_id);
    $this->assertEquals($this->order->id(), $result[0]->related_oid);
    $this->assertEquals($this->order->getCustomerId(), $result[0]->related_uid);
    $this->assertEquals('-1.00', $result[0]->qty);
    $this->assertEquals('order placed', unserialize($result[0]->data)['message']);
  }

  /**
   * Tests that transactions are created for the order cancel workflow event.
   */
  public function testWorkflowCancelEvent() {
    $this->assertEquals(9, $this->checker->getTotalStockLevel($this->variation, $this->locations));
    $transition = $this->order->getState()->getTransitions();
    $this->order->getState()->applyTransition($transition['cancel']);
    $this->order->save();
    $this->assertEquals($this->order->getState()->getLabel(), 'Canceled');
    $query = \Drupal::database()->select('commerce_stock_transaction', 'txn')
      ->fields('txn')
      ->condition('entity_id', $this->variation->id())
      ->condition('transaction_type_id', StockTransactionsInterface::STOCK_RETURN);
    $result = $query->execute()->fetchAll();
    $this->assertCount(1, $result);
    $this->assertEquals('4', $result[0]->id);
    $this->assertEquals($this->variation->id(), $result[0]->entity_id);
    $this->assertEquals($this->order->id(), $result[0]->related_oid);
    $this->assertEquals($this->order->getCustomerId(), $result[0]->related_uid);
    $this->assertEquals('1.00', $result[0]->qty);
    $this->assertEquals('order canceled', unserialize($result[0]->data)['message']);
    $this->assertEquals(10, $this->checker->getTotalStockLevel($this->variation, $this->locations));
  }

  /**
   * Test order events.
   *
   * Tests that transactions are created for all other order and order item
   * events.
   */
  public function testOrderEvents() {
    // Tests the order item creation event.
    $this->assertEquals(11, $this->checker2->getTotalStockLevel($this->variation2, $this->locations2));
    $this->drupalGet($this->order->toUrl('edit-form'));
    $this->assertSession()->statusCodeEquals(200);
    $this->submitForm([], 'Add new order item');
    $entity = $this->variation2->getSku() . ' (' . $this->variation2->id() . ')';
    $edit = [
      'order_items[form][inline_entity_form][purchased_entity][0][target_id]' => $entity,
      'order_items[form][inline_entity_form][quantity][0][value]' => '1',
      'order_items[form][inline_entity_form][unit_price][0][number]' => '9.99',
    ];
    $this->submitForm($edit, 'Create order item');
    $edit = [
      'billing_profile[0][profile][address][0][address][given_name]' => 'John',
      'billing_profile[0][profile][address][0][address][family_name]' => 'Smith',
      'billing_profile[0][profile][address][0][address][address_line1]' => '123 Main St.',
      'billing_profile[0][profile][address][0][address][locality]' => 'Mountain View',
      'billing_profile[0][profile][address][0][address][administrative_area]' => 'CA',
      'billing_profile[0][profile][address][0][address][postal_code]' => '94043',
    ];
    $this->submitForm($edit, 'Save');
    $query = \Drupal::database()->select('commerce_stock_transaction', 'txn')
      ->fields('txn')
      ->condition('entity_id', $this->variation2->id())
      ->condition('transaction_type_id', StockTransactionsInterface::STOCK_SALE);
    $result = $query->execute()->fetchAll();
    $this->assertCount(1, $result);
    $this->assertEquals('4', $result[0]->id);
    $this->assertEquals($this->variation2->id(), $result[0]->entity_id);
    $this->assertEquals($this->variation2->getEntityTypeId(), $result[0]->entity_type);
    $this->assertEquals($this->order->id(), $result[0]->related_oid);
    $this->assertEquals($this->order->getCustomerId(), $result[0]->related_uid);
    $this->assertEquals('-1.00', $result[0]->qty);
    $this->assertEquals('order item added', unserialize($result[0]->data)['message']);
    $this->assertEquals(9, $this->checker->getTotalStockLevel($this->variation2, $this->locations2));

    // Tests the order item update event.
    $this->drupalGet($this->order->toUrl('edit-form'));
    $this->click('input[data-drupal-selector="edit-order-items-entities-0-actions-ief-entity-edit"]');
    $edit = [
      'order_items[form][inline_entity_form][entities][0][form][quantity][0][value]' => 3,
    ];
    $this->submitForm($edit, 'Update order item');
    $this->submitForm([], 'Save');
    $query = \Drupal::database()->select('commerce_stock_transaction', 'txn')
      ->fields('txn')
      ->condition('entity_id', $this->variation->id())
      ->condition('transaction_type_id', StockTransactionsInterface::STOCK_SALE);
    $result = $query->execute()->fetchAll();
    $this->assertCount(2, $result);
    $this->assertEquals('5', $result[1]->id);
    $this->assertEquals($this->variation->id(), $result[1]->entity_id);
    $this->assertEquals($this->order->id(), $result[1]->related_oid);
    $this->assertEquals($this->order->getCustomerId(), $result[1]->related_uid);
    $this->assertEquals('-2.00', $result[1]->qty);
    $this->assertEquals('order item quantity updated', unserialize($result[1]->data)['message']);
    $this->assertEquals(7, $this->checker->getTotalStockLevel($this->variation, $this->locations));

    // Tests the order item delete event.
    $this->drupalGet($this->order->toUrl('edit-form'));
    $this->click('input[data-drupal-selector="edit-order-items-entities-0-actions-ief-entity-remove"]');
    $this->click('input[data-drupal-selector="edit-order-items-form-entities-0-form-actions-ief-remove-confirm"]');
    $this->submitForm([], 'Save');
    $query = \Drupal::database()->select('commerce_stock_transaction', 'txn')
      ->fields('txn')
      ->condition('entity_id', $this->variation->id())
      ->condition('transaction_type_id', StockTransactionsInterface::STOCK_RETURN);
    $result = $query->execute()->fetchAll();
    $this->assertCount(1, $result);
    $this->assertEquals('6', $result[0]->id);
    $this->assertEquals($this->variation->id(), $result[0]->entity_id);
    $this->assertEquals($this->order->id(), $result[0]->related_oid);
    $this->assertEquals($this->order->getCustomerId(), $result[0]->related_uid);
    $this->assertEquals('3.00', $result[0]->qty);
    $this->assertEquals('order item deleted', unserialize($result[0]->data)['message']);
    $this->assertEquals(10, $this->checker->getTotalStockLevel($this->variation, $this->locations));

    // Tests the order delete event.
    $this->drupalGet($this->order->toUrl('delete-form'));
    $this->assertSession()->statusCodeEquals(200);
    $this->submitForm([], t('Delete'));
    $query = \Drupal::database()->select('commerce_stock_transaction', 'txn')
      ->fields('txn')
      ->condition('entity_id', $this->variation2->id())
      ->condition('transaction_type_id', StockTransactionsInterface::STOCK_RETURN);
    $result = $query->execute()->fetchAll();
    $this->assertCount(1, $result);
    $this->assertEquals('7', $result[0]->id);
    $this->assertEquals($this->variation2->id(), $result[0]->entity_id);
    $this->assertEquals($this->order->id(), $result[0]->related_oid);
    $this->assertEquals($this->order->getCustomerId(), $result[0]->related_uid);
    $this->assertEquals('1.00', $result[0]->qty);
    $this->assertEquals('order deleted', unserialize($result[0]->data)['message']);
    $this->assertEquals(10, $this->checker->getTotalStockLevel($this->variation, $this->locations));
    $this->assertEquals(10, $this->checker2->getTotalStockLevel($this->variation2, $this->locations2));
  }

}
