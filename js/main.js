jssor_slider1_init = function () {
  var _SlideshowTransitions = [
    {
      $Duration: 1000,
      y: 4,
      $Zoom: 11,
      $Rotate: 1,
      $SlideOut: true,
      $Easing: {
        $Top: $Jease$.$InQuint,
        $Zoom: $Jease$.$InQuart,
        $Opacity: $Jease$.$Linear,
        $Rotate: $Jease$.$InQuint,
      },
      $Opacity: 2,
      $Round: { $Rotate: 0.8 },
    },
    {
      $Duration: 1000,
      x: -0.2,
      $Delay: 20,
      $Cols: 16,
      $SlideOut: true,
      $Formation: $JssorSlideshowFormations$.$FormationStraight,
      $Assembly: 260,
      $Easing: { $Left: $Jease$.$InOutExpo, $Opacity: $Jease$.$InOutQuad },
      $Opacity: 2,
      $Outside: true,
      $Round: { $Top: 0.5 },
    },
    {
      $Duration: 400,
      $Delay: 40,
      $Rows: 10,
      $Formation: $JssorSlideshowFormations$.$FormationStraight,
      $Opacity: 2,
      $Assembly: 260,
    },
  ];

  var options = {
    $SlideDuration: 800, //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
    $DragOrientation: 3, //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $Cols is greater than 1, or parking position is not 0)
    $AutoPlay: 1, //[Optional] Auto play or not, to enable slideshow, this option must be set to greater than 0. Default value is 0. 0: no auto play, 1: continuously, 2: stop at last slide, 4: stop on click, 8: stop on user navigation (by arrow/bullet/thumbnail/drag/arrow key navigation)
    $Idle: 1500, //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
    $SlideshowOptions: {
      $Class: $JssorSlideshowRunner$,
      $Transitions: _SlideshowTransitions,
      $TransitionsOrder: 1,
      $ShowLink: true,
    },
  };

  var jssor_slider1 = new $JssorSlider$("jssor_1", options);
  //make sure to clear margin of the slider container element
  jssor_slider1.$Elmt.style.margin = "";

  //#region responsive code begin
  //the following code is to place slider in the center of parent container with no scale
  function ScaleSlider() {
    var containerElement = jssor_slider1.$Elmt.parentNode;
    var containerWidth = containerElement.clientWidth;

    if (containerWidth) {
      var expectedWidth = Math.min(
        containerWidth,
        jssor_slider1.$OriginalWidth()
      );

      //scale the slider to original height with no change
      jssor_slider1.$ScaleSize(expectedWidth, jssor_slider1.$OriginalHeight());

      jssor_slider1.$Elmt.style.left =
        (containerWidth - expectedWidth) / 2 + "px";
    } else {
      window.setTimeout(ScaleSlider, 30);
    }
  }

  ScaleSlider();

  $Jssor$.$AddEvent(window, "load", ScaleSlider);
  $Jssor$.$AddEvent(window, "resize", ScaleSlider);
  $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
  //#endregion responsive code end
};

$(document).ready(function () {
  $(".carousel").on("touchstart", function (event) {
    var xClick = event.originalEvent.touches[0].pageX;
    $(this).one("touchmove", function (event) {
      var xMove = event.originalEvent.touches[0].pageX;
      if (Math.floor(xClick - xMove) > 5) {
        $(this).carousel("next");
      } else if (Math.floor(xClick - xMove) < -5) {
        $(this).carousel("prev");
      }
    });
    $(".carousel").on("touchend", function () {
      $(this).off("touchmove");
    });
  });
});
