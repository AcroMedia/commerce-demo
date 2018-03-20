<?php

namespace Drupal\commerce_stock\Plugin;

use Drupal\Core\Plugin\DefaultPluginManager;
use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;

/**
 * Provides the Stock events plugin manager.
 */
class StockEventsManager extends DefaultPluginManager {

  /**
   * Constructs a new StockEventsManager object.
   *
   * @param \Traversable $namespaces
   *   An object that implements \Traversable which contains the root paths
   *   keyed by the corresponding namespace to look for plugin implementations.
   * @param \Drupal\Core\Cache\CacheBackendInterface $cache_backend
   *   Cache backend instance to use.
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   *   The module handler to invoke the alter hook with.
   */
  public function __construct(\Traversable $namespaces, CacheBackendInterface $cache_backend, ModuleHandlerInterface $module_handler) {
    parent::__construct('Plugin/StockEvents', $namespaces, $module_handler, 'Drupal\commerce_stock\Plugin\StockEventsInterface', 'Drupal\commerce_stock\Annotation\StockEvents');

    $this->alterInfo('commerce_stock_stock_events_info');
    $this->setCacheBackend($cache_backend, 'commerce_stock_stock_events_plugins');
  }

}
