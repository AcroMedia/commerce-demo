<?php

namespace Drupal\uh_commerce\Form;

use Drupal\commerce_cart\Form\AddToCartForm as CoreAddToCardForm;
use Drupal\Component\Utility\Html;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class UHAddToCartForm.
 */
class AddToCartForm extends CoreAddToCardForm {

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    // Get product type (bundle) from storage.
    $storage = &$form_state->getStorage();
    $product_bundle = $storage['product']->bundle();
    $form['#product_bundle'] = $product_bundle;

    // UH Recurring Digital.
    if ($product_bundle == 'uh_recurring_digital') {
      // Set theme hook.
      $form = parent::buildForm($form, $form_state);
      $form['purchased_entity']['#access'] = FALSE;
      $form['quantity']['#access'] = FALSE;
      $form['#theme'][] = 'add_to_cart_form__uh_recurring_digital';
      // Add variation variable for templating.
      $form['#variation'] = $form_state->get('variation');
    }

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  protected function actions(array $form, FormStateInterface $form_state) {
    // Get product type (bundle) from storage.
    $storage = &$form_state->getStorage();
    $product_bundle = $storage['product']->bundle();
    $form['#product_bundle'] = $product_bundle;

    // UH Recurring Digital.
    if ($product_bundle == 'uh_recurring_digital') {
      /** @var \Drupal\commerce_product\Entity\ProductVariationInterface $purchased_entity */
      $purchased_entity = $form_state->get('variation');

      // Submit button value (default and alternate user submitted).
      $submit_button_value = 'Add to cart';
      if (!empty($purchased_entity->get('field_alternate_button_label')->getValue())) {
        $submit_button_value = $purchased_entity->get('field_alternate_button_label')->getValue()[0]['value'];
      }

      // Set the button value.
      $actions['submit'] = [
        '#type' => 'submit',
        '#value' => $this->t($submit_button_value),
        '#submit' => ['::submitForm'],
        '#name' => 'plan_' . Html::getId($purchased_entity->getSku()),
      ];

      return $actions;
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // SubmitForm handling.
    /** @var \Drupal\commerce_order\Entity\OrderItemInterface $order_item */
    $order_item = $this->entity;
    $order_type = $this->orderTypeResolver->resolve($order_item);
    /** @var \Drupal\commerce\PurchasableEntityInterface $purchased_entity */
    $purchased_entity = $order_item->getPurchasedEntity();
    $store = $this->selectStore($purchased_entity);
    $cart = $this->cartProvider->getCart($order_type, $store);

    // Isolate specific order types and empty cart if needed.
    if (!empty($cart) && $order_type == 'digital_recurring') {
      $this->cartManager->emptyCart($cart);
    }

    // Submit the product.
    parent::submitForm($form, $form_state);
  }

}
