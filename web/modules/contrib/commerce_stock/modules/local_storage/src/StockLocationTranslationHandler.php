<?php

namespace Drupal\commerce_stock_local;

use Drupal\content_translation\ContentTranslationHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Form\FormStateInterface;

/**
 * Defines the translation handler for commerce stock locations.
 */
class StockLocationTranslationHandler extends ContentTranslationHandler {

  /**
   * {@inheritdoc}
   */
  public function entityFormAlter(array &$form, FormStateInterface $form_state, EntityInterface $entity) {
    parent::entityFormAlter($form, $form_state, $entity);

    // Move the translation fieldset to a vertical tab.
    if (isset($form['content_translation'])) {
      $form['content_translation'] += [
        '#group' => 'advanced',
        '#attributes' => [
          'class' => ['stock-location-translation-options'],
        ],
      ];
      $form['content_translation']['#weight'] = 100;
      // The basic stock location values will be used, no need for specific
      // elements.
      $form['content_translation']['status']['#access'] = FALSE;
      $form['content_translation']['name']['#access'] = FALSE;
    }

    $form_object = $form_state->getFormObject();
    $form_langcode = $form_object->getFormLangcode($form_state);
    $translations = $entity->getTranslationLanguages();
    // Change the submit button labels to inform the user that
    // publishing/unpublishing won't apply to all translations.
    if (!$entity->isNew() && (!isset($translations[$form_langcode]) || count($translations) > 1)) {
      foreach (['set active', 'set inactive', 'submit'] as $button) {
        if (isset($form['actions'][$button])) {
          $form['actions'][$button]['#value'] .= ' ' . t('(this translation)');
        }
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  public function entityFormEntityBuild($entity_type, EntityInterface $entity, array $form, FormStateInterface $form_state) {
    /** @var \Drupal\commerce_stock_local\Entity\StockLocation $entity */
    if ($form_state->hasValue('content_translation')) {
      $translation = &$form_state->getValue('content_translation');
      $translation['status'] = $entity->isActive();
    }
    parent::entityFormEntityBuild($entity_type, $entity, $form, $form_state);
  }

}
