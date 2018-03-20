<?php

namespace Drupal\commerce_stock_local;

use Drupal\commerce\PurchasableEntityInterface;
use Drupal\Core\Entity\Sql\SqlEntityStorageInterface;
use Drupal\commerce\Context;

/**
 * Defines the interface for local stock location storage.
 */
interface StockLocationStorageInterface extends SqlEntityStorageInterface {

  /**
   * Loads the enabled locations for the given Purchasable Entity.
   *
   * Enabled variations are active stock locations that have
   * been filtered through the FILTER_STOCK_LOCATIONS event.
   *
   * @param \Drupal\commerce\PurchasableEntityInterface $entity
   *   The purchasable entity.
   *
   * @return \Drupal\commerce_stock_local\Entity\StockLocation[]
   *   The enabled stock locations.
   */
  public function loadEnabled(PurchasableEntityInterface $entity);

  /**
   * Loads the relevant locations for the given Purchasable Entity and context.
   *
   * Relevant locations are active and available for fulfillment for the product
   * and context provided.
   *
   * @param \Drupal\commerce\Context $context
   *   The context.
   * @param \Drupal\commerce\PurchasableEntityInterface $entity
   *   The purchasable entity.
   *
   * @return \Drupal\commerce_stock_local\Entity\StockLocation[]
   *   The enabled stock locations.
   */
  public function loadInContext(Context $context, PurchasableEntityInterface $entity);

  /**
   * Get the transaction location for the given product and context.
   *
   * @param \Drupal\commerce\Context $context
   *   The context.
   * @param \Drupal\commerce\PurchasableEntityInterface $entity
   *   The purchasable entity.
   *
   * @return \Drupal\commerce_stock_local\Entity\StockLocation[]
   *   The enabled stock locations.
   */
  public function getTransactionLocation(Context $context, PurchasableEntityInterface $entity);

}
