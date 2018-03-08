<?php

namespace Drupal\uh_commerce\Plugin\Field\FieldFormatter;

use Drupal\uh_commerce\Form\AddToCartForm;
use Drupal\Core\DependencyInjection\ClassResolverInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Field\Annotation\FieldFormatter;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Form\FormBuilderInterface;
use Drupal\Core\Form\FormState;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\StringTranslation\TranslationManager;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class UHAddToCartFormatter.
 *
 * @FieldFormatter(
 *  id = "uh_add_to_cart_formatter",
 *  label = "UH+ Add to Cart Form",
 *  field_types = {
 *    "entity_reference",
 *   },
 * )
 */
class AddToCartFormatter extends FormatterBase implements ContainerFactoryPluginInterface {

  /**
   * The Drupal entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The Drupal class resolver.
   *
   * @var \Drupal\Core\DependencyInjection\ClassResolverInterface
   */
  protected $classResolver;

  /**
   * The Drupal form builder.
   *
   * @var \Drupal\Core\Form\FormBuilderInterface
   */
  protected $formBuilder;

  /**
   * The Drupal translation manager.
   *
   * @var \Drupal\Core\StringTranslation\TranslationManager
   */
  protected $translationManager;

  /**
   * The Drupal module handler.
   *
   * @var \Drupal\Core\Extension\ModuleHandlerInterface
   */
  protected $moduleHandler;

  /**
   * AddToCartFormatter constructor.
   *
   * @param string $plugin_id
   *   The plugin_id for the formatter.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Field\FieldDefinitionInterface $field_definition
   *   The definition of the field to which the formatter is associated.
   * @param array $settings
   *   The formatter settings.
   * @param string $label
   *   The formatter label display setting.
   * @param string $view_mode
   *   The view mode.
   * @param array $third_party_settings
   *   Any third party settings.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   *   The entity type manager, for dealing with commerce objects.
   * @param \Drupal\Core\DependencyInjection\ClassResolverInterface $classResolver
   *   The class resolver, for getting cart types.
   * @param \Drupal\Core\Form\FormBuilderInterface $formBuilder
   *   The form builder, for add to cart customization.
   * @param \Drupal\Core\StringTranslation\TranslationManager $translationManager
   *   The translation manager.
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $moduleHandler
   *   The module handler.
   *
   * @internal param \Drupal\user\PrivateTempStoreFactory $privateTempStore
   * @internal param \Drupal\commerce_store\Resolver\StoreResolverInterface $storeResolver
   */
  public function __construct(
    $plugin_id,
    $plugin_definition,
    FieldDefinitionInterface $field_definition,
    array $settings,
    $label,
    $view_mode,
    array $third_party_settings,
    EntityTypeManagerInterface $entityTypeManager,
    ClassResolverInterface $classResolver,
    FormBuilderInterface $formBuilder,
    TranslationManager $translationManager,
    ModuleHandlerInterface $moduleHandler) {
    parent::__construct($plugin_id, $plugin_definition, $field_definition, $settings, $label, $view_mode, $third_party_settings);

    $this->entityTypeManager = $entityTypeManager;
    $this->classResolver = $classResolver;
    $this->formBuilder = $formBuilder;
    $this->translationManager = $translationManager;
    $this->moduleHandler = $moduleHandler;
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
      $container->get('entity_type.manager'),
      $container->get('class_resolver'),
      $container->get('form_builder'),
      $container->get('string_translation'),
      $container->get('module_handler')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function view(FieldItemListInterface $items, $langcode = NULL) {
    $elements = parent::view($items, $langcode);
    $elements['#attributes']['class'][] = 'plan-formatter';
    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];

    /** @var \Drupal\commerce_order\OrderItemStorageInterface $order_item_storage */
    $order_item_storage = $this->entityTypeManager->getStorage('commerce_order_item');
    /** @var \Drupal\commerce_product\Entity\ProductInterface $product */
    $product = $items->getEntity();
    $product = $product->getTranslation($langcode);

    /** @var \Drupal\commerce_product\ProductVariationStorageInterface $variation_storage */
    $variation_storage = $this->entityTypeManager->getStorage('commerce_product_variation');

    foreach ($variation_storage->loadEnabled($product) as $variation) {
      $order_item = $order_item_storage->createFromPurchasableEntity($variation);
      $form_state_additions = [
        'variation' => $variation,
        'product' => $product,
        'view_mode' => 'add_to_cart',
        'settings' => [
          'combine' => $this->getSetting('combine'),
        ],
      ];
      $form_state = (new FormState())->setFormState($form_state_additions);
      $uhAddToCartFormObject = $this->classResolver->getInstanceFromDefinition(AddToCartForm::class);
      $uhAddToCartFormObject
        ->setStringTranslation($this->translationManager)
        ->setModuleHandler($this->moduleHandler)
        ->setEntityTypeManager($this->entityTypeManager)
        ->setOperation('add_to_cart');
      $uhAddToCartFormObject->setEntity($order_item);

      $uhAddToCartForm = $this->formBuilder->buildForm($uhAddToCartFormObject, $form_state);
      $elements[] = $uhAddToCartForm;
    }

    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public static function isApplicable(FieldDefinitionInterface $field_definition) {
    $has_cart = \Drupal::moduleHandler()->moduleExists('commerce_cart');
    $entity_type = $field_definition->getTargetEntityTypeId();
    $field_name = $field_definition->getName();
    return $has_cart && $entity_type == 'commerce_product' && $field_name == 'variations';
  }

}
