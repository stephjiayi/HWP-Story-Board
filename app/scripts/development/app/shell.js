var app = window.app || {};

app.shell = (function(window) {
  var configMap = {

  };

  var init = function() {
    //Screen #2
    var aboutContainer = document.getElementsByClassName('about-wrapper')[0];
    app.views.about.init(aboutContainer);

    //Screen #3
    var youContainer = document.getElementsByClassName('you-wrapper')[0];
    app.views.you.init(youContainer);

    //Screen #3
    var pyramidContainer = document.getElementsByClassName('pyramid-wrapper')[0];
    app.views.pyramid.init(pyramidContainer);
  };

  return {
    init: init
  };

})(window);