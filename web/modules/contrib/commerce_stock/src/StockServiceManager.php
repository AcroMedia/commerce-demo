<?php

namespace Drupal\commerce_stock;

use Drupal\commerce\PurchasableEntityInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\commerce\Context;

/**
 * The stock service manager.
 *
 * Responsible for handling services and transactions.
 *
 * @see StockAvailabilityChecker.
 *
 * @package Drupal\commerce_stock
 */
class StockServiceManager implements StockServiceManagerInterface, StockTransactionsInterface {

  /**
   * The stock services.
   *
   * @var \Drupal\commerce_stock\StockServiceInterface[]
   */
  protected $stockServices = [];

  /**
   * The config factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * The current store.
   *
   * @var \Drupal\commerce_store\Entity\Store
   */
  protected $currentStore;


  /**
   * The current user.
   *
   * @var \Drupal\Core\Session\AccountInterface
   */
  protected $currentUser;

  /**
   * Constructs a StockServiceManager object.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The config factory.
   */
  public function __construct(ConfigFactoryInterface $config_factory) {
    $this->configFactory = $config_factory;
    $this->currentStore = \Drupal::service('commerce_store.current_store')->getStore();
    $this->currentUser = \Drupal::currentUser();
  }

  /**
   * {@inheritdoc}
   */
  public function addService(StockServiceInterface $stock_service) {
    $this->stockServices[$stock_service->getId()] = $stock_service;
  }

  /**
   * {@inheritdoc}
   */
  public function getService(PurchasableEntityInterface $entity) {
    $config = $this->configFactory->get('commerce_stock.service_manager');

    $default_service_id = $config->get('default_service_id');

    $entity_type = $entity->getEntityTypeId();
    $entity_bundle = $entity->bundle();
    $entity_config_key = $entity_type . '_' . $entity_bundle . '_service_id';
    $entity_service_id = $config->get($entity_config_key);

    $service_id = $entity_service_id ?: $default_service_id;

    return $this->stockServices[$service_id];
  }

  /**
   * {@inheritdoc}
   */
  public function listServices() {
    return $this->stockServices;
  }

  /**
   * {@inheritdoc}
   */
  public function listServiceIds() {
    $ids = [];
    foreach ($this->stockServices as $service) {
      $ids[$service->getId()] = $service->getName();
    }

    return $ids;
  }

  /**
   * {@inheritdoc}
   */
  public function getContext(PurchasableEntityInterface $entity) {
    $found = FALSE;
    return $this->getContextDetails($entity, $found);
  }

  /**
   * {@inheritdoc}
   */
  public function isValidContext(PurchasableEntityInterface $entity) {
    $found = FALSE;
    $this->getContextDetails($entity, $found);
    return $found;
  }

  /**
   * Get context details.
   *
   * @param \Drupal\commerce\PurchasableEntityInterface $entity
   *   The purchaseable entity.
   * @param bool $found
   *   Whether the store was found.
   *
   * @return \Drupal\commerce\Context
   *   The Stock service context.
   *
   * @todo: Why is the found passed in?
   */
  private function getContextDetails(PurchasableEntityInterface $entity, &$found) {
    $store_to_use = $this->currentStore;
    // Make sure the current store is in the entity stores.
    $stores = $entity->getStores();
    $found = FALSE;
    if ($store_to_use) {
      foreach ($stores as $store) {
        if ($store->id() == $store_to_use->id()) {
          $found = TRUE;
          break;
        }
      }
    }
    // If not.
    if (!$found) {
      if (!empty($stores)) {
        // Get the first store the product is assigned to.
        $store_to_use = array_shift($stores);
      }
    }
    return new Context($this->currentUser, $store_to_use);
  }

  /**
   * {@inheritdoc}
   */
  public function getTransactionLocation(Context $context = NULL, PurchasableEntityInterface $entity, $quantity) {
    $stock_config = $this->getService($entity)->getConfiguration();
    return $stock_config->getTransactionLocation($context, $entity, $quantity);
  }

  /**
   * {@inheritdoc}
   */
  public function createTransaction(PurchasableEntityInterface $entity, $location_id, $zone, $quantity, $unit_cost, $transaction_type_id, array $metadata = []) {
    $stock_updater = $this->getService($entity)->getStockUpdater();
    $stock_updater->createTransaction($entity, $location_id, $zone, $quantity, $unit_cost, $transaction_type_id, $metadata);
  }

  /**
   * {@inheritdoc}
   */
  public function receiveStock(PurchasableEntityInterface $entity, $location_id, $zone, $quantity, $unit_cost, $message = NULL) {
    $transaction_type_id = StockTransactionsInterface::NEW_STOCK;
    if (is_null($message)) {
      $metadata = [];
    }
    else {
      $metadata = [
        'data' => [
          'message' => $message,
        ],
      ];
    }
    // Make sure quantity is positive.
    $quantity = abs($quantity);
    $stock_updater = $this->getService($entity)->getStockUpdater();
    $stock_updater->createTransaction($entity, $location_id, $zone, $quantity, $unit_cost, $transaction_type_id, $metadata);
  }

  /**
   * {@inheritdoc}
   */
  public function sellStock(PurchasableEntityInterface $entity, $location_id, $zone, $quantity, $unit_cost, $order_id, $user_id, $message = NULL) {
    $transaction_type_id = StockTransactionsInterface::STOCK_SALE;
    $metadata = [
      'related_oid' => $order_id,
      'related_uid' => $user_id,
    ];
    if (!is_null($message)) {
      $metadata['data']['message'] = $message;
    }
    // Make sure quantity is positive.
    $quantity = -1 * abs($quantity);
    $stock_updater = $this->getService($entity)->getStockUpdater();
    $stock_updater->createTransaction($entity, $location_id, $zone, $quantity, $unit_cost, $transaction_type_id, $metadata);
  }

  /**
   * {@inheritdoc}
   */
  public function moveStock(PurchasableEntityInterface $entity, $from_location_id, $to_location_id, $from_zone, $to_zone, $quantity, $unit_cost, $message = NULL) {
    if (is_null($message)) {
      $metadata = [];
    }
    else {
      $metadata = [
        'data' => [
          'message' => $message,
        ],
      ];
    }
    // Make sure quantity is positive.
    $quantity_from = -1 * abs($quantity);
    $quantity_to = abs($quantity);
    $stock_updater = $this->getService($entity)->getStockUpdater();
    $tid = $stock_updater->createTransaction($entity, $from_location_id, $from_zone, $quantity_from, $unit_cost, StockTransactionsInterface::MOVEMENT_FROM, $metadata);
    // The second transaction will point to the first one.
    $metadata['related_tid'] = $tid;
    $stock_updater->createTransaction($entity, $to_location_id, $to_zone, $quantity_to, $unit_cost, StockTransactionsInterface::MOVEMENT_TO, $metadata);
  }

  /**
   * {@inheritdoc}
   */
  public function returnStock(PurchasableEntityInterface $entity, $location_id, $zone, $quantity, $unit_cost, $order_id, $user_id, $message = NULL) {
    $transaction_type_id = StockTransactionsInterface::STOCK_RETURN;
    $metadata = [
      'related_oid' => $order_id,
      'related_uid' => $user_id,
    ];
    if (!is_null($message)) {
      $metadata['data']['message'] = $message;
    }
    // Make sure quantity is positive.
    $quantity = abs($quantity);
    $stock_updater = $this->getService($entity)->getStockUpdater();
    $stock_updater->createTransaction($entity, $location_id, $zone, $quantity, $unit_cost, $transaction_type_id, $metadata);
  }

  /**
   * Gets the total stock level for a given purchasable entity.
   *
   * @todo - we should make the methode more abscure as it does not suport
   * the context. Only useful for single store sites.
   *
   * @param \Drupal\commerce\PurchasableEntityInterface $entity
   *   The purchasable entity to get the stock level for.
   *
   * @return int
   *   The stock level.
   */
  public function getStockLevel(PurchasableEntityInterface $entity) {
    if ($entity->isNew()) {
      return 0;
    }
    $stock_config = $this->getService($entity)->getConfiguration();
    $stock_checker = $this->getService($entity)->getStockChecker();
    $locations = $stock_config->getAvailabilityLocations($this->getContext($entity), $entity);

    return $stock_checker->getTotalStockLevel($entity, $locations);
  }

}
