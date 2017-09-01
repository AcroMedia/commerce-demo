/**
 * Homepage tour.
 * http://introjs.com/docs/
 */

(function ($, Drupal) {

  // Page 1.
  function homepageTour(){
    var homepageTour = introJs(),

      steps = [
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Homepage Features Tour</span>' +
          "This tour will show you all of the unique homepage features packed into our Drupal Commerce 2.x demo site."
          + '<br><br>' +
          "Of course, this is just one layout. Drupal's powerful theming engine can adapt to anything your creative staff can imagine."
        },
        {
          element: '.site-header',
          intro: '<span class="introjs-tooltip__title">Everything Your Customers Need is in the Header</span>' +
          "The site header is the first thing your customers will see, so it's important that it contains everything customers will need. Branding and navigation aside, let's take a look at some of the more unique elements."
        },
        {
          element: '.site-header__promo',
          intro: '<span class="introjs-tooltip__title">Top CTA</span>' +
          "An easily customizable call-to-action at the top of the page is a subtle way to announce promotions."
        },
        {
          element: '.region-language-select',
          intro: '<span class="introjs-tooltip__title">Multi-store / Multi-language</span>' +
          "Out of the box, Drupal and Drupal Commerce come with exceptional support for multi-store and multi-language websites."
        },
        {
          element: '.region-header',
          intro: '<span class="introjs-tooltip__title">Contact Details</span>' +
          "Let your customers know that help is available."
        },
        {
          element: '.region-header-right',
          intro: '<span class="introjs-tooltip__title">Customer Access & Quick Cart</span>' +
          "Customers can login and access their account overview pages via this customer menu. "
          + '<br><br>' +
          "A quick-view cart lets them quickly see what they have in their cart at any time."
        },
        {
          element: '.site-header__search .region-site-search',
          intro: '<span class="introjs-tooltip__title">SOLR Powered Site Search</span>' +
          "SOLR has become the standard for generating search results. From products or blog posts, Drupal Commerce leverages SOLR heavily."
        },
        {
          element: 'ul.slides',
          intro: '<span class="introjs-tooltip__title">Rich Media Slider</span>' +
          "Large, impressive graphics draw the attention of your customers. Rich media sliders are a great way to make in impact."
        },
        {
          element: '.region-above-content',
          intro: '<span class="introjs-tooltip__title">Content CTAs</span>' +
          "An assortment of content area CTAs can give customers necessary information or direct them to your more popular products."
        },
        {
          element: '.block-views-blockfeatured-products-block-1',
          intro: '<span class="introjs-tooltip__title">Featured Products</span>' +
          "Feature products throughout your website, configured manually or dynamically."
        },
        {
          element: '.block-views-blockfeatured-products-block-3',
          intro: '<span class="introjs-tooltip__title">Targeted Featured Products</span>' +
          "Featured products can easily be narrowed down to specific categories, too."
        },
        {
          element: '.block-webform',
          intro: '<span class="introjs-tooltip__title">Newsletter Sign-up</span>' +
          "Capture emails for your newsletter and promotional emails. Signups like this can be integrated easily with your existing email delivery provider."
        },
        {
          element: '.region-below-content',
          intro: '<span class="introjs-tooltip__title">Bottom CTAs</span>' +
          "Additional CTAs can be provided for unique website features and customer service links."
        },
        {
          element: '.site-footer',
          position: 'top',
          intro: '<span class="introjs-tooltip__title">A Place for Everything Else</span>' +
          "The footer, as always, can be customized to display anything else required on the page. Social media links, contact information, legal jargon, etc."
        },
        {
          // No element makes this tip float on center of page.
          intro: '<span class="introjs-tooltip__title">Done!</span>' +
          "As you can see, there are a lot of interesting elements that can make up an ecommerce homepage. Whatever type of homepage layout you would like, Drupal Commerce can adapt! You're only limited by your imagination (and developer resources of course). This completes the Homepage Feature Tour."
        }
      ];

    homepageTour.setOptions({steps: steps});

    // Load defaults.
    tourDefaults(homepageTour);

    // Start tour and trigger tour select modal when completed.
    homepageTour.start().oncomplete(function() {
      $('#siteTours').modal('show');
    });
  }


  //////////////////////////////////////
  // Start tours from #siteTours modal.
  //////////////////////////////////////

  // If not on desired start page, go to that page and append trigger.
  // Otherwise, close modal and start tour.
  $('#homepageTour').click(function () {
    if (window.location.pathname !== '/') {
      window.location.href = '/?startHomepageTour';
    }
    else {
      $('#siteTours').modal('hide');
      setTimeout(homepageTour, 1000);
    }
  });


  /////////////////////////////////////////
  // URL triggers to start/continue tours.
  /////////////////////////////////////////

  // homepageTour URL triggers.
  if (RegExp('startHomepageTour', 'gi').test(window.location.search)) {
    homepageTour();
  }

})(jQuery, Drupal);
