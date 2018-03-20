<?php

namespace Drupal\commerce_stock\Plugin;

use Drupal\commerce\Context;
use Drupal\commerce_stock\StockLocationInterface;
use Drupal\Component\Plugin\PluginInspectionInterface;
use Drupal\commerce\PurchasableEntityInterface;
use Drupal\Core\Form\FormStateInterface;

/**
 * Defines an interface for Stock events plugins.
 */
interface StockEventsInterface extends PluginInspectionInterface {

  const ORDER_PLACE_EVENT = 1;
  const ORDER_UPDATE_EVENT = 2;
  const ORDER_CANCEL_EVENT = 3;
  const ORDER_DELET_EVENT = 4;
  const ORDER_ITEM_UPDATE_EVENT = 5;
  const ORDER_ITEM_DELETE_EVENT = 6;

  /**
   * A stock event with transaction details.
   *
   * The stock event gets both the details about the type of the event and the
   * transaction it should create.
   * It can simply create the transaction from the details provided, add logic
   * to check if the transaction is to be created or override the details
   * provided before creating the transaction.
   *
   * @param \Drupal\commerce\Context $context
   *   The context containing the customer & store.
   * @param \Drupal\commerce\PurchasableEntityInterface $entity
   *   The purchasable entity.
   * @param int $stockEvent
   *   The event ID that's responsible for the transaction.
   * @param int $quantity
   *   The quantity.
   * @param \Drupal\commerce_stock\StockLocationInterface $location
   *   The stock location.
   * @param int $transaction_type
   *   The transaction type ID.
   * @param array $metadata
   *   Holds all the optional values those are:
   *     - related_oid: related order.
   *     - related_uid: related user.
   *     - data: Serialized data array holding a message.
   *
   * @return int
   *   Return the ID of the transaction or FALSE if no transaction created.
   */
  public function stockEvent(Context $context, PurchasableEntityInterface $entity, $stockEvent, $quantity, StockLocationInterface $location, $transaction_type, array $metadata);

  /**
   * Return form elements holding the configuration options.
   */
  public function configFormOptions();

  /**
   * Save the configuration options.
   *
   * @param array $form
   *   The stock manager configuration form holding the option elements.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The stock manager configuration form state.
   */
  public function saveConfigFormOptions(array $form, FormStateInterface $form_state);

}
