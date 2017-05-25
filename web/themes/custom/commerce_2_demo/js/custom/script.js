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
  $('select#edit-shipping-information-shipping-profile-address-0-address-country-code').val('US');
  $('input#edit-shipping-information-shipping-profile-address-0-address-given-name').val('Charles');
  $('input#edit-shipping-information-shipping-profile-address-0-address-family-name').val('Mound');
  $('input#edit-shipping-information-shipping-profile-address-0-address-organization').val('');
  $('input#edit-shipping-information-shipping-profile-address-0-address-address-line1').val('688 W Charles Mound Rd');
  $('input#edit-shipping-information-shipping-profile-address-0-address-locality').val('Scales Mound');
  $('select#edit-shipping-information-shipping-profile-address-0-address-administrative-area').val('IL');
  $('input#edit-shipping-information-shipping-profile-address-0-address-postal-code').val('61075');

  // Checkout form - Create checkbox to let user use shipping info for payment.
  var useShippingLabel = Drupal.t('Use my shipping information.');

  $('#payment-information-wrapper .fieldset-wrapper').prepend('<div class="fieldset-wrapper">' +
    ' <div id="use-shipping-information" class="webform-options-display-one-column js-webform-radios form-checkbox"> ' +
      ' <div class="form-item js-form-item form-type-checkbox js-form-type-checkbox form-item-use-shipping-information js-form-item-use-shipping-information">' +
      ' <input data-drupal-selector="use-shipping-information-input" type="checkbox" id="use-shipping-information-input" name="Use Shipping Information" value="use-shipping-information" class="form-radio"> ' +
      ' <label for="use-shipping-information-label" class="control-label option">' +
          useShippingLabel  +
      ' </label><span class="form-optional use-shipping-information-label"> - Optional</span> ' +
    ' </div>' +
  ' </div>');

  // Checkout form - Use the checkbox above.
  $('#use-shipping-information-input').click(function () {
    if ( $(this).is(':checked') ) {
      // Get current shipping field values.
      var $shippingCountry = $('select#edit-shipping-information-shipping-profile-address-0-address-country-code').val();
      var $shippingFirst = $('input#edit-shipping-information-shipping-profile-address-0-address-given-name').val();
      var $shippingLast = $('input#edit-shipping-information-shipping-profile-address-0-address-family-name').val();
      var $shippingCompany = $('input#edit-shipping-information-shipping-profile-address-0-address-organization').val();
      var $shippingStreet = $('input#edit-shipping-information-shipping-profile-address-0-address-address-line1').val();
      var $shippingStreet2 = $('input#edit-shipping-information-shipping-profile-address-0-address-address-line2').val();
      var $shippingCity = $('input#edit-shipping-information-shipping-profile-address-0-address-locality').val();
      var $shippingState = $('select#edit-shipping-information-shipping-profile-address-0-address-administrative-area').val();
      var $shippingPostal = $('input#edit-shipping-information-shipping-profile-address-0-address-postal-code').val();

      // Set the payment field values.
      $('select#edit-payment-information-billing-information-address-0-address-country-code').val($shippingCountry);
      $('input#edit-payment-information-billing-information-address-0-address-given-name').val($shippingFirst);
      $('input#edit-payment-information-billing-information-address-0-address-family-name').val($shippingLast);
      $('input#edit-payment-information-billing-information-address-0-address-organization').val($shippingCompany);
      $('input#edit-payment-information-billing-information-address-0-address-address-line1').val($shippingStreet);
      $('input#edit-payment-information-billing-information-address-0-address-address-line2').val($shippingStreet2);
      $('input#edit-payment-information-billing-information-address-0-address-locality').val($shippingCity);
      $('select#edit-payment-information-billing-information-address-0-address-administrative-area').val($shippingState);
      $('input#edit-payment-information-billing-information-address-0-address-postal-code').val($shippingPostal);
    }
    else {
      // Remove payment field values.
      $('input#edit-payment-information-billing-information-address-0-address-given-name').val('');
      $('input#edit-payment-information-billing-information-address-0-address-family-name').val('');
      $('input#edit-payment-information-billing-information-address-0-address-organization').val('');
      $('input#edit-payment-information-billing-information-address-0-address-address-line1').val('');
      $('input#edit-payment-information-billing-information-address-0-address-address-line2').val('');
      $('input#edit-payment-information-billing-information-address-0-address-locality').val('');
      $('input#edit-payment-information-billing-information-address-0-address-postal-code').val('');
    }
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
