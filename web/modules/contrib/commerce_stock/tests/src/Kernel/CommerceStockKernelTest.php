<?php

namespace Drupal\Tests\commerce_stock\Kernel;

use Drupal\commerce_product\Entity\ProductVariation;

/**
 * Commerce stock kernel test.
 *
 * @group commerce_stock
 */
class CommerceStockKernelTest extends CommerceStockKernelTestBase {

  /**
   * Modules to enable.
   *
   * Note that when a child class declares its own $modules list, that list
   * doesn't override this one, it just extends it.
   *
   * @var array
   */
  public static $modules = [
    'path',
    'commerce_product',
  ];

  /**
   * {@inheritdoc}
   */
  public function setup() {
    parent::setUp();

    $this->installEntitySchema('commerce_product_variation');
    $this->installEntitySchema('commerce_product_variation_type');
    $this->installEntitySchema('commerce_product');
    $this->installEntitySchema('commerce_product_type');
    $this->installConfig(['commerce_product']);
  }

  /**
   * Test field is added to purchasable entities.
   *
   * Test that a commerce_stock_always_in_stock base field
   * is added to purchasable entities.
   */
  public function testBaseFieldisAddedtoPurchasableEntity() {

    $variation = ProductVariation::create([
      'type' => 'default',
    ]);
    $variation->save();

    // This would throw an Exception, if the field isn't there.
    $field = $variation->get('commerce_stock_always_in_stock');
    // Check the default value is set to FALSE.
    self::assertFalse($field->getValue()[0]['value']);
  }

}
