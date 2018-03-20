<?php

namespace Drupal\commerce_stock;

use Drupal\commerce\PurchasableEntityInterface;

/**
 * The stock service manager interface.
 */
interface StockServiceManagerInterface {

  /**
   * Adds a Stock service.
   *
   * @param \Drupal\commerce_stock\StockServiceInterface $stock_service
   *   The stock service.
   */
  public function addService(StockServiceInterface $stock_service);

  /**
   * Get a service relevant for the entity.
   *
   * @param \Drupal\commerce\PurchasableEntityInterface $entity
   *   The purchasable entity (most likely a product variation entity).
   *
   * @return \Drupal\commerce_stock\StockServiceInterface
   *   The appropriate stock service for the given purchasable entity.
   */
  public function getService(PurchasableEntityInterface $entity);

  /**
   * Returns an array of all registered stock services.
   *
   * @return \Drupal\commerce_stock\StockServiceInterface[]
   *   All registered stock services keyed by service ID.
   */
  public function listServices();

  /**
   * Returns an array of the IDs of all registered stock services.
   *
   * @return array
   *   Array of the IDs of all registered stock services.
   *   Format is: array('service key' => 'service name')
   */
  public function listServiceIds();

}
