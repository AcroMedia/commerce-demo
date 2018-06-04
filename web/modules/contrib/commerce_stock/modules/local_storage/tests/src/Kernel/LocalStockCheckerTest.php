<?php

namespace Drupal\Tests\commerce_stock_local\Kernel;

use Drupal\commerce_stock_local\Entity\StockLocation;
use Drupal\commerce_stock_local\LocalStockChecker;
use Drupal\Tests\commerce_stock\Kernel\CommerceStockKernelTestBase;

/**
 * Test the LocalStockChecker.
 *
 * @coversDefaultClass \Drupal\commerce_stock_local\LocalStockChecker
 *
 * @group commerce_stock
 */
class LocalStockCheckerTest extends CommerceStockKernelTestBase {

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

    for ($i = 1; $i <= 5; $i++) {
      $location = StockLocation::create([
        'type' => 'default',
        'name' => $this->randomString(),
        'status' => $i % 2,
      ]);
      $location->save();
    }
  }

  /**
   * Get location list.
   *
   * @covers ::getLocationList
   */
  public function testGetLocationList() {
    $entityTypeManager = \Drupal::entityTypeManager();
    $database = \Drupal::database();
    $checker = new LocalStockChecker($database, $entityTypeManager);
    self::assertEquals(3, count($checker->getLocationList()));
    self::assertEquals(5, count($checker->getLocationList(FALSE)));
  }

}
