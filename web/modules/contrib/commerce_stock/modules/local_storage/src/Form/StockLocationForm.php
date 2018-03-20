<?php

namespace Drupal\commerce_stock_local\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form controller for stock location edit forms.
 *
 * @ingroup commerce_stock_local
 */
class StockLocationForm extends ContentEntityForm {

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    /* @var $entity \Drupal\commerce_stock_local\Entity\StockLocation */
    $form = parent::buildForm($form, $form_state);
    $form['status'] = [
      '#type'          => 'checkbox',
      '#title'         => $this->t('Active'),
      '#default_value' => $this->entity->isActive(),
      '#weight'        => 99,
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    $entity = &$this->entity;

    $status = parent::save($form, $form_state);

    switch ($status) {
      case SAVED_NEW:
        drupal_set_message($this->t('Created the %label stock location.', [
          '%label' => $entity->label(),
        ]));
        break;

      default:
        drupal_set_message($this->t('Saved the %label stock location.', [
          '%label' => $entity->label(),
        ]));
    }
    $form_state->setRedirect('entity.commerce_stock_location.canonical', ['commerce_stock_location' => $entity->id()]);
  }

}
