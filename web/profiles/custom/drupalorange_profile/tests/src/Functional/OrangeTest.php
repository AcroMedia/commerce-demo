<?php

namespace Drupal\Tests\orange\Functional;

use Drupal\Tests\BrowserTestBase;

/**
 * Tests the basic install.
 *
 * @group orange
 */
class OrangeTest extends BrowserTestBase {

    protected $profile = 'orange';

    /**
     * Tests pages exist
     */
    public function testOrangePages() {
        $this->drupalGet('livecss');
        $this->assertSession()->statusCodeEquals(200);
    }

}
