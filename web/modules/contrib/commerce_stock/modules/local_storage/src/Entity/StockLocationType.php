<?php

namespace Drupal\commerce_stock_local\Entity;

use Drupal\Core\Config\Entity\ConfigEntityBundleBase;

/**
 * Defines the stock location type entity.
 *
 * @ConfigEntityType(
 *   id = "commerce_stock_location_type",
 *   label = @Translation("Stock location type"),
 *   handlers = {
 *     "list_builder" = "Drupal\commerce_stock_local\StockLocationTypeListBuilder",
 *     "form" = {
 *       "add" = "Drupal\commerce_stock_local\Form\StockLocationTypeForm",
 *       "edit" = "Drupal\commerce_stock_local\Form\StockLocationTypeForm",
 *       "delete" = "Drupal\commerce_stock_local\Form\StockLocationTypeDeleteForm"
 *     },
 *     "route_provider" = {
 *        "default" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider",
 *        "delete-multiple" = "Drupal\entity\Routing\DeleteMultipleRouteProvider",
 *     },
 *   },
 *   config_prefix = "commerce_stock_location_type",
 *   admin_permission = "administer commerce stock location entities",
 *   bundle_of = "commerce_stock_location",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "label",
 *     "uuid" = "uuid"
 *   },
 *   links = {
 *     "canonical" = "/admin/commerce/config/commerce_stock_location_type/{commerce_stock_location_type}",
 *     "add-form" = "/admin/commerce/config/commerce_stock_location_type/add",
 *     "edit-form" = "/admin/commerce/config/commerce_stock_location_type/{commerce_stock_location_type}/edit",
 *     "delete-form" = "/admin/commerce/config/commerce_stock_location_type/{commerce_stock_location_type}/delete",
 *     "collection" = "/admin/commerce/config/commerce_stock_location_type"
 *   }
 * )
 */
class StockLocationType extends ConfigEntityBundleBase implements StockLocationTypeInterface {

  /**
   * The stock location type ID.
   *
   * @var string
   */
  protected $id;

  /**
   * The stock location type label.
   *
   * @var string
   */
  protected $label;

}
