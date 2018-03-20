<?php

namespace Drupal\commerce_stock_field\Plugin\Field\FieldType;

use Drupal\commerce_stock\StockTransactionsInterface;
use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\TypedData\DataDefinition;
use Drupal\Core\TypedData\DataDefinitionInterface;
use Drupal\Core\TypedData\TypedDataInterface;

/**
 * Plugin implementation of the 'commerce_stock_field' field type.
 *
 * @FieldType(
 *   id = "commerce_stock_level",
 *   label = @Translation("Stock level"),
 *   module = "commerce_stock_field",
 *   description = @Translation("Stock level"),
 *   default_widget = "commerce_stock_level_simple",
 *   default_formatter = "commerce_stock_level_simple"
 * )
 */
class StockLevel extends FieldItemBase {

  /**
   * The stock service manager.
   *
   * @var \Drupal\commerce_stock\StockServiceManager
   */
  protected $stockServiceManager;

  /**
   * {@inheritdoc}
   */
  public function __construct(DataDefinitionInterface $definition, $name = NULL, TypedDataInterface $parent = NULL) {
    parent::__construct($definition, $name, $parent);
    $this->stockServiceManager = \Drupal::service('commerce_stock.service_manager');
  }

  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition) {
    // We don't need storage but as computed fields are not properly implemented
    // We will use a dummy column that should be ignored.
    // @see https://www.drupal.org/node/2392845.
    return [
      'columns' => [
        'value' => [
          'type' => 'numeric',
          'size' => 'normal',
          'precision' => 10,
          'scale' => 2,
          'not null' => FALSE,
        ],
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {
    // @todo What's the difference/utility between both fields?
    $properties['value'] = DataDefinition::create('float')
      ->setLabel(t('Available stock'));
    $properties['available_stock'] = DataDefinition::create('float')
      ->setLabel(t('Available stock'))
      ->setComputed(TRUE)
      ->setReadOnly(TRUE)
      ->setClass('Drupal\commerce_stock_field\StockLevelProcessor')
      ->setSetting('stock level', 'summary');

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function isEmpty() {
    $value = $this->get('value')->getValue();
    return $value === NULL;
  }

  /**************************  TESTING *********************************/

  /**
   * This updates the stock based on parameters set by the stock widget.
   */
  public function setValue($values, $notify = TRUE) {
    static $called = [];

    // If no stock data.
    if (!isset($values['stock'])) {
      // Nothing to do.
      return;
    }

    if (!empty($this->getEntity())) {
      $entity = $this->getEntity();
      if (empty($entity->id())) {
        return;
      }
      // @todo Figure out why sometimes this is called twice.
      if (isset($called[$entity->getEntityTypeId() . $entity->id()])) {
        return;
      }
      $called[$entity->getEntityTypeId() . $entity->id()] = TRUE;
      $transaction_qty = 0;

      // Supports absolute values being passed in directly, i.e.
      // programmatically.
      if (!is_array($values)) {
        $values = ['stock' => ['value' => $values]];
      }
      if (empty($values['stock']['entry_system'])) {
        $transaction_qty = (int) $values['stock']['value'];
      }

      // Or supports a field widget entry system.
      else {
        switch ($values['stock']['entry_system']) {
          case 'simple':
            $new_level = $values['stock']['value'];
            $level = $this->stockServiceManager->getStockLevel($entity);
            $transaction_qty = $new_level - $level;
            break;

          case 'basic':
            $transaction_qty = (int) $values['stock']['adjustment'];
            break;
        }
      }

      if ($transaction_qty) {
        $transaction_type = ($transaction_qty > 0) ? StockTransactionsInterface::STOCK_IN : StockTransactionsInterface::STOCK_OUT;
        // @todo Add zone and location to form.
        /** @var \Drupal\commerce_stock\StockLocationInterface $location */
        $location = $this->stockServiceManager->getTransactionLocation($this->stockServiceManager->getContext($entity), $entity, $transaction_qty);
        if (empty($location)) {
          // This shouldnever get called as we should always have a location.
          return;
        }
        $zone = '';
        // @todo Implement unit_cost?
        $unit_cost = NULL;
        // @ToDo Make this hardcoded note translatable or remove it at all.
        $transaction_note = isset($values['stock']['stock_transaction_note']) ? $values['stock']['stock_transaction_note'] : 'stock level set or updated by field';
        $metadata = ['data' => ['message' => $transaction_note]];
        $this->stockServiceManager->createTransaction($entity, $location->getId(), $zone, $transaction_qty, $unit_cost, $transaction_type, $metadata);
      }
    }
  }

}
