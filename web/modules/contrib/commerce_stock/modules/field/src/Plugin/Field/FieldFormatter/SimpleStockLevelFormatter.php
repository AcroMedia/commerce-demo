<?php

namespace Drupal\commerce_stock_field\Plugin\Field\FieldFormatter;

use Drupal\commerce\PurchasableEntityInterface;
use Drupal\commerce_stock\StockServiceManager;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Plugin implementation of the 'commerce_stock_level_simple' formatter.
 *
 * @FieldFormatter(
 *   id = "commerce_stock_level_simple",
 *   module = "commerce_stock_field",
 *   label = @Translation("Simple stock level formatter"),
 *   field_types = {
 *     "commerce_stock_level"
 *   }
 * )
 */
class SimpleStockLevelFormatter extends FormatterBase implements ContainerFactoryPluginInterface {

  /**
   * The Stock Service Manager.
   *
   * @var \Drupal\commerce_stock\StockServiceManager
   */
  protected $stockServiceManager;

  /**
   * {@inheritdoc}
   */
  public function __construct(
    $plugin_id,
    $plugin_definition,
    FieldDefinitionInterface $field_definition,
    array $settings,
    $label,
    $view_mode,
    array $third_party_settings,
    StockServiceManager $simple_stock_manager
  ) {
    parent::__construct($plugin_id, $plugin_definition, $field_definition, $settings, $label, $view_mode, $third_party_settings);
    $this->stockServiceManager = $simple_stock_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $plugin_id,
      $plugin_definition,
      $configuration['field_definition'],
      $configuration['settings'],
      $configuration['label'],
      $configuration['view_mode'],
      $configuration['third_party_settings'],
      $container->get('commerce_stock.service_manager'));
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {

    // Get the entity.
    $entity = $items->getEntity();

    if ($entity instanceof PurchasableEntityInterface) {
      // Get the available Stock for the product variation.
      $stockServiceManager = $this->stockServiceManager;
      $level = $stockServiceManager->getStockLevel($entity);
    }
    else {
      // No stock if this is not a purchasable entity.
      $level = 0;
    }
    $elements = [];
    // Return a single item.
    $elements[0] = [
      '#type' => 'html_tag',
      '#tag' => 'p',
      '#value' => $level,
    ];

    return $elements;
  }

}
