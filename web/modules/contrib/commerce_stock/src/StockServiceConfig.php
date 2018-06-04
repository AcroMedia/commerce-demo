<?php

namespace Drupal\commerce_stock;

use Drupal\commerce\PurchasableEntityInterface;
use Drupal\commerce\Context;

/**
 * The default stock service configuration class.
 *
 * Implementing modules are likely to create their own version of this class.
 */
class StockServiceConfig implements StockServiceConfigInterface {

  /**
   * The stock checker.
   *
   * @var \Drupal\commerce_stock\StockCheckInterface
   */
  protected $stockChecker;

  /**
   * A list of stock locations.
   *
   * @var array
   */
  protected $stockLocations;

  /**
   * Constructs a new StockServiceConfig object.
   *
   * @param \Drupal\commerce_stock\StockCheckInterface $stock_checker
   *   The stock checker.
   */
  public function __construct(StockCheckInterface $stock_checker) {
    // @todo - we need another object that holds information about the locations
    // that we need to check.
    $this->stockChecker = $stock_checker;
    // Load the configuration.
    $this->loadConfiguration();
  }

  /**
   * {@inheritdoc}
   */
  public function getAvailabilityLocations(Context $context, PurchasableEntityInterface $entity) {
    return $this->stockLocations;
  }

  /**
   * {@inheritdoc}
   */
  public function getTransactionLocation(Context $context, PurchasableEntityInterface $entity, $quantity) {
    $locations = $this->getAvailabilityLocations($context, $entity);
    // @todo - we need a better way of managing this.
    return array_shift($locations);
  }

  /**
   * Load the configuration.
   */
  public function loadConfiguration() {
    // For now we will use all active locations for all products.
    // @todo - the loaction information is going to be held by the store
    // entities. We can load it all in advance or query on request.
    $locations = $this->stockChecker->getLocationList(TRUE);
    $this->stockLocations = [];
    foreach ($locations as $key => $value) {
      $this->stockLocations[$key] = $value;
    }
  }

}
