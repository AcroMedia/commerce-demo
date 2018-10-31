// Modified from https://codepen.io/maghrout/pen/KqmJbQ

(function (window) {

  'use strict';

  window.code = window.code || {};

  window.code.lightweightYoutubePlayer = function () {

    var dataYoutubeVideos = '[data-youtube]';

    var youtubeVideos = [...document.querySelectorAll(dataYoutubeVideos)];

    function init() {
      youtubeVideos.forEach(function(element) {
        bindYoutubeVideoEvent(element);
      });
    }

    function bindYoutubeVideoEvent(element) {
      var button = element.querySelector('[data-youtube-button]');

      button.addEventListener('click', createIframe);
    }

    function createIframe(event) {
      var url = event.target.dataset.youtubeButton;
      var youtubePlaceholder = event.target.parentNode;

      var htmlString = '<div class="feature-video__youtube"> <iframe class="feature-video__iframe" src="' + url + '?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';

      youtubePlaceholder.style.display = 'none';
      youtubePlaceholder.insertAdjacentHTML('beforebegin', htmlString);
      youtubePlaceholder.parentNode.removeChild(youtubePlaceholder);
    }

    return {
      init: init
    };
  };

})(window);

ready();

function ready() {
  var lightweightYoutubePlayer = new code.lightweightYoutubePlayer();

  if (document.readyState != 'loading') {
    page.init();
  } else {
    document.addEventListener('DOMContentLoaded', lightweightYoutubePlayer.init);
  }
}
