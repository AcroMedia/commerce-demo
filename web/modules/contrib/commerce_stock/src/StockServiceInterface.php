<?php

namespace Drupal\commerce_stock;

/**
 * Defines a common interface for stock checking.
 */
interface StockServiceInterface {

  /**
   * Gets the name of the service.
   */
  public function getName();

  /**
   * Gets the id of the service.
   */
  public function getId();

  /**
   * Gets the stock checker.
   *
   * @return \Drupal\commerce_stock\StockCheckInterface
   *   The stock checker.
   */
  public function getStockChecker();

  /**
   * Gets the stock updater.
   *
   * @return \Drupal\commerce_stock\StockUpdateInterface
   *   The stock updater.
   */
  public function getStockUpdater();

  /**
   * Gets the stock Configuration.
   *
   * @return \Drupal\commerce_stock\StockServiceConfigInterface
   *   The stock Configuration.
   */
  public function getConfiguration();

}
