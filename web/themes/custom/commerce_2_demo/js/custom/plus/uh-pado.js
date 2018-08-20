/**
 * Commerce Product Add-ons.
 */

(function ($, Drupal) {

  // Add/remove button functionality.
  $('div[class*="form-item-add-ons-items-add-ons-"]').each(function () {
    var thisItem = $(this);

    var button = thisItem.find('.add-on-item__link--add');
    var checkbox = thisItem.find('input[type="checkbox"]');

    button.click(function (event) {
      event.preventDefault();

      // Update button text.
      var buttonText = button.text();
      $(this).text(buttonText === "Add" ? Drupal.t("Remove") : Drupal.t("Add"));

      // Check or uncheck checkbox.
      if (checkbox.prop("checked")) {
        checkbox.prop("checked", false);
        thisItem.removeClass('checked')
      }
      else {
        checkbox.prop("checked", true);
        thisItem.addClass('checked')
      }
    })
  });

  // Check for Add-on fieldsets with variations.
  if ($("fieldset[id*='edit-add-ons-items-add-ons-']").length) {

    // Loop through each fieldset containing variations.
    $("fieldset[id*=\'edit-add-ons-items-add-ons-']").each(function () {
      var thisGroup = $(this);

      // Create toggle button.
      thisGroup.find('legend .add-on-item__actions').prepend('<a href="#" class="btn btn-primary add-on-item__link add-on-item__link--toggle">' + Drupal.t("View options") + '</a>');

      // Use toggle button.
      thisGroup.find('.add-on-item__link--toggle').click( function (event) {
        // Stop default link action.
        event.preventDefault();

        // Toggle add-on items and active class.
        thisGroup.find('.fieldset-wrapper').slideToggle();
        $(this).toggleClass('active');

        // Update button text.
        var text = $(this).text();
        $(this).text(text === "View options" ? Drupal.t("Hide options") : Drupal.t("View options"));
      })
    });
  }

})(jQuery, Drupal);
