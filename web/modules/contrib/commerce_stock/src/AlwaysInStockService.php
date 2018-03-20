<?php

namespace Drupal\commerce_stock;

/**
 * A stock service for always in stock products.
 */
class AlwaysInStockService implements StockServiceInterface {

  /**
   * The stock checker.
   *
   * @var \Drupal\commerce_stock\StockCheckInterface
   */
  protected $stockChecker;

  /**
   * The stock updater.
   *
   * @var \Drupal\commerce_stock\StockUpdateInterface
   */
  protected $stockUpdater;

  /**
   * The stock service configuration.
   *
   * @var \Drupal\commerce_stock\StockServiceConfigInterface
   */
  protected $stockServiceConfig;

  /**
   * Constructs a new AlwaysInStockService object.
   */
  public function __construct() {
    $this->stockChecker = new AlwaysInStock();
    $this->stockUpdater = $this->stockChecker;
    $this->stockServiceConfig = new StockServiceConfig($this->stockChecker);
  }

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'Always in stock';
  }

  /**
   * {@inheritdoc}
   */
  public function getId() {
    return 'always_in_stock';
  }

  /**
   * {@inheritdoc}
   */
  public function getStockChecker() {
    return $this->stockChecker;
  }

  /**
   * {@inheritdoc}
   */
  public function getStockUpdater() {
    return $this->stockUpdater;
  }

  /**
   * {@inheritdoc}
   */
  public function getConfiguration() {
    return $this->stockServiceConfig;
  }

}
