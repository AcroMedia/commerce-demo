<?php

namespace Drupal\commerce_stock;

use Drupal\commerce\PurchasableEntityInterface;
use Drupal\commerce\Context;

/**
 * The stock service configuration interface.
 */
interface StockServiceConfigInterface {

  /**
   * Get the location for automatic stock allocation.
   *
   * This is normally a designated location to act as the main warehouse.
   * This can also be a location worked out in realtime using the provided
   * context (order & customer), entity and the quantity requested.
   *
   * @param \Drupal\commerce\Context $context
   *   The context containing the customer & store.
   * @param \Drupal\commerce\PurchasableEntityInterface $entity
   *   The purchasable entity.
   * @param int $quantity
   *   The quantity.
   *
   * @return \Drupal\commerce_stock\StockLocationInterface
   *   The stock location.
   */
  public function getTransactionLocation(Context $context, PurchasableEntityInterface $entity, $quantity);

  /**
   * Get locations holding stock.
   *
   * The locations should be filtered for the provided context and purchasable
   * entity.
   *
   * @param \Drupal\commerce\Context $context
   *   The context containing the customer & store.
   * @param \Drupal\commerce\PurchasableEntityInterface $entity
   *   The purchasable entity.
   *
   * @return \Drupal\commerce_stock\StockLocationInterface[]
   *   List of relevant locations.
   */
  public function getAvailabilityLocations(Context $context, PurchasableEntityInterface $entity);

}
