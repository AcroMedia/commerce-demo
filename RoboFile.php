<?php

use Robo\Tasks;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Filesystem\Filesystem;
use Leafo\ScssPhp\Compiler;

/**
 * This is project's console commands configuration for Robo task runner.
 *
 * @see http://robo.li/
 */
class RoboFile extends Tasks {

  /**
   * Build CSS from SASS.
   *
   * Compile SCSS files and adds vendor prefixes with PHP and Robo.
   *
   * Example:
   *   build:css web/themes/custom/commerce_2_demo/sass/custom/style.scss web/themes/custom/commerce_2_demo/css/style.css
   *
   * @param string $input
   *   Input scss file.
   * @param string $output
   *   Output css file.
   */
  public function buildCss(string $input, string $output) {
    $this->sassCompile($input, $output);
    $this->csscrushAutoprefix($output);
  }

  /**
   * Compile SCSS files.
   *
   * Compile SCSS files with PHP and Robo.
   *
   * Examples:
   *   sass:compile src/style.scss dist/style.css
   *   sass:compile src/style.scss > dist/style.css
   *
   * @param string $input
   *   Input scss file.
   * @param string $output
   *   Output css file.
   * @param array $options
   *   Output css file.
   *
   * @option $output-style
   *   CSS output style (nested, expanded, compressed or compact).
   * @option $exclude-source-map
   *   Exclude generating source map file.
   */
  public function sassCompile(string $input, string $output = NULL, array $options = ['output-style' => 'nested', 'exclude-source-map' => FALSE]) {
    $fileSystem = new Filesystem();

    if (!$fileSystem->exists($input)) {
      \Robo\Result::error($this, 'SASS file path provided does not exist');
    }

    $srcDirName = dirname($input);
    $formatters = [
      'nested' => \Leafo\ScssPhp\Formatter\Nested::class,
      'expanded' => \Leafo\ScssPhp\Formatter\Expanded::class,
      'compressed' => \Leafo\ScssPhp\Formatter\Compressed::class,
      'compact' => \Leafo\ScssPhp\Formatter\Compact::class,
    ];

    $scss = new Compiler();
    $scss->setImportPaths($srcDirName);
    $scss->setFormatter($formatters[$options['output-style']]);

    // No output defined. Write to stdout.
    if ($output === NULL) {
      print $scss->compile(file_get_contents($input), $srcDirName);
      return;
    }

    $destDirName = pathinfo($output, PATHINFO_DIRNAME);
    $destFileName = pathinfo($output, PATHINFO_BASENAME);

    // If our dest directory does not exist, create it.
    if (!$fileSystem->exists($destDirName)) {
      $fileSystem->mkdir($destDirName, 0644);
    }

    if (!$options['exclude-source-map']) {
      $scss->setSourceMap(Compiler::SOURCE_MAP_FILE);
      $scss->setSourceMapOptions([
        'sourceMapWriteTo' => $destDirName . "/{$destFileName}.map",
        'sourceMapURL' => $destFileName . '.map',
        'sourceMapFilename' => $output,
        'sourceMapBasepath' => $destDirName,
      ]);
    }

    $fileSystem->dumpFile($output, $scss->compile(file_get_contents($input), $srcDirName));
  }

  /**
   * @param $path
   *   Path to CSS file
   *
   * @return bool
   */
  public function csscrushAutoprefix($path) {
    $fileSystem = new Filesystem();

    if (!$fileSystem->exists($path)) {
      $this->say('CSS file path provided does not exist');
      return FALSE;
    }

    $css = csscrush_string(file_get_contents($path), [
      'minify' => FALSE,
    ]);

    $fileSystem->dumpFile($path, $css);
  }
}
