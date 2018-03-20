<?php

namespace Drupal\commerce_stock_local\Event;

/**
 * List of stock location events.
 */
final class LocalStockEvents {

  /**
   * Name of the event fired after loading a stock location.
   *
   * @Event
   *
   * @see \Drupal\commerce_stock_local\Event\StockLocationEvent
   */
  const STOCK_LOCATION_LOAD = 'commerce_stock_local.stock_location.load';

  /**
   * Name of the event fired after creating a new stock location.
   *
   * Fired before the stock location is saved.
   *
   * @Event
   *
   * @see \Drupal\commerce_stock_local\Event\StockLocationEvent
   */
  const STOCK_LOCATION_CREATE = 'commerce_stock_local.stock_location.create';

  /**
   * Name of the event fired before saving a stock location.
   *
   * @Event
   *
   * @see \Drupal\commerce_stock_local\Event\StockLocationEvent
   */
  const STOCK_LOCATION_PRESAVE = 'commerce_stock_local.stock_location.presave';

  /**
   * Name of the event fired after saving a new stock location.
   *
   * @Event
   *
   * @see \Drupal\commerce_stock_local\Event\StockLocationEvent
   */
  const STOCK_LOCATION_INSERT = 'commerce_stock_local.stock_location.insert';

  /**
   * Name of the event fired after saving an existing stock location.
   *
   * @Event
   *
   * @see \Drupal\commerce_stock_local\Event\StockLocationEvent
   */
  const STOCK_LOCATION_UPDATE = 'commerce_stock_local.stock_location.update';

  /**
   * Name of the event fired before deleting a stock location.
   *
   * @Event
   *
   * @see \Drupal\commerce_stock_local\Event\StockLocationEvent
   */
  const STOCK_LOCATION_PREDELETE = 'commerce_stock_local.stock_location.predelete';

  /**
   * Name of the event fired after deleting a stock location.
   *
   * @Event
   *
   * @see \Drupal\commerce_stock_local\Event\StockLocationEvent
   */
  const STOCK_LOCATION_DELETE = 'commerce_stock_local.stock_location.delete';

  /**
   * Name of the event fired after saving a new stock location translation.
   *
   * @Event
   *
   * @see \Drupal\commerce_stock_local\Event\StockLocationEvent
   */
  const STOCK_LOCATION_TRANSLATION_INSERT = 'commerce_stock_local.stock_location.translation_insert';

  /**
   * Name of the event fired after deleting a stock location translation.
   *
   * @Event
   *
   * @see \Drupal\commerce_stock_local\Event\StockLocationEvent
   */
  const STOCK_LOCATION_TRANSLATION_DELETE = 'commerce_stock_local.stock_location.translation_delete';

  /**
   * Name of the event fired when filtering stock locations.
   *
   * @Event
   *
   * @see \Drupal\commerce_stock_local\Event\FilterLocationsEvent
   */
  const FILTER_STOCK_LOCATIONS = "commerce_stock_local.filter_stock_locations";

}
