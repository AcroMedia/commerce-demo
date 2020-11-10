<?php

/**
 * Dev environment settings.
 *
 * This is meant to be copied and renamed to settings.local.php.
 * It includes default settings to be used on a dev environment.
 * Look at sites/example.settings.local.php for more options.
 *
 * Include it in settings.php
 *
 * if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {
 *   include $app_root . '/' . $site_path . '/settings.local.php';
 * }
 */

/**
 * Database configuration.
 */
$databases['default']['default'] = [
  'database' => 'drupal8',
  'username' => 'drupal8',
  'password' => 'drupal8',
  'host' => 'database',
  'port' => '',
  'driver' => 'mysql',
  'prefix' => '',
];

/**
 * Solr.
 *
 * Configure to match your local server or Lando config.
 */
$config['search_api.server.solr']['backend_config']['connector_config']['host'] = 'index';
$config['search_api.server.solr']['backend_config']['connector_config']['port'] = '8983';

/**
 * Enable local development services.
 */
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';

/**
 * Error output.
 */
$config['system.logging']['error_level'] = 'verbose';

/**
 * File system.
 */
$settings['file_public_path'] = 'sites/default/files';
$settings['file_private_path'] = '../private';
$config['system.file']['path.temporary'] = '/tmp';

/**
 * Aggregation and caching.
 */
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;

/**
 * Email rerouting.
 */
$config['reroute_email.settings']['reroute_email_enable'] = 1;
$config['reroute_email.settings']['reroute_email_address'] = 'myemail@example.com';

/**
 * Stage file proxy.
 */
$config['stage_file_proxy.settings']['origin'] = 'https://commerceplus.acromedia.com';
$config['stage_file_proxy.settings']['use_imagecache_root'] = FALSE;
$config['stage_file_proxy.settings']['hotlink'] = FALSE;
$config['stage_file_proxy.settings']['origin_dir'] = 'sites/default/files';

/**
 * Disable tracking scripts.
 *
 * It's good practice to have these set on staging environments as well.
 */
$config['google_analytics.settings']['account'] = 'UA-XXXXXXXX-XX';
$config['google_tag.settings']['container_id'] = 'GTM-XXXXXX';
$config['google_tag.container.default']['container_id'] = 'GTM-XXXXXX';
$config['hotjar.settings']['account'] = 'XXXXXX';

