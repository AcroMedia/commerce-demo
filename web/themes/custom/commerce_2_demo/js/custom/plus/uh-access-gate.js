/**
 * Access Gate.
 */

(function ($, Drupal) {

  // Access gate modal.
  if ($('.access-gate').length) {

    $('.access-gate').each(function () {
      var $this = $(this);

      // Current page URL.
      var currentPage = window.location.href;

      // Referrer page URL.
      var referrer =  document.referrer;

      // Gate sources.
      var $sources = $this.data('gate-sources');

      // Make array from sources.
      var $sourceArray = $sources.split(',');

      // Loop through sourceArray.
      $.each($sourceArray, function(index, $source) {
        // If currentPage or referrer matches a source AND the access gate cookie is not disabled, show access gate.
        if ((currentPage.indexOf($source) !== -1 || referrer.indexOf($source) !== -1 || $source === 'fullgate') && (Cookies.get('showAccessGate') !== 'false')) {
          // Open modal and prevent clicking the background or using the keyboard to close the modal.
          $this.modal({
            backdrop: 'static',
            keyboard: false
          });

          return false;
        }
      });

      // If user completes requirements to remove gate, update cookie to disable the gate.
      // Make sure window has loaded so we can select embedded elements.
      $(window).on('load', function () {

        // NOTE: Currently we're always checking for a HubSpot form.
        if ($('.hs-button').length) {
          $('.hs-button').on('click', function () {
            // Check for success message to know when form successfully submitted.
            // Delay needed to make sure success message is shown.
            setTimeout(function () {
              if ($('.submitted-message').length) {
                // Set cookie to disable access gate.
                Cookies.set('showAccessGate', 'false');

                // Allow access gate modal to be closed.
                $this.find('#footerClose').removeClass('disabled');
                $this.find('#footerClose').removeAttr('tabindex');

                // Make sure Google Analytics is available. If so, send event data.
                if (window.ga && ga.create) {
                  ga('send', {
                    hitType: 'event',
                    eventCategory: 'Access Gate Form',
                    eventAction: 'Submitted',
                    transport: 'beacon'
                  });
                }
              }
            }, 2500);
          });
        }
      });
    });

  }

})(jQuery, Drupal);
