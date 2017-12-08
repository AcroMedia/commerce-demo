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

  // Mobile hide/show sidebar
  $('#mobile-sidebar__toggle-open a').on('click', function(event){
    event.preventDefault();
    $(this).hide();
    $('#mobile-sidebar__product-filters').slideDown('slow');
  });

  $('#mobile-sidebar__toggle-close a').on('click', function(event){
    event.preventDefault();
    $('#mobile-sidebar__product-filters').slideUp('slow');
    $('#mobile-sidebar__toggle-open a').delay(700).fadeIn(400);
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

  // Cart - If quantity input is focused, set enter key to update button.
  $('.views-field-edit-quantity input').keypress(function(event){
    if(event.keyCode == 13){
      $('input#edit-submit').click();
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
  // Create checkbox to let user use shipping info for payment (when no stored cards).
  if ( (!$("fieldset[id^='edit-payment-information-payment-method'] input[id^='edit-payment-information-payment-method-stored']").is(':checked')) ) {
    var useShippingLabel = Drupal.t('Use my shipping information.');

    $("fieldset[id^='edit-payment-information-payment-method']").after('<div class="fieldset-wrapper">' +
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

  // Checkout form - Other payment options.
  // This basically does the same as above but for AJAX.
  $(document).on('click', "div[id^='edit-payment-information-payment-method'] input", function() {
    var notStoredCard = !$("input[id^='edit-payment-information-payment-method-stored']").is(':checked');

    $.ajax( this.href, {
      complete: function(data) {
        if ( notStoredCard ) {
          // Checkout form - Remove screenreader class from all labels.
          $('.path-checkout form label').removeClass('sr-only');

          // Prefill credit card details
          $("input[id^='edit-payment-information-add-payment-method-payment-details-number").val('4111111111111111');
          $("select[id^='edit-payment-information-add-payment-method-payment-details-expiration-month").val('10');
          $("select[id^='edit-payment-information-add-payment-method-payment-details-expiration-year").val('2022');
          $("input[id^='edit-payment-information-add-payment-method-payment-details-security-code").val('123');

          // Create checkbox to let user use shipping info for new card.
          var useShippingLabel = Drupal.t('Use my shipping information.');

          $("fieldset[id^='edit-payment-information-payment-method']").after('<div class="fieldset-wrapper">' +
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

  // Facet Brand filter - Show more.
  if ($(".site-sidebar--desktop #block-brands li").length || $(".site-sidebar--mobile #block-brands li").length) {
    // Get number of options.
    var $brandsDesktop = $(".site-sidebar--desktop #block-brands li");
    var $brandsMobile = $(".site-sidebar--mobile #block-brands li");

    // Only show first 15 options.
    $brandsDesktop.slice(15).hide();
    $brandsMobile.slice(15).hide();

    // If too many options, show button.
    if (($brandsDesktop.size() || $brandsMobile.size()) > 16) {
      $(".site-sidebar--desktop #block-brands ul").after('<span class="show-more-options" tabindex="0">' + Drupal.t('Show more') + '</span>');
      $(".site-sidebar--mobile #block-brands ul").after('<span class="show-more-options" tabindex="0">' + Drupal.t('Show more') + '</span>');
    }

    // When button clicked, show all options and hide button.
    $('.show-more-options').click(function () {
      $('#block-brands li').fadeIn();
      $(this).hide();
    });
  }

  // Open any YouTube links in a modal.
  $('.region-content a').each(function () {
    var url = $(this).attr('href');

    // Filter YouTube URLs.
    if (url !== undefined || url !== '') {
      var regExp = /^.*(youtu.be\/|youtube\.com\|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      if (regExp.test(url)) {
        var match = url.match(regExp);
        if (match && match[2].length === 11) {
          // If YouTube video, embed video in modal.
          $('#videoModal .modal-body').append(
            '<iframe width="560px" height="315px" src="https://www.youtube.com/embed/' +
            match[2] +
            '?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>'
          );
          // Use FitVid on modal-body for responsive video.
          // https://github.com/davatron5000/FitVids.js
          $('.modal-body').fitVids();
          // Add a video class to the link.
          $(this).addClass('video-link');
        }
      }
    }
  });

  // Open videos in videoModal.
  $('.video-link').click(function (event) {
    if ($(this).hasClass('video-link')) {
      // Prevent default link event.
      event.preventDefault();
      // Open video in modal.
      $('#videoModal').modal('show');
    }
  });

  // Stop video playback when videoModal is closed.
  $("#videoModal").on('hidden.bs.modal', function (event) {
    $("#videoModal iframe").attr("src", $("#videoModal iframe").attr("src"));
  });

  // Run scripts after window fully loads.
  $(window).on('load', function() {
    // Language switcher.
    $('#block-currentlanguage a.is-active').click(function(event) {
      event.preventDefault();
      $('#block-languageswitcher').slideToggle('fast');
    });
  });

})(jQuery, Drupal);
