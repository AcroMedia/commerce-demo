<?php

namespace Drupal\Tests\commerce_stock_local\Kernel;

use Drupal\commerce_stock\StockCheckInterface;
use Drupal\commerce_stock\StockServiceConfigInterface;
use Drupal\commerce_stock\StockUpdateInterface;
use Drupal\commerce_stock_local\LocalStockService;
use Drupal\Tests\commerce_stock\Kernel\CommerceStockKernelTestBase;
use Prophecy\Argument;

/**
 * Tests the local stock service.
 *
 * @coversDefaultClass \Drupal\commerce_stock_local\LocalStockService
 *
 * @group commerce_stock
 */
class LocalStockServiceTest extends CommerceStockKernelTestBase {

  /**
   * {@inheritdoc}
   */
  public static $modules = [
    'commerce_stock_local',
  ];

  /**
   * {@inheritdoc}
   */
  protected function setUp() {
    parent::setUp();
    $this->installConfig(['commerce_stock']);
    $this->installConfig(['commerce_stock_local']);
  }

  /**
   * Test the local stock service.
   *
   * @covers ::create
   * @covers ::getStockChecker
   * @covers ::getStockUpdater
   * @covers ::getConfiguration
   * @covers ::getName
   * @covers ::getId
   */
  public function testLocalStockService() {

    // Check if we get back, what we passed to the stock service.
    $prophecy = $this->prophesize(StockCheckInterface::class);
    $stockChecker = $prophecy->reveal();
    $stockUpdater = $this->prophesize(StockUpdateInterface::class)->reveal();
    $prophecy = $this->prophesize(StockServiceConfigInterface::class);
    $prophecy->getAvailabilityLocations(Argument::any())->willReturn([1 => 'main']);
    $stockServiceConfig = $prophecy->reveal();

    $localStockService = new LocalStockService($stockChecker, $stockUpdater, $stockServiceConfig);
    self::assertEquals($stockChecker, $localStockService->getStockChecker());
    self::assertEquals($stockUpdater, $localStockService->getStockUpdater());
    self::assertEquals($stockServiceConfig, $localStockService->getConfiguration());

    self::assertEquals('local_stock', $localStockService->getId());
    self::assertEquals('Local stock', $localStockService->getName());

    // Test that instantiation through container works.
    $localStockService = LocalStockService::create($this->container);
    self::assertInstanceOf(LocalStockService::class, $localStockService);
    $stockChecker = $localStockService->getStockChecker();
    self::assertInstanceOf(StockCheckInterface::class, $stockChecker);
    $stockUpdater = $localStockService->getStockUpdater();
    self::assertInstanceOf(StockUpdateInterface::class, $stockUpdater);
    $stockConfig = $localStockService->getConfiguration();
    self::assertInstanceOf(StockServiceConfigInterface::class, $stockConfig);
  }

}
