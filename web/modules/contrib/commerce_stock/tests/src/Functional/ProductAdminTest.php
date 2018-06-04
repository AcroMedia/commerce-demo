<?php

namespace Drupal\Tests\commerce_stock\Functional;

use Drupal\commerce_price\Price;
use Drupal\commerce_product\Entity\ProductVariation;

/**
 * Test that the product creation form contains the stock settings fields.
 *
 * @group commerce_stock
 */
class ProductAdminTest extends StockBrowserTestBase {

  /**
   * Modules to enable.
   *
   * @var array
   */
  public static $modules = [
    'commerce_stock_local',
  ];

  /**
   * Test the create form.
   */
  public function testCreateProductForm() {

    $this->drupalGet('admin/commerce/products');
    $this->getSession()->getPage()->clickLink('Add product');

    $this->assertSession()->fieldExists('variations[form][inline_entity_form][commerce_stock_always_in_stock][value]');
    $this->assertSession()->checkboxNotChecked('variations[form][inline_entity_form][commerce_stock_always_in_stock][value]');

    $store_ids = array_map(function ($store) {
      return $store->id();
    }, $this->stores);
    $title = $this->randomMachineName();
    $edit = [
      'title[0][value]' => $title,
    ];
    foreach ($store_ids as $store_id) {
      $edit['stores[target_id][value][' . $store_id . ']'] = $store_id;
    }
    $variation_sku = $this->randomMachineName();
    $variations_edit = [
      'variations[form][inline_entity_form][sku][0][value]' => $variation_sku,
      'variations[form][inline_entity_form][price][0][number]' => '9.99',
      'variations[form][inline_entity_form][status][value]' => 1,
    ];
    $this->submitForm($variations_edit, t('Create variation'));
    $this->submitForm($edit, t('Save'));
    $this->assertSession()->statusCodeEquals(200);

    $variation = \Drupal::entityQuery('commerce_product_variation')
      ->condition('sku', $variation_sku)
      ->range(0, 1)
      ->execute();

    $variation = ProductVariation::load(current($variation));
    $this->assertNotNull($variation, 'The new product variation has been created.');
    $this->assertEquals('0', $variation->get('commerce_stock_always_in_stock')->getValue()[0]['value']);
  }

  /**
   * Tests editing a product.
   */
  public function testEditProduct() {
    $variation = $this->createEntity('commerce_product_variation', [
      'type' => 'default',
      'sku' => strtolower($this->randomMachineName()),
    ]);
    $product = $this->createEntity('commerce_product', [
      'type' => 'default',
      'variations' => [$variation],
    ]);

    // Check the integrity of the edit form.
    $this->drupalGet($product->toUrl('edit-form'));
    $this->submitForm([], t('Edit'));
    $this->assertSession()->fieldExists('variations[form][inline_entity_form][entities][0][form][commerce_stock_always_in_stock][value]');
    $this->assertSession()->checkboxNotChecked('variations[form][inline_entity_form][entities][0][form][commerce_stock_always_in_stock][value]');
    $title = $this->randomMachineName();
    $store_ids = array_map(function ($store) {
      return $store->id();
    }, $this->stores);
    $edit = [
      'title[0][value]' => $title,
    ];
    foreach ($store_ids as $store_id) {
      $edit['stores[target_id][value][' . $store_id . ']'] = $store_id;
    }

    $checkbox = $this->getSession()->getPage()->findField('variations[form][inline_entity_form][entities][0][form][commerce_stock_always_in_stock][value]');
    if ($checkbox) {
      $checkbox->check();
    }
    // Don't ask why, but the test don't pass, if we only set the stock field.
    // I guess it's because it's a checkbox.
    $variations_edit = [
      'variations[form][inline_entity_form][entities][0][form][price][0][number]' => '11.11',
    ];

    $this->submitForm($variations_edit, 'Update variation');
    $this->submitForm($edit, 'Save');

    \Drupal::service('entity_type.manager')->getStorage('commerce_product_variation')->resetCache([$variation->id()]);
    $variation = ProductVariation::load($variation->id());
    $this->assertEquals(new Price('11.11', 'USD'), $variation->getPrice());
    $this->assertEquals('1', $variation->get('commerce_stock_always_in_stock')->getValue()[0]['value']);
  }

}
