<?php

namespace Drupal\commerce_stock_local;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\FieldableEntityStorageInterface;
use Drupal\Core\Entity\Sql\SqlContentEntityStorage;
use Drupal\Core\Extension\ModuleUninstallValidatorInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\StringTranslation\TranslationInterface;
use Drupal\Core\Url;

/**
 * Provides link to delete commerce_stock_local field values.
 */
class LocalStockUninstallValidator implements ModuleUninstallValidatorInterface {

  use StringTranslationTrait;

  /**
   * The entity_type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Constructs a new LocalStockUninstallValidator.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity manager.
   * @param \Drupal\Core\StringTranslation\TranslationInterface $string_translation
   *   The string translation service.
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager, TranslationInterface $string_translation) {
    $this->entityTypeManager = $entity_type_manager;
    $this->stringTranslation = $string_translation;
  }

  /**
   * {@inheritdoc}
   */
  public function validate($module) {
    if ($module !== 'commerce_stock_local') {
      return [];
    }
    $entity_types = $this->entityTypeManager->getDefinitions();
    $reasons = [];

    foreach ($entity_types as $entity_type_id => $entity_type) {
      if ($entity_type->isSubclassOf('\Drupal\commerce\PurchasableEntityInterface')) {
        $storage = $this->entityTypeManager->getStorage($entity_type_id);

        if ($storage instanceof SqlContentEntityStorage) {
          foreach ($storage->getFieldStorageDefinitions() as $storage_definition) {
            if (
              $storage_definition->getProvider() == $module
              && $storage instanceof FieldableEntityStorageInterface
              && $storage->countFieldData($storage_definition, TRUE)
            ) {
              $reasons[] = $this->t(
                '<a href=":url">Remove field values</a>: @field-name on entity type @entity_type.',
                [
                  '@field-name' => $storage_definition->getName(),
                  '@entity_type' => $entity_type->getLabel(),
                  ':url' => Url::fromRoute(
                    'commerce_stock_local.prepare_module_uninstall'
                  )->toString(),
                ]
              );
            }
          }
        }
      }
    }

    return $reasons;
  }

}
