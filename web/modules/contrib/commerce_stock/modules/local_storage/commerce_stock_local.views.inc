<?php

/**
 * @file
 * Commerce Stock Storage Views callbacks.
 */

/**
 * Implements hook_views_data().
 */
function commerce_stock_local_views_data() {
  // Define the return array.
  $data = [];

  // Stock Location
  // The outermost keys of $data are Views table names, which should usually
  // be the same as the hook_schema() table names.
  $data['commerce_stock_location'] = [];

  $data['commerce_stock_location']['table'] = [];

  // Within 'table', the value of 'group' (translated string) is used as a
  // prefix in Views UI for this table's fields, filters, etc. When adding
  // a field, filter, etc. you can also filter by the group.
  $data['commerce_stock_location']['table']['group'] = t('Commerce Stock Local');

  // Within 'table', the value of 'provider' is the module that provides schema
  // or the entity type that causes the table to exist. Setting this ensures
  // that views have the correct dependencies. This is automatically set to the
  // module that implements hook_views_data().
  $data['commerce_stock_location']['table']['provider'] = 'commerce_stock_local';

  // Some tables are "base" tables, meaning that they can be the base tables
  // for views. Non-base tables can only be brought in via relationships in
  // views based on other tables. To define a table to be a base table, add
  // key 'base' to the 'table' array:
  $data['commerce_stock_location']['table']['base'] = [
    // Identifier (primary) field in this table for Views.
    'field' => 'location_id',
    // Label in the UI.
    'title' => t('Commerce Stock Local location'),
    // Longer description in the UI. Required.
    'help' => t('Table holding the stock locations.'),
    'weight' => -10,
  ];

  // Fields.
  $data['commerce_stock_location']['id'] = [
    'title' => t('Location ID'),
    'help' => t('The location ID.'),
    'field' => [
      'id' => 'numeric',
    ],
    'filter' => [
      'id' => 'numeric',
    ],
    'argument' => [
      'id' => 'numeric',
    ],
    'sort' => [
      'id' => 'standard',
    ],
  ];
  $data['commerce_stock_location']['name'] = [
    'title' => t('Name'),
    'help' => t('The location name.'),
    'field' => [
      'id' => 'standard',
    ],
    'argument' => [
      'id' => 'string',
    ],
    'filter' => [
      'id' => 'string',
    ],
    'sort' => [
      'id' => 'standard',
    ],
  ];

  $data['commerce_stock_location']['status'] = [
    'title' => t('Status'),
    'help' => t('Location active flag.'),
    'field' => [
      'id' => 'boolean',
    ],
    'sort' => [
      'id' => 'standard',
    ],
    'filter' => [
      'id' => 'boolean',
      'label' => t('Active'),
      'type' => 'yes-no',
      'use_equal' => TRUE,
    ],
  ];

  // Stock transactions.
  $data['commerce_stock_transaction'] = [];
  $data['commerce_stock_transaction']['table'] = [];
  $data['commerce_stock_transaction']['table']['group'] = t('Commerce Stock Local');
  $data['commerce_stock_transaction']['table']['provider'] = 'commerce_stock_local';
  $data['commerce_stock_transaction']['table']['base'] = [
    'field' => 'id',
    'title' => t('Commerce Stock Local transaction'),
    'help' => t('Table holding the stock transactions.'),
    'weight' => -10,
  ];
  // Fields.
  $data['commerce_stock_transaction']['id'] = [
    'title' => t('Transaction ID'),
    'help' => t('The transaction ID.'),
    'field' => [
      'id' => 'numeric',
    ],
    'filter' => [
      'id' => 'numeric',
    ],
    'argument' => [
      'id' => 'numeric',
    ],
    'sort' => [
      'id' => 'standard',
    ],
  ];
  $data['commerce_stock_transaction']['entity_id'] = [
    'title' => t('Purchasable entity ID'),
    'help' => t('The purchasable entity ID.'),
    'field' => [
      'id' => 'numeric',
    ],
    'filter' => [
      'id' => 'numeric',
    ],
    'argument' => [
      'id' => 'numeric',
    ],
    'sort' => [
      'id' => 'standard',
    ],
  ];
  $data['commerce_stock_transaction']['entity_type'] = [
    'title' => t('Purchasable entity type'),
    'help' => t('The purchasable entity type.'),
    'field' => [
      'id' => 'standard',
    ],
    'filter' => [
      'id' => 'string',
    ],
    'argument' => [
      'id' => 'string',
    ],
    'sort' => [
      'id' => 'standard',
    ],
  ];
  $data['commerce_stock_transaction']['qty'] = [
    'title' => t('Qty'),
    'help' => t('The stock transaction quantity.'),
    'field' => [
      'id' => 'numeric',
    ],
    'filter' => [
      'id' => 'numeric',
    ],
    'argument' => [
      'id' => 'numeric',
    ],
    'sort' => [
      'id' => 'standard',
    ],
  ];
  $data['commerce_stock_transaction']['location_id'] = [
    'title' => t('Location ID'),
    'help' => t('The Location ID.'),
    'field' => [
      'id' => 'numeric',
    ],
    'filter' => [
      'id' => 'numeric',
    ],
    'argument' => [
      'id' => 'numeric',
    ],
    'sort' => [
      'id' => 'standard',
    ],
    'relationship' => [
      'base' => 'commerce_stock_location',
      'base field' => 'location_id',
      'id' => 'standard',
      'label' => t('Stock Location'),
    ],
  ];
  $data['commerce_stock_transaction']['location_zone'] = [
    'title' => t('Zone'),
    'help' => t('The location zone.'),
    'field' => [
      'id' => 'standard',
    ],
    'argument' => [
      'id' => 'string',
    ],
    'filter' => [
      'id' => 'string',
    ],
    'sort' => [
      'id' => 'standard',
    ],
  ];
  $data['commerce_stock_transaction']['unit_cost'] = [
    'title' => t('Unit cost'),
    'help' => t('The cost of a single unit.'),
    'field' => [
      'id' => 'numeric',
    ],
    'filter' => [
      'id' => 'numeric',
    ],
    'argument' => [
      'id' => 'numeric',
    ],
    'sort' => [
      'id' => 'standard',
    ],
  ];
  $data['commerce_stock_transaction']['transaction_time'] = [
    'title' => t('Time'),
    'help' => t('The date & time of the transaction.'),
    'field' => [
      'id' => 'date',
    ],
    'sort' => [
      'id' => 'date',
    ],
    'filter' => [
      'id' => 'date',
    ],
  ];

  $data['commerce_stock_transaction']['transaction_type_id'] = [
    'title' => t('Type ID'),
    'help' => t('Transaction type ID.'),
    'field' => [
      'id' => 'numeric',
    ],
    'filter' => [
      'id' => 'numeric',
    ],
    'argument' => [
      'id' => 'numeric',
    ],
    'sort' => [
      'id' => 'standard',
    ],
  ];
  $data['commerce_stock_transaction']['related_tid'] = [
    'title' => t('Related transaction ID'),
    'help' => t('The related transaction ID.'),
    'field' => [
      'id' => 'numeric',
    ],
    'filter' => [
      'id' => 'numeric',
    ],
    'argument' => [
      'id' => 'numeric',
    ],
    'sort' => [
      'id' => 'standard',
    ],
  ];
  $data['commerce_stock_transaction']['related_oid'] = [
    'title' => t('Related order ID'),
    'help' => t('The related order ID.'),
    'field' => [
      'id' => 'numeric',
    ],
    'filter' => [
      'id' => 'numeric',
    ],
    'argument' => [
      'id' => 'numeric',
    ],
    'sort' => [
      'id' => 'standard',
    ],
    'relationship' => [
      'base' => 'commerce_order',
      'base field' => 'order_id',
      'id' => 'standard',
      'label' => t('Related Order'),
    ],
  ];
  $data['commerce_stock_transaction']['related_uid'] = [
    'title' => t('Related user ID'),
    'help' => t('The related user ID.'),
    'field' => [
      'id' => 'numeric',
    ],
    'filter' => [
      'id' => 'numeric',
    ],
    'argument' => [
      'id' => 'numeric',
    ],
    'sort' => [
      'id' => 'standard',
    ],
    'relationship' => [
      'base' => 'users_field_data',
      'base field' => 'uid',
      'id' => 'standard',
      'label' => t('User for the transaction'),
    ],
  ];
  $data['commerce_stock_transaction']['data'] = [
    'title' => t('data'),
    'help' => t('The serialized transaction data.'),
    'field' => [
      'id' => 'serialized',
      'click sortable' => FALSE,
    ],
    'filter' => [
      'id' => 'Standard',
    ],
    'argument' => [
      'id' => 'Standard',
    ],
    'sort' => [
      'id' => 'standard',
    ],
  ];

  // Stock transaction types.
  $data['commerce_stock_transaction_type'] = [];
  $data['commerce_stock_transaction_type']['table'] = [];
  $data['commerce_stock_transaction_type']['table']['group'] = t('Commerce Stock Local');
  $data['commerce_stock_transaction_type']['table']['provider'] = 'commerce_stock_local';
  $data['commerce_stock_transaction_type']['table']['base'] = [
    'field' => 'id',
    'title' => t('Commerce Stock Local transaction type'),
    'help' => t('Table holding the local stock transaction types.'),
    'weight' => -10,
  ];

  $data['commerce_stock_transaction_type']['table']['join']['commerce_stock_transaction']['left_field'] = 'transaction_type_id';
  $data['commerce_stock_transaction_type']['table']['join']['commerce_stock_transaction']['field'] = 'id';

  // Fields.
  $data['commerce_stock_transaction_type']['id'] = [
    'title' => t('Transaction type ID'),
    'help' => t('The transaction type ID.'),
    'field' => [
      'id' => 'numeric',
    ],
    'filter' => [
      'id' => 'numeric',
    ],
    'argument' => [
      'id' => 'numeric',
    ],
    'sort' => [
      'id' => 'standard',
    ],
  ];
  $data['commerce_stock_transaction_type']['name'] = [
    'title' => t('Transaction type name'),
    'help' => t('The transaction type name.'),
    'field' => [
      'id' => 'standard',
    ],
    'argument' => [
      'id' => 'string',
    ],
    'filter' => [
      'id' => 'string',
    ],
    'sort' => [
      'id' => 'standard',
    ],
  ];
  $data['commerce_stock_transaction_type']['parent_id'] = [
    'title' => t('Parent transaction type ID'),
    'help' => t('The parent transaction type ID.'),
    'field' => [
      'id' => 'numeric',
    ],
    'filter' => [
      'id' => 'numeric',
    ],
    'argument' => [
      'id' => 'numeric',
    ],
    'sort' => [
      'id' => 'standard',
    ],
  ];

  return $data;
}
