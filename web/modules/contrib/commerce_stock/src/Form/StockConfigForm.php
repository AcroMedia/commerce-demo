<?php

namespace Drupal\commerce_stock\Form;

use Drupal\commerce_stock\Plugin\StockEventsManager;
use Drupal\commerce_stock\StockServiceManagerInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\EntityTypeBundleInfo;
use Drupal\Core\Entity\EntityTypeManager;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * The stock configuration form.
 */
class StockConfigForm extends ConfigFormBase {

  /**
   * A list of purchasable entity types and bundles.
   *
   * @var array
   */
  protected $purchasableEntityTypes;

  /**
   * The Stock Service Manager.
   *
   * @var \Drupal\commerce_stock\StockServiceManager
   */
  protected $stockServiceManager;

  /**
   * The Stock Service Manager.
   *
   * @var \Drupal\commerce_stock\Plugin\StockEventsManager
   */
  protected $stockEventsManager;

  /**
   * {@inheritdoc}
   */
  public function __construct(ConfigFactoryInterface $config_factory, EntityTypeManager $entity_type_manager, EntityTypeBundleInfo $entity_type_bundle_info, StockServiceManagerInterface $stockServiceManager, StockEventsManager $stockEventsManager) {
    parent::__construct($config_factory);

    $this->stockServiceManager = $stockServiceManager;
    $this->stockEventsManager = $stockEventsManager;

    // Prepare the list of purchasable entity types and bundles.
    $entity_types = $entity_type_manager->getDefinitions();
    $purchasable_entity_types = array_filter($entity_types, function ($entity_type) {
      return $entity_type->isSubclassOf('\Drupal\commerce\PurchasableEntityInterface');
    });
    $purchasable_entity_types = array_map(function ($entity_type) {
      return $entity_type->getLabel();
    }, $purchasable_entity_types);
    foreach ($purchasable_entity_types as $type => $label) {
      $this->purchasableEntityTypes[$type] = [
        'label' => $label,
        'bundles' => [],
      ];
      foreach ($entity_type_bundle_info->getBundleInfo($type) as $bundle_id => $bundle_info) {
        $this->purchasableEntityTypes[$type]['bundles'][$bundle_id] = $bundle_info['label'];
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('config.factory'),
      $container->get('entity_type.manager'),
      $container->get('entity_type.bundle.info'),
      $container->get('commerce_stock.service_manager'),
      $container->get('plugin.manager.stock_events')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'commerce_stock_config_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    // Get the default service.
    $config = $this->config('commerce_stock.service_manager');
    $default_service_id = $config->get('default_service_id');

    $stock_service_manager = $this->stockServiceManager;
    $service_options = $stock_service_manager->listServiceIds();

    $form['service_manager'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Stock services'),
    ];

    $form['service_manager']['default_service_id'] = [
      '#type' => 'select',
      '#title' => $this->t('Default service'),
      '#options' => $service_options,
      '#default_value' => $default_service_id,
    ];

    $form['service_manager']['services'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Services per entity type'),
    ];
    $service_options = array_merge(['use_default' => $this->t('- Use default -')], $service_options);
    foreach ($this->purchasableEntityTypes as $entity_type_id => $entity_type_info) {
      $form['service_manager']['services'][$entity_type_id] = [
        '#type' => 'fieldset',
        '#title' => $entity_type_info['label'],
      ];
      foreach ($entity_type_info['bundles'] as $bundle_id => $bundle_name) {
        $config_key = $entity_type_id . '_' . $bundle_id . '_service_id';
        $form['service_manager']['services'][$entity_type_id][$config_key] = [
          '#type' => 'select',
          '#title' => $bundle_name,
          '#options' => $service_options,
          '#default_value' => $config->get($config_key) ?: 'use_default',
        ];
      }
    }

    // Event manager
    // Get the default event plugin.
    $selected_plugin_id = $config->get('stock_events_plugin_id') ?: 'core_stock_events';

    // Get the list of available plugins.
    $type = $this->stockEventsManager;
    $plugin_definitions = $type->getDefinitions();
    $plugin_list = [];
    foreach ($plugin_definitions as $plugin_definition) {
      $id = $plugin_definition['id'];
      $description = $plugin_definition['description']->render();
      $plugin_list[$id] = $description;
    }
    // Select the stock event plugin.
    $form['event_manager'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Event Handler'),
    ];
    $form['event_manager']['selected_event_plugin'] = [
      '#type' => 'select',
      '#title' => $this->t('Selected plugin'),
      '#options' => $plugin_list,
      '#default_value' => $selected_plugin_id,
    ];

    // Plugin options to be displayed in a field group.
    $form['event_manager']['options'] = [
      '#type' => 'vertical_tabs',
      '#default_tab' => 'edit-publication',
    ];
    // Cycle the plugins.
    foreach ($plugin_definitions as $plugin_definition) {
      $id = $plugin_definition['id'];
      $description = $plugin_definition['description']->render();
      $plugin_list[$id] = $description;
      // Create the form elements for each one.
      $form[$id] = [
        '#type' => 'details',
        '#title' => $description,
        '#group' => 'options',
      ];

      $plugin = $type->createInstance($id);
      $event_option = $plugin->configFormOptions();

      $form[$id]['config'] = $event_option;
    }
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   *
   * @throws \Drupal\Component\Plugin\Exception\PluginException
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $values = $form_state->getValues();
    $config = $this->config('commerce_stock.service_manager');
    $config->set('default_service_id', $values['default_service_id']);
    foreach ($this->purchasableEntityTypes as $entity_type_id => $entity_type_info) {
      foreach (array_keys($entity_type_info['bundles']) as $bundle_id) {
        $key = $entity_type_id . '_' . $bundle_id . '_service_id';
        $value = $values[$key];
        if ($value !== 'use_default') {
          $config->set($key, $value);
        }
        else {
          $config->clear($key);
        }
      }
    }
    // Events manager.
    $config->set('stock_events_plugin_id', $values['selected_event_plugin']);

    $config->save();

    // Update all plugin options.
    $type = $this->stockEventsManager;
    $plugin_definitions = $type->getDefinitions();

    foreach ($plugin_definitions as $plugin_definition) {
      $id = $plugin_definition['id'];
      $plugin = $type->createInstance($id);
      $plugin->SaveconfigFormOptions($form, $form_state);
    }

    drupal_set_message($this->t('Stock configuration updated.'));
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'commerce_stock.service_manager',
    ];
  }

}
