/**
 * Feature Beacon.
 */

(function ($, Drupal) {

  if ($('.feature-beacon__marker').length) {

    // Append markers to elements.
    $(window).on('load', function () {
      $('.feature-beacon__marker').each(function () {
        var $this = $(this);

        // Selector(s) to attach beacon to.
        var $selector = $this.data('selector');

        // If element exists.
        if ($($selector).length) {
          // Append marker.
          $($selector).append($this);

          // Add available class to marker.
          // This identifies markers that are attached to elements that exist on the current page.
          $($selector).find('.feature-beacon__marker').addClass('available');

          // Show or hide marker all markers depending on cookie.
          if (Cookies.get('hideFeatureBeacons') === 'true') {
            $('.feature-beacon__marker').hide();
          }
          else {
            $('.feature-beacon__marker.available').show();
          }
        }
      });
    });

    // Make sure Google Analytics is available. If so, send event data when beacon clicked.
    $('.feature-beacon__marker').click(function () {
      if (window.ga && ga.create) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'Feature Beacon',
          eventAction: 'Clicked',
          transport: 'beacon'
        });
      }
    });

    // Hide/show buttons.
    // Usefull variable.
    var $beaconButton = $('.feature-beacon-toggle');
    var $buttonIcon = $beaconButton.find('i');
    var $buttonText = $beaconButton.find('span');

    // Show button.
    $beaconButton.show();

    // On load, alter default button icon and label if beacons have been hidden.
    if (Cookies.get('hideFeatureBeacons') === 'true') {
      $buttonIcon.removeClass('fa-star-o');
      $buttonIcon.addClass('fa-star');
      $buttonText.text(Drupal.t('Show Beacons'));
    }

    // On button click, toggle beacons and alter button.
    $beaconButton.click(function () {
      if (Cookies.get('hideFeatureBeacons') === 'true') {
        $('.feature-beacon__marker.available').fadeIn();
        $buttonIcon.removeClass('fa-star');
        $buttonIcon.addClass('fa-star-o');
        $buttonText.text(Drupal.t('Hide Beacons'));
        Cookies.remove('hideFeatureBeacons');
      }
      else {
        $('.feature-beacon__marker').fadeOut();
        $buttonIcon.removeClass('fa-star-o');
        $buttonIcon.addClass('fa-star');
        $buttonText.text(Drupal.t('Show Beacons'));
        Cookies.set('hideFeatureBeacons', 'true');
      }
    });

  }

})(jQuery, Drupal);
