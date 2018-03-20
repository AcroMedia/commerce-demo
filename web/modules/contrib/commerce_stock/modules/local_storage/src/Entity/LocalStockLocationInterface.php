<?php

namespace Drupal\commerce_stock_local\Entity;

use Drupal\Core\Entity\ContentEntityInterface;

/**
 * Provides an interface for defining local stock location entities.
 */
interface LocalStockLocationInterface extends ContentEntityInterface {

  /**
   * Gets the stock location type.
   *
   * @return string
   *   The stock location type.
   */
  public function getType();

  /**
   * Gets the stock location name.
   *
   * @return string
   *   Name of the stock location.
   */
  public function getName();

  /**
   * Sets the stock location name.
   *
   * @param string $name
   *   The stock location name.
   *
   * @return \Drupal\commerce_stock_local\Entity\LocalStockLocationInterface
   *   The called stock location entity.
   */
  public function setName($name);

  /**
   * Returns the stock location published status indicator.
   *
   * Unpublished stock location are only visible to restricted users.
   *
   * @return bool
   *   TRUE if the stock location is active.
   */
  public function isActive();

  /**
   * Sets the published status of a stock location.
   *
   * @param bool $active
   *   TRUE to set this stock location to active, FALSE to set it to inactive.
   *
   * @return \Drupal\commerce_stock_local\Entity\LocalStockLocationInterface
   *   The called stock location entity.
   */
  public function setActive($active);

}
