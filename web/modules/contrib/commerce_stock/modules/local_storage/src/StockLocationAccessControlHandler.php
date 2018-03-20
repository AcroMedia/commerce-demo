<?php

namespace Drupal\commerce_stock_local;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the stock location entity.
 *
 * @see \Drupal\commerce_stock_local\Entity\StockLocation.
 */
class StockLocationAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\commerce_stock_local\Entity\LocalStockLocationInterface $entity */
    switch ($operation) {
      case 'view':
        if (!$entity->isActive()) {
          return AccessResult::allowedIfHasPermission($account, 'view stock location entities');
        }
        return AccessResult::allowedIfHasPermission($account, 'view stock location entities');

      case 'update':
        return AccessResult::allowedIfHasPermission($account, 'administer commerce stock location entities');

      case 'delete':
        return AccessResult::allowedIfHasPermission($account, 'administer commerce stock location entities');
    }

    // Unknown operation, no opinion.
    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'administer commerce stock location entities');
  }

}
