<?php

namespace Drupal\Tests\commerce_stock_local\Kernel;

use Drupal\commerce_stock_local\Entity\StockLocation;
use Drupal\Tests\commerce_stock\Kernel\CommerceStockKernelTestBase;

/**
 * Test the stock location storage.
 *
 * @group commerce_stock
 */
class StockLocationStorageTest extends CommerceStockKernelTestBase {

  /**
   * The stock location storage.
   *
   * @var \Drupal\commerce_stock_local\StockLocationStorage
   */
  protected $locationStorage;

  /**
   * Modules to enable.
   *
   * @var array
   */
  public static $modules = [
    'commerce_stock_local',
  ];

  /**
   * {@inheritdoc}
   */
  protected function setUp() {
    parent::setUp();

    $this->installEntitySchema('commerce_stock_location');
    $this->installEntitySchema('commerce_stock_location_type');
    $this->installConfig(['commerce_stock']);
    $this->installConfig(['commerce_stock_local']);

    $this->locationStorage = $this->container->get('entity_type.manager')
      ->getStorage('commerce_stock_location');
  }

  /**
   * Tests loadEnabled() function.
   */
  public function testLoadEnabled() {
    for ($i = 1; $i <= 3; $i++) {
      $location = StockLocation::create([
        'type' => 'default',
        'name' => $this->randomString(),
        'status' => $i % 2,
      ]);
      $location->save();
    }

    $dummyPurchasable = $this->prophesize('Drupal\commerce\PurchasableEntityInterface');
    $enabledLocations = $this->locationStorage->loadEnabled($dummyPurchasable->reveal());

    $this->assertEquals(2, count($enabledLocations), '2 out of 3 locations are enabled');
  }

}
