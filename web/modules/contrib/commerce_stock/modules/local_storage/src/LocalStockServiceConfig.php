<?php

namespace Drupal\commerce_stock_local;

use Drupal\commerce\PurchasableEntityInterface;
use Drupal\commerce_stock\StockServiceConfigInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\commerce\Context;

/**
 * The local stock service configuration class.
 */
class LocalStockServiceConfig implements StockServiceConfigInterface {

  /**
   * The stock location storage.
   *
   * @var \Drupal\commerce_stock_local\StockLocationStorageInterface
   */
  protected $storage;

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Constructs the local stock service config.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager) {
    $this->entityTypeManager = $entity_type_manager;
    $this->storage = $entity_type_manager->getStorage('commerce_stock_location');
  }

  /**
   * {@inheritdoc}
   */
  public function getTransactionLocation(Context $context, PurchasableEntityInterface $entity, $quantity) {
    return $this->storage->getTransactionLocation($context, $entity);
  }

  /**
   * {@inheritdoc}
   */
  public function getAvailabilityLocations(Context $context, PurchasableEntityInterface $entity) {
    return $this->storage->loadInContext($context, $entity);
  }

}
