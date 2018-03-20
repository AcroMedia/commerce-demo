<?php

namespace Drupal\commerce_stock_local\Plugin\QueueWorker;

use Drupal\Core\Queue\QueueWorkerBase;

/**
 * Commerce Stock Local location level update worker.
 *
 * @QueueWorker(
 *   id = "commerce_stock_local_stock_level_updater",
 *   title = @Translation("Commerce Stock Local stock level updater"),
 *   cron = {"time" = 10}
 * )
 *
 * @ToDo Inject the config factory instead of calling \Drupal::
 */
class StockLevelUpdater extends QueueWorkerBase {

  /**
   * {@inheritdoc}
   */
  public function processItem($data) {
    $storage = \Drupal::entityTypeManager()->getStorage($data['entity_type']);
    $entity = $storage->load($data['entity_id']);
    $service = \Drupal::service('commerce_stock.local_stock_service');
    /** @var \Drupal\commerce_stock_local\LocalStockChecker $checker */
    $checker = $service->getStockChecker();
    /** @var \Drupal\commerce_stock_local\LocalStockUpdater $updater */
    $updater = $service->getStockUpdater();
    $locations = $checker->getLocationList(TRUE);
    foreach ($locations as $location) {
      $updater->updateLocationStockLevel($location->getId(), $entity);
    }
  }

}
