<?php

namespace Drupal\commerce_stock_local\Entity;

use Drupal\views\EntityViewsData;

/**
 * Provides Views data for Stock Location entities.
 */
class StockLocationViewsData extends EntityViewsData {

  /**
   * {@inheritdoc}
   */
  public function getViewsData() {
    $data = parent::getViewsData();

    $data['commerce_stock_location']['table']['base'] = [
      'field' => 'id',
      'title' => $this->t('Commerce stock location'),
      'help' => $this->t('The stock location ID.'),
    ];

    return $data;
  }

}
