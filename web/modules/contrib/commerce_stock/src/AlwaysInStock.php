<?php

namespace Drupal\commerce_stock;

use Drupal\commerce\PurchasableEntityInterface;

/**
 * The Checker and updater implementation for the always in stock service.
 */
class AlwaysInStock implements StockCheckInterface, StockUpdateInterface {

  /**
   * {@inheritdoc}
   */
  public function createTransaction(PurchasableEntityInterface $entity, $location_id, $zone, $quantity, $unit_cost, $transaction_type_id, array $metadata) {
    // Do nothing and return a NULL value as its N/A.
    return NULL;
  }

  /**
   * {@inheritdoc}
   */
  public function getTotalStockLevel(PurchasableEntityInterface $entity, array $locations) {
    // @todo this can be configurable?
    return 999;
  }

  /**
   * {@inheritdoc}
   */
  public function getIsInStock(PurchasableEntityInterface $entity, array $locations) {
    return TRUE;
  }

  /**
   * {@inheritdoc}
   */
  public function getIsAlwaysInStock(PurchasableEntityInterface $entity) {
    return TRUE;
  }

  /**
   * {@inheritdoc}
   */
  public function getIsStockManaged(PurchasableEntityInterface $entity) {
    // @todo - Not sure about this one. The result will be the same for:
    // TRUE - managed by this and will always be available.
    // FALSE - not managed so will be available.
    return TRUE;
  }

  /**
   * {@inheritdoc}
   */
  public function getLocationList($return_active_only = TRUE) {
    // We don't have locations, so return an empty array.
    return [];
  }

}
