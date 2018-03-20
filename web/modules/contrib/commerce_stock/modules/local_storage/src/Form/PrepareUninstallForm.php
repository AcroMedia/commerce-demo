<?php

namespace Drupal\commerce_stock_local\Form;

use Drupal\Core\Database\Database;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\ConfirmFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * The always in stock field uninstall form.
 *
 * Provides a form removing commerce_stock_always_in_stock field data before
 * uninstallation.
 */
class PrepareUninstallForm extends ConfirmFormBase {

  /**
   * The entity_type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager')
    );
  }

  /**
   * Constructs a new PrepareUninstallForm.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity manager.
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager) {
    $this->entityTypeManager = $entity_type_manager;
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'commerce_stock_local.prepare_module_uninstall';
  }

  /**
   * {@inheritdoc}
   */
  public function getQuestion() {
    return $this->t(
      'Are you sure you want to delete all commerce_stock_always_in_stock field values?'
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getDescription() {
    return $this->t('This action cannot be undone.<br />Make a backup of your database if you want to be able to restore these items.');
  }

  /**
   * {@inheritdoc}
   */
  public function getConfirmText() {
    return $this->t('Delete all commerce_stock_always_in_stock field values');
  }

  /**
   * {@inheritdoc}
   */
  public function getCancelUrl() {
    return Url::fromRoute('system.modules_uninstall');
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $tables_to_update = [];

    foreach ($this->entityTypeManager->getDefinitions() as $entity_type) {
      if ($entity_type->isSubclassOf('\Drupal\commerce\PurchasableEntityInterface')) {
        $tables_to_update[] = $entity_type->getDataTable();
        $tables_to_update[] = $entity_type->getRevisionDataTable();
      }
    }

    $db_connection = Database::getConnection();

    foreach ($tables_to_update as $table) {
      if ($table && $db_connection->schema()
        ->fieldExists($table, 'commerce_stock_always_in_stock')
      ) {
        $db_connection->update($table)
          ->fields(['commerce_stock_always_in_stock' => NULL])
          ->execute();
      }
    }
    drupal_set_message(t('All values have been deleted.'));

    $form_state->setRedirect('system.modules_uninstall');
  }

}
