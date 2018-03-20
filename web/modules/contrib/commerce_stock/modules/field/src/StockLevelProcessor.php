<?php

namespace Drupal\commerce_stock_field;

use Drupal\Core\TypedData\TypedData;

/**
 * Processor used by the StockLevel field.
 */
class StockLevelProcessor extends TypedData {

  /**
   * Cached processed level.
   *
   * @var int|null
   */
  protected $processed = NULL;

  /**
   * {@inheritdoc}
   */
  public function getValue() {
    if ($this->processed !== NULL) {
      return $this->processed;
    }
    $item = $this->getParent();
    $entity = $item->getEntity();
    /** @var \Drupal\commerce_stock\StockServiceManager $stockServiceManager */
    $stockServiceManager = \Drupal::service('commerce_stock.service_manager');
    $level = $stockServiceManager->getStockLevel($entity);
    $this->processed = $level;
    return $level;
  }

}
