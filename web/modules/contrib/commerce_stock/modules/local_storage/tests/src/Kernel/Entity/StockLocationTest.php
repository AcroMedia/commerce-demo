<?php

namespace Drupal\Tests\commerce_stock_local\Kernel\Entity;

use Drupal\commerce_stock_local\Entity\StockLocation;
use Drupal\Tests\commerce_stock\Kernel\CommerceStockKernelTestBase;

/**
 * Test the StockLocation entity.
 *
 * @coversDefaultClass \Drupal\commerce_stock_local\Entity\StockLocation
 *
 * @group commerce_stock
 */
class StockLocationTest extends CommerceStockKernelTestBase {

  /**
   * {@inheritdoc}
   */
  public static $modules = [
    'commerce_stock_local',
  ];

  /**
   * A sample user.
   *
   * @var \Drupal\user\UserInterface
   */
  protected $user;

  /**
   * {@inheritdoc}
   */
  protected function setUp() {
    parent::setUp();

    $this->installEntitySchema('commerce_stock_location_type');
    $this->installEntitySchema('commerce_stock_location');
    $this->installConfig(['commerce_stock']);
    $this->installConfig(['commerce_stock_local']);

    $user = $this->createUser();
    $this->user = $this->reloadEntity($user);
  }

  /**
   * Test stock location.
   *
   * @covers ::getName
   * @covers ::setName
   * @covers ::isActive
   * @covers ::setActive
   */
  public function testStockLocation() {

    $location = StockLocation::create([
      'type' => 'default',
    ]);
    $location->setName('TestName');
    self::assertEquals('TestName', $location->getName());

    self::assertTrue($location->isActive());
    $location->setActive(FALSE);
    self::assertFalse($location->isActive());
    $location->setActive(TRUE);
    self::assertTrue($location->isActive());
  }

}
