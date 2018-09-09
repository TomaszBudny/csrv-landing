(function($) {

  var spyoffset = function() {
    var varspyoffset = $(window).height() / 3;
    $("body").attr({
      "data-spy": "scroll",
      "data-target": "#navigation"
    }).scrollspy({
      offset: varspyoffset
    });
  };

  var navTop = {
    position: null
  };
  var navBottom = {
    position: null
  };

  var fixedNav = function(nav, placement, navObject, marginObject) {

    if (placement === 'top') {
      if (navObject.position === null) {
        navObject.position = nav.position().top;
      }
      if ($(window).scrollTop() >= navObject.position) {
        nav.addClass('fixed-top');
        if (marginObject !== undefined && !marginObject.hasClass('margin-adjusted')) {
          marginObject.css('margin-bottom', nav.outerHeight()).addClass('margin-adjusted');
        }
      } else {
        nav.removeClass('fixed-top');
        if (marginObject !== undefined && marginObject.hasClass('margin-adjusted')) {
          marginObject.removeAttr('style').removeClass('margin-adjusted');
        }
      }
    } else {
      if (navObject.position === null) {
        navObject.position = nav.position().top + nav.outerHeight();
      }
      if ($(window).scrollTop() + $(window).height() >= navObject.position) {
        nav.addClass('fixed-bottom');
        if (marginObject !== undefined && !marginObject.hasClass('margin-adjusted')) {
          marginObject.css('margin-bottom', nav.outerHeight()).addClass('margin-adjusted');
        }
      } else {
        nav.removeClass('fixed-bottom');
        if (marginObject !== undefined && marginObject.hasClass('margin-adjusted')) {
          marginObject.removeAttr('style').removeClass('margin-adjusted');
        }
      }
    }
  };

  var resetFixedNav = function(nav, placement, navObject, marginObject) {
    nav.removeClass('fixed-' + placement);
    navObject.position = null;
    if (marginObject !== undefined) {
      marginObject.removeClass('margin-adjusted');
    }
    fixedNav(nav, placement, navObject, marginObject);
  };


  $(document).ready(function() {
    fixedNav($('.header-navigation'), 'top', navTop, $('header.banner'));
    fixedNav($('.cta-fixed'), 'bottom', navBottom, $('body'));
    spyoffset();
    $(window).load(function() {
      resetFixedNav($('.header-navigation'), 'top', navTop, $('header.banner'));
      resetFixedNav($('.cta-fixed'), 'bottom', navBottom, $('body'));
    });

    $(window).scroll(function() {
      fixedNav($('.header-navigation'), 'top', navTop, $('header.banner'));
      resetFixedNav($('.cta-fixed'), 'bottom', navBottom, $('body'));
    });

    $(".map-protection").on("click", function() {
      $(".map").removeClass("scrolling-off");
    });

    $(".map-protection").mouseleave(function() {
      $(".map").addClass("scrolling-off");
    });
  });

  var resizeTimer;

  $(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      resetFixedNav($('.header-navigation'), 'top', navTop, $('header.banner'));
      resetFixedNav($('.cta-fixed'), 'bottom', navBottom, $('body'));
    }, 300);
  });


  $(".main-nav a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function() {
        window.location.hash = hash;
      });
    }
  });
  $('[data-toggle="tooltip"]').tooltip();

})(jQuery);
