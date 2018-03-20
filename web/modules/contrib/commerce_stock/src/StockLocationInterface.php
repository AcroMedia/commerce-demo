<?php

namespace Drupal\commerce_stock;

/**
 * Provides an interface for defining stock locations.
 *
 * This is located under the core module to keep others module
 * independent from commerce stock local.
 */
interface StockLocationInterface {

  /**
   * Gets the stock location id.
   *
   * @return int
   *   The id of the location.
   */
  public function getId();

  /**
   * Gets the stock location name.
   *
   * @return string
   *   Name of the stock location.
   */
  public function getName();

  /**
   * Returns the stock location status indicator.
   *
   * @return bool
   *   TRUE if the stock location is active.
   */
  public function isActive();

}
