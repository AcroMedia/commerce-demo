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
 *   id = "core_stock_events",
 *   description = @Translation("Core stock Events."),
 * )
 */
class CoreStockEvents extends PluginBase implements StockEventsInterface {

  /**
   * {@inheritdoc}
   */
  public function stockEvent(Context $context, PurchasableEntityInterface $entity, $stockEvent, $quantity, StockLocationInterface $location, $transaction_type, array $metadata) {

    $config = \Drupal::configFactory()->get('commerce_stock.core_stock_events');

    // Check if event should be handled.
    $order_placed_events = [StockEventsInterface::ORDER_PLACE_EVENT];
    $order_update_events = [
      StockEventsInterface::ORDER_UPDATE_EVENT,
      StockEventsInterface::ORDER_ITEM_UPDATE_EVENT,
    ];
    $order_delete_events = [
      StockEventsInterface::ORDER_CANCEL_EVENT,
      StockEventsInterface::ORDER_DELET_EVENT,
      StockEventsInterface::ORDER_ITEM_DELETE_EVENT,
    ];
    // Cancel if event type is not enabled.
    if ((in_array($stockEvent, $order_placed_events)) && !$config->get('core_stock_events_order_complete')) {
      return FALSE;
    }
    elseif ((in_array($stockEvent, $order_update_events)) && !$config->get('core_stock_events_order_updates')) {
      return FALSE;
    }
    elseif ((in_array($stockEvent, $order_delete_events)) && !$config->get('core_stock_events_order_cancel')) {
      return FALSE;
    }

    // Get the stock service.
    $stockService = \Drupal::service('commerce_stock.service_manager')
      ->getService($entity);
    // Use the stock updater to create the transaction.
    $transaction_id = $stockService->getStockUpdater()
      ->createTransaction($entity, $location->getId(), '', $quantity, NULL, $transaction_type, $metadata);
    // Return the transaction ID.
    return $transaction_id;
  }

  /**
   * {@inheritdoc}
   */
  public function configFormOptions() {

    $config = \Drupal::configFactory()->get('commerce_stock.core_stock_events');

    $form_options['core_stock_events_order_complete'] = [
      '#type' => 'checkbox',
      '#title' => t('Reserve stock on order complete'),
      '#default_value' => $config->get('core_stock_events_order_complete'),
    ];
    $form_options['core_stock_events_order_cancel'] = [
      '#type' => 'checkbox',
      '#title' => t('Automatically return stock on cancel'),
      '#default_value' => $config->get('core_stock_events_order_cancel'),
    ];
    $form_options['core_stock_events_order_updates'] = [
      '#type' => 'checkbox',
      '#title' => t('Adjust stock on order updates (after the order was completed)'),
      '#default_value' => $config->get('core_stock_events_order_updates'),
    ];
    return $form_options;
  }

  /**
   * {@inheritdoc}
   */
  public function saveConfigFormOptions(array $form, FormStateInterface $form_state) {
    $values = $form_state->getValues();
    $config = \Drupal::configFactory()
      ->getEditable('commerce_stock.core_stock_events');
    $config->set('core_stock_events_order_complete', $values['core_stock_events_order_complete']);
    $config->set('core_stock_events_order_cancel', $values['core_stock_events_order_cancel']);
    $config->set('core_stock_events_order_updates', $values['core_stock_events_order_updates']);

    $config->save();
  }

}
