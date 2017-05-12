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
  $('#block-solr-product-search input.form-submit').after('<i class="fa fa-search"></i>');

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
      directionNav: false,
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

  // Run scripts after window fully loads.
  $(window).load(function(){
    // Language switcher.
    $('#block-currentlanguage a.is-active').click(function(event) {
      event.preventDefault();
      $('#block-languageswitcher').slideToggle('fast');
    });
  });

})(jQuery, Drupal);
