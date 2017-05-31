/**
 * Custom scripts.
 */
(function ($, Drupal) {
  // External links.
  $("a[href^='http']").each(function() {
    var re_matches = /https?:\/\/([^\/]*)/.exec($(this).attr('href'));
    // Check link against the current domain.
    if(re_matches && re_matches[1] && re_matches[1] != location.hostname && re_matches[1] != 'www.'+location.hostname && 'www.'+re_matches[1] != location.hostname) {
      $(this).attr('target', '_blank');
    }
  });

  // Mobile Overlay.
  $('.mobile-overlay').click(function(e) {
    $(this).fadeOut('fast');
    $('.mobile-search-form input.form-search').blur();
  });
  $('.mobile-overlay__content').click(function(e) {
    e.stopPropagation();
  });

  // Mobile Search.
  $('.mobile-control-nav .menu__item--search a').click(function(e) {
    $('.mobile-search-overlay').fadeIn('fast');
    $('.mobile-search-form input.form-search').focus();
    e.preventDefault();
  });
  $('.mobile-search-form__submit').click(function(e) {
    $('.mobile-search-form form').submit();
    e.preventDefault();
  });

  // Mobile Navigation.
  $('.mobile-control-nav .menu__item--menu a').click(function(e) {
    $('.mobile-nav-overlay').fadeIn('fast');
    e.preventDefault();
  });
  $('.mobile-overlay__close').click(function(e) {
    $('.mobile-overlay').fadeOut('fast');
    $('.mobile-search-form input.form-search').blur();
    e.preventDefault();
  });

  // Mobile Navigation - Clone expandable parent into sub-menu.
  $('.mobile-nav nav > ul > li.menu__item--expanded > a').each(function() {
    var $this = $(this);
    var $thisClone = $(this).clone();
    // Change the link text so there's not duplicate links beside each other.
    $thisClone.html(Drupal.t('Overview'));

    $thisClone.wrap('<li class="menu__item menu__item--parent-overview"></li>').parent().prependTo($this.next('ul'));
  });

  // Mobile Navigation - Click on parents to expand.
  $('.mobile-nav nav > ul > li.menu__item--expanded > a').click(function(e) {
    var $this = $(this);
    var $nextMenu = $this.next('ul');

    // Toggle slide animation for sub-menus.
    $nextMenu.slideToggle('fast');
    $('.mobile-nav nav > ul > li.menu__item--expanded > a').next('ul').not($nextMenu).slideUp('fast');

    e.preventDefault();
  });

  // Add search input placeholder.
  $('#block-solr-product-search input.form-text').attr('placeholder', Drupal.t('Site Search...'));

  // Add search button icon.
  $('.site-header__top #block-solr-product-search input.form-submit').after('<i class="fa fa-search"></i>');

  // Site search submit trigger.
  if ($('.form-search-submit-trigger').length) {
    $('.form-search-submit-trigger').click(function(e) {
      // Submit the parent form.
      $(this).parents('form').submit();
      e.preventDefault();
    });
  }

  // Homepage Carousel Slider.
  if ($('.homepage-carousel-slider').length) {
    $('.homepage-carousel-slider').flexslider({
      animation: 'fade',
      slideshow: true,
      controlNav: true,
      directionNav: true,
      smoothHeight: true,
      prevText: '',
      nextText: ''
    });
  }

  // Sets primary nav menu item active class.
  var currentPath = window.location.pathname; // Returns path only

  $('.primary-nav .views-row').each(function () {
    var $link = $(this).find('a');
    var $linkPath = $link.attr('href');

    if (currentPath == $linkPath) {
      $link.addClass('is-active');
    }
  });

  // Product page tabs.
  $('#product-tabs a:first').tab('show'); // Show first tab initially

  $('#product-tabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  });

  // Make reviews tab active if it is the only tab.
  var $tabCount = $('.product-tabs li').length;

  if ($tabCount == 1) {
    $('.product-tabs li').addClass('active');
    $('.product-tabs .tab-pane').addClass('in active');
  }

  // Add responsive table class around tables.
  $('table').wrap( "<div class='table-responsive'></div>" );

  // Checkout form - Change line adjustment labels - Super janky.
  $('.order-total-line__adjustment .order-total-line-label').each(function () {
    var $adjustmentLabel = $(this).text();

    if ($adjustmentLabel == 'Discount ') {
      $(this).text('20% Off Storewide Sale ');
    }
  });

  // Checkout form - Remove screenreader class from all labels.
  $('.path-checkout form label').removeClass('sr-only');

  // Checkout form - pre-populate fields for quick checkout.
  $('input#edit-contact-information-email').val('demo@acromediainc.com');
  $('#shipping-information-wrapper select.country').val('US');
  $('#shipping-information-wrapper input.given-name').val('Charles');
  $('#shipping-information-wrapper input.family-name').val('Mound');
  $('#shipping-information-wrapper input.organization').val('');
  $('#shipping-information-wrapper input.address-line1').val('688 W Charles Mound Rd');
  $('#shipping-information-wrapper input.address-line2').val('');
  $('#shipping-information-wrapper input.locality').val('Scales Mound');
  $('#shipping-information-wrapper select.administrative-area').val('IL');
  $('#shipping-information-wrapper input.postal-code').val('61075');
  $('input#edit-payment-information-add-payment-method-payment-details-number').val('4111111111111111');
  $('select#edit-payment-information-add-payment-method-payment-details-expiration-month').val('10');
  $('select#edit-payment-information-add-payment-method-payment-details-expiration-year').val('2022');
  $('input#edit-payment-information-add-payment-method-payment-details-security-code').val('123');

  // Checkout form - Guest Checkout
  // Create checkbox to let user use shipping info for payment.
  if ( !$('.form-item-payment-information-payment-method').length ) {
    var useShippingLabel = Drupal.t('Use my shipping information.');

    $('#payment-information-wrapper .fieldset-wrapper:first').prepend('<div class="fieldset-wrapper">' +
      ' <div id="use-shipping-information" class="webform-options-display-one-column js-webform-radios form-checkbox"> ' +
      ' <div class="form-item js-form-item form-type-checkbox js-form-type-checkbox form-item-use-shipping-information js-form-item-use-shipping-information">' +
      ' <input data-drupal-selector="use-shipping-information-input" type="checkbox" id="use-shipping-information-input" name="Use Shipping Information" value="use-shipping-information" class="form-radio"> ' +
      ' <label for="use-shipping-information-label" class="control-label option">' +
      useShippingLabel  +
      ' </label><span class="form-optional use-shipping-information-label"> - Optional</span> ' +
      ' </div>' +
      ' </div>'
    );
  }

  // Use the checkbox above.
  $('#use-shipping-information-input').click(function () {
    if ( $(this).is(':checked') ) {
      // Get current shipping field values.
      var $shippingCountry = $('#shipping-information-wrapper select.country').val();
      var $shippingFirst = $('#shipping-information-wrapper input.given-name').val();
      var $shippingLast = $('#shipping-information-wrapper input.family-name').val();
      var $shippingCompany = $('#shipping-information-wrapper input.organization').val();
      var $shippingStreet = $('#shipping-information-wrapper input.address-line1').val();
      var $shippingStreet2 = $('#shipping-information-wrapper input.address-line2').val();
      var $shippingCity = $('#shipping-information-wrapper input.locality').val();
      var $shippingState = $('#shipping-information-wrapper select.administrative-area').val();
      var $shippingPostal = $('#shipping-information-wrapper input.postal-code').val();

      // Set the payment field values.
      $("div[id^='payment-information-wrapper'] select.country").val($shippingCountry);
      $("div[id^='payment-information-wrapper'] input.given-name").val($shippingFirst);
      $("div[id^='payment-information-wrapper'] input.family-name").val($shippingLast);
      $("div[id^='payment-information-wrapper'] input.organization").val($shippingCompany);
      $("div[id^='payment-information-wrapper'] input.address-line1").val($shippingStreet);
      $("div[id^='payment-information-wrapper'] input.address-line2").val($shippingStreet2);
      $("div[id^='payment-information-wrapper'] input.locality").val($shippingCity);
      $("div[id^='payment-information-wrapper'] select.administrative-area").val($shippingState);
      $("div[id^='payment-information-wrapper'] input.postal-code").val($shippingPostal);
    }
    else {
      // Remove payment field values.
      $("div[id^='payment-information-wrapper'] select.country").val('');
      $("div[id^='payment-information-wrapper'] input.given-name").val('');
      $("div[id^='payment-information-wrapper'] input.family-name").val('');
      $("div[id^='payment-information-wrapper'] input.organization").val('');
      $("div[id^='payment-information-wrapper'] input.address-line1").val('');
      $("div[id^='payment-information-wrapper'] input.address-line2").val('');
      $("div[id^='payment-information-wrapper'] input.locality").val('');
      $("div[id^='payment-information-wrapper'] select.administrative-area").val('');
      $("div[id^='payment-information-wrapper'] input.postal-code").val('');
    }
  });

  // Checkout form - Customer w/ saved card.
  // This basically does the same as above but for AJAX.
  $(document).on('click', "input[id^='edit-payment-information-payment-method-new-credit-card-example-payment']", function() {
    var checked = $(this).is(':checked');

    $.ajax( this.href, {
      complete: function(data) {
        if (checked) {
          // Checkout form - Remove screenreader class from all labels.
          $('.path-checkout form label').removeClass('sr-only');

          // Prefill credit card details
          $("input[id^='edit-payment-information-add-payment-method-payment-details-number").val('4111111111111111');
          $("select[id^='edit-payment-information-add-payment-method-payment-details-expiration-month").val('10');
          $("select[id^='edit-payment-information-add-payment-method-payment-details-expiration-year").val('2022');
          $("input[id^='edit-payment-information-add-payment-method-payment-details-security-code").val('123');

          // Create checkbox to let user use shipping info for new card.
          var useShippingLabel = Drupal.t('Use my shipping information.');

          $('.form-item-payment-information-add-payment-method-payment-details-number').prepend('<div class="fieldset-wrapper">' +
            ' <div id="use-shipping-information" class="webform-options-display-one-column js-webform-radios form-checkbox"> ' +
            ' <div class="form-item js-form-item form-type-checkbox js-form-type-checkbox form-item-use-shipping-information js-form-item-use-shipping-information">' +
            ' <input data-drupal-selector="use-shipping-information-input" type="checkbox" id="use-shipping-information-input" name="Use Shipping Information" value="use-shipping-information" class="form-radio"> ' +
            ' <label for="use-shipping-information-label" class="control-label option">' +
            useShippingLabel  +
            ' </label><span class="form-optional use-shipping-information-label"> - Optional</span> ' +
            ' </div>' +
            ' </div>'
          );

          // Use the checkbox above.
          $('#use-shipping-information-input').click(function () {
            if ( $(this).is(':checked') ) {
              // Get current shipping field values.
              var $shippingCountry = $('#shipping-information-wrapper select.country').val();
              var $shippingFirst = $('#shipping-information-wrapper input.given-name').val();
              var $shippingLast = $('#shipping-information-wrapper input.family-name').val();
              var $shippingCompany = $('#shipping-information-wrapper input.organization').val();
              var $shippingStreet = $('#shipping-information-wrapper input.address-line1').val();
              var $shippingStreet2 = $('#shipping-information-wrapper input.address-line2').val();
              var $shippingCity = $('#shipping-information-wrapper input.locality').val();
              var $shippingState = $('#shipping-information-wrapper select.administrative-area').val();
              var $shippingPostal = $('#shipping-information-wrapper input.postal-code').val();

              // Set the payment field values.
              $("div[id^='payment-information-wrapper'] select.country").val($shippingCountry);
              $("div[id^='payment-information-wrapper'] input.given-name").val($shippingFirst);
              $("div[id^='payment-information-wrapper'] input.family-name").val($shippingLast);
              $("div[id^='payment-information-wrapper'] input.organization").val($shippingCompany);
              $("div[id^='payment-information-wrapper'] input.address-line1").val($shippingStreet);
              $("div[id^='payment-information-wrapper'] input.address-line2").val($shippingStreet2);
              $("div[id^='payment-information-wrapper'] input.locality").val($shippingCity);
              $("div[id^='payment-information-wrapper'] select.administrative-area").val($shippingState);
              $("div[id^='payment-information-wrapper'] input.postal-code").val($shippingPostal);
            }
            else {
              // Remove payment field values.
              $("div[id^='payment-information-wrapper'] select.country").val('');
              $("div[id^='payment-information-wrapper'] input.given-name").val('');
              $("div[id^='payment-information-wrapper'] input.family-name").val('');
              $("div[id^='payment-information-wrapper'] input.organization").val('');
              $("div[id^='payment-information-wrapper'] input.address-line1").val('');
              $("div[id^='payment-information-wrapper'] input.address-line2").val('');
              $("div[id^='payment-information-wrapper'] input.locality").val('');
              $("div[id^='payment-information-wrapper'] select.administrative-area").val('');
              $("div[id^='payment-information-wrapper'] input.postal-code").val('');
            }
          });
        }
      }
    });
  });

  // Run scripts after window fully loads.
  $(window).load(function(){
    // Language switcher.
    $('#block-currentlanguage a.is-active').click(function(event) {
      event.preventDefault();
      $('#block-languageswitcher').slideToggle('fast');
    });

    // Triggers search facet when page has loaded, based on menu url.
    // Define regex patter to filter out facet category.
    var regexPattern = /((cat-)\d+)/g;
    var regexPatternSpecial = /((special-)\d+)/g;

    // Run current page url through regex and check if successful.
    var currentUrl = window.location.href; // Returns full url
    // Normal categories.
    if (regexPattern.test(currentUrl) === true) {
      // Filter out category.
      var regexUrl = currentUrl.match(regexPattern);
      var filteredCategory = regexUrl[0];

      // Simulate click on facet matching filter.
      $('.site-sidebar .block-facets').find('input#' + filteredCategory).trigger('click');
    }
    // Special categories.
    else if (regexPatternSpecial.test(currentUrl) === true) {
      // Filter out category.
      var regexUrl = currentUrl.match(regexPatternSpecial);
      var filteredCategory = regexUrl[0];

      // Simulate click on facet matching filter.
      $('.site-sidebar .block-facets').find('input#' + filteredCategory).trigger('click');
    }

    // Trigger search facet on product pages when main menu is clicked.
    $('.path-products .view-facet-menus a').click(function(event) {
      event.preventDefault();

      // Run nav item url through regex and check if successful.
      var navUrl = $(this).attr('href');
      // Normal categories.
      if (regexPattern.test(navUrl) === true) {
        // Filter out category.
        var regexNavUrl = navUrl.match(regexPattern);
        var filteredNavCategory = regexNavUrl[0];

        // Simulate click on facet matching filter only if it's not already checked.
        $('.site-sidebar .block-facets').find('input#' + filteredNavCategory).not(':checked').trigger('click');
      }
      // Special categories.
      else if (regexPatternSpecial.test(navUrl) === true) {
        // Filter out category.
        var regexNavUrl = navUrl.match(regexPatternSpecial);
        var filteredNavCategory = regexNavUrl[0];

        // Simulate click on facet matching filter only if it's not already checked.
        $('.site-sidebar .block-facets').find('input#' + filteredNavCategory).not(':checked').trigger('click');
      }
    });
  });

})(jQuery, Drupal);
