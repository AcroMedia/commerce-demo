<?php

namespace Drupal\Tests\commerce_stock\Kernel;

use Drupal\commerce\Context;
use Drupal\commerce\PurchasableEntityInterface;
use Drupal\commerce_stock\StockCheckInterface;
use Drupal\commerce_stock\StockLocationInterface;
use Drupal\commerce_stock\StockServiceConfig;
use Drupal\Tests\PhpunitCompatibilityTrait;
use Prophecy\Argument;

/**
 * Tests the stock service configuration.
 *
 * @coversDefaultClass \Drupal\commerce_stock\StockServiceConfig
 *
 * @group commerce_stock
 */
class StockServiceConfigTest extends CommerceStockKernelTestBase {

  use PhpunitCompatibilityTrait;

  /**
   * {@inheritdoc}
   */
  protected function setUp() {
    parent::setUp();
    $this->installConfig(['commerce_stock']);
  }

  /**
   * @covers ::getAvailabilityLocations
   * @covers ::loadConfiguration
   * @covers ::getTransactionLocation
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
    $user = $this->createMock('\Drupal\Core\Session\AccountInterface');
    $store = $this->createMock('Drupal\commerce_store\Entity\StoreInterface');
    $context = new Context($user, $store);

    // Wheter we get only active locations back.
    $locations = $stockServiceConfig->getAvailabilityLocations($context, $entity);
    foreach ($locations as $location) {
      self::assertInstanceOf('Drupal\commerce_stock\StockLocationInterface', $location);
      self::assertTrue($location->isActive());
    }
    self::assertEquals(3, count($locations), 'Only active locations are returned from StockServiceConfig::getAvailabilityLocations()');

    // Whether a active location entity is returned.
    $primary = $stockServiceConfig->getTransactionLocation($context, $entity, 1);
    self::assertInstanceOf('Drupal\commerce_stock\StockLocationInterface', $primary);
    self::assertTrue($primary->isActive(), 'Active location is returned from StockServiceConfig::getTransactionLocation()');

  }

}
