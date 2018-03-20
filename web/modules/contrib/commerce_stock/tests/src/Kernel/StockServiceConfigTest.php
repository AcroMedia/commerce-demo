<?php

namespace Drupal\Tests\commerce_stock\Kernel;

use Drupal\commerce\PurchasableEntityInterface;
use Drupal\commerce_stock\StockCheckInterface;
use Drupal\commerce_stock\StockLocationInterface;
use Drupal\commerce_stock\StockServiceConfig;
use Prophecy\Argument;

/**
 * Tests the stock service configuration.
 *
 * @coversDefaultClass \Drupal\commerce_stock\StockServiceConfig
 *
 * @group commerce_stock
 */
class StockServiceConfigTest extends CommerceStockKernelTestBase {

  /**
   * {@inheritdoc}
   */
  protected function setUp() {
    parent::setUp();
    $this->installConfig(['commerce_stock']);
  }

  /**
   * @covers ::getLocationList
   * @covers ::loadConfiguration
   * @covers ::getPrimaryTransactionLocation
   */
  public function testLocalStockService() {

    $locations = [];

    for ($i = 1; $i < 4; $i++) {
      $prophecy = $this->prophesize(StockLocationInterface::class);
      $prophecy->getId()->willReturn($i);
      $prophecy->isActive()->willReturn(TRUE);
      $locations[] = $prophecy->reveal();
    }

    $prophecy = $this->prophesize(StockCheckInterface::class);
    $prophecy->getLocationList(Argument::is(TRUE))->willReturn($locations);
    $stockChecker = $prophecy->reveal();

    $stockServiceConfig = new StockServiceConfig($stockChecker);

    $prophecy = $this->prophesize(PurchasableEntityInterface::class);
    $entity = $prophecy->reveal();

    // Test that getLocationList() returns active location entities.
    $locations = $stockServiceConfig->getLocationList($entity);
    self::assertEquals(3, count($locations));
    foreach ($locations as $location) {
      self::assertInstanceOf('Drupal\commerce_stock\StockLocationInterface', $location);
      self::assertTrue($location->isActive());
    }

    // Test that getPrimaryTransactionLocation() returns one active location
    // entity.
    $primary = $stockServiceConfig->getPrimaryTransactionLocation($entity, 1);
    self::assertInstanceOf('Drupal\commerce_stock\StockLocationInterface', $primary);
    self::assertTrue($primary->isActive());

  }

}
