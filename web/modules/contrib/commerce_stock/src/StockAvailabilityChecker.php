<?php

namespace Drupal\commerce_stock;

use Drupal\commerce\AvailabilityCheckerInterface;
use Drupal\commerce\PurchasableEntityInterface;
use Drupal\commerce\Context;

/**
 * The entry point for availability checking through Commerce Stock.
 *
 * Proxies requests to stock services configured for each entity.
 *
 * @package Drupal\commerce_stock
 */
class StockAvailabilityChecker implements AvailabilityCheckerInterface {

  /**
   * The stock service manager.
   *
   * @var \Drupal\commerce_stock\StockServiceManagerInterface
   */
  protected $stockServiceManager;

  /**
   * Constructs a new StockAvailabilityChecker object.
   *
   * @param \Drupal\commerce_stock\StockServiceManagerInterface $stock_service_manager
   *   The stock service manager.
   */
  public function __construct(StockServiceManagerInterface $stock_service_manager) {
    $this->stockServiceManager = $stock_service_manager;
  }

  /**
   * {@inheritdoc}
   */
  public function applies(PurchasableEntityInterface $entity) {
    $stock_service = $this->stockServiceManager->getService($entity);
    $stock_checker = $stock_service->getStockChecker();

    return $stock_checker->getIsStockManaged($entity);
  }

  /**
   * {@inheritdoc}
   */
  public function check(PurchasableEntityInterface $entity, $quantity, Context $context) {
    if (empty($quantity)) {
      $quantity = 1;
    }
    $stock_service = $this->stockServiceManager->getService($entity);
    $stock_checker = $stock_service->getStockChecker();

    if ($stock_checker->getIsAlwaysInStock($entity)) {
      return TRUE;
    }

    $stock_config = $stock_service->getConfiguration();
    $stock_level = $stock_checker->getTotalStockLevel(
      $entity,
      $stock_config->getAvailabilityLocations($context, $entity)
    );

    return ($stock_level >= $quantity);
  }

}
