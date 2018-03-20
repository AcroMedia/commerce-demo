<?php

namespace Drupal\commerce_stock_local\Event;

use Drupal\commerce\PurchasableEntityInterface;
use Symfony\Component\EventDispatcher\Event;

/**
 * Defines the filter locations event.
 *
 * @see \Drupal\commerce_stock_local\Event\LocalStockEvents
 */
class FilterLocationsEvent extends Event {

  /**
   * The purchasable entity.
   *
   * @var \Drupal\commerce\PurchasableEntityInterface
   */
  protected $purchasableEntity;

  /**
   * The enabled stock locations.
   *
   * @var \Drupal\commerce_stock_local\Entity\LocalStockLocationInterface
   *   The local stock locations.
   */
  protected $locations;

  /**
   * Constructs a new FilterLocationsEvent object.
   *
   * @param \Drupal\commerce\PurchasableEntityInterface $entity
   *   The purchasable entity.
   * @param \Drupal\commerce_stock_local\Entity\LocalStockLocationInterface[] $locations
   *   The local stock locations.
   */
  public function __construct(PurchasableEntityInterface $entity, array $locations) {
    $this->purchasableEntity = $entity;
    $this->locations = $locations;
  }

  /**
   * Gets the enabled stock locations.
   *
   * @return \Drupal\commerce_stock_local\Entity\LocalStockLocationInterface[]
   *   Array of local stock locations.
   */
  public function getLocations() {
    return $this->locations;
  }

  /**
   * Sets the enabled stock locations.
   *
   * @param \Drupal\commerce_stock_local\Entity\LocalStockLocationInterface[] $locations
   *   The stock locations.
   */
  public function setLocations(array $locations) {
    $this->locations = $locations;
  }

}
