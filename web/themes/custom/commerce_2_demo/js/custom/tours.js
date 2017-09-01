/**
 * Intro.js custom site tours.
 */

///////////////////////////////////
// Default intro.js tour settings.
///////////////////////////////////

function tourDefaults(tour) {
  tour.setOption('nextLabel', '>');
  tour.setOption('prevLabel', '<');
  tour.setOption('skipLabel', 'Close');
  tour.setOption('doneLabel', 'Done!');
  tour.setOption('tooltipClass', 'introjs-tooltip__custom');
  tour.setOption('highlightClass', 'introjs--helperLayer__custom');
  tour.setOption('tooltipPosition', 'auto');
  tour.setOption('positionPrecedence', ['left', 'right', 'bottom-middle-aligned', 'top']);
  tour.setOption('showBullets', true);
  tour.setOption('showProgress', false);
  tour.setOption('scrollToElement', true);
  tour.setOption('disableInteraction', true);
}

(function ($, Drupal) {

  //////////////////////////
  // Load individual tours.
  //////////////////////////

  var sitePath = document.location.origin + "/themes/custom/commerce_2_demo/js/custom/tours/";

  $.getScript(sitePath + 'tour_homepage.js');
  $.getScript(sitePath + 'tour_product-page.js');
  $.getScript(sitePath + 'tour_catalog-filters.js');
  $.getScript(sitePath + 'tour_solr-search.js');
  $.getScript(sitePath + 'tour_quick-cart.js');
  $.getScript(sitePath + 'tour_why-drupal.js');
  $.getScript(sitePath + 'tour_why-open-source.js');

})(jQuery, Drupal);
