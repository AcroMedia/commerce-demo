<?php

namespace Drupal\commerce_stock\Plugin\StockEvents;

use Drupal\commerce\Context;
use Drupal\commerce\PurchasableEntityInterface;
use Drupal\commerce_stock\Plugin\StockEventsInterface;
use Drupal\commerce_stock\StockLocationInterface;
use Drupal\Component\Plugin\PluginBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Core Stock Events.
 *
 * @StockEvents(
 *   id = "disabled_stock_events",
 *   description = @Translation("Disabled all stock events."),
 * )
 */
class DisabledStockEvents extends PluginBase implements StockEventsInterface {

  /**
   * {@inheritdoc}
   */
  public function stockEvent(Context $context, PurchasableEntityInterface $entity, $stockEvent, $quantity, StockLocationInterface $location, $transaction_type, array $metadata) {
    // This does nothing.
    return NULL;
  }

  /**
   * {@inheritdoc}
   */
  public function configFormOptions() {
    // No configuration.
    $form['na'] = [
      '#type' => 'markup',
      '#markup' => t('No configuration options.'),
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function saveConfigFormOptions(array $form, FormStateInterface $form_state) {
    // Nothing to do.
    return FALSE;
  }

}
