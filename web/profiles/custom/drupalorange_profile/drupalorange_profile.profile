<?php

/**
 * @file
 * Enables modules and site configuration for a commerce_base site installation.
 */

use Drupal\contact\Entity\ContactForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_FORM_ID_alter() for install_configure_form().
 *
 * Allows the profile to alter the site configuration form.
 */
function drupalorange_profile_form_install_configure_form_alter(&$form, FormStateInterface $form_state) {
  // Add a placeholder as example that one can choose an arbitrary site name.
  $form['site_information']['site_name']['#attributes']['placeholder'] = t('My store');
  $form['#submit'][] = 'drupalorange_profile_form_install_configure_submit';
}

/**
 * Submission handler to sync/react to additional settings.
 */
function drupalorange_profile_form_install_configure_submit($form, FormStateInterface $form_state) {
  // Nothing here yet.
}
