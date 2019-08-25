(function ($) {
  $.fn.airSlider = function (options) {
    const settings = $.extend({
      min: 0,
      max: 100,
    }, options || {});

    const yOffset = pageYOffset;
    const xOffset = pageXOffset;

    const getCoords = function (elem) {
      const box = elem.getBoundingClientRect();
      return {
        top: box.top + yOffset,
        left: box.left + xOffset,
      };
    };

    const initSliders = function () {
      const $this = $(this);
      const that = this;
      const $doc = $(document);
      const track = $('<div class="slider__track"></div>');
      const thumb = $('<div class="slider__thumb"></div>');
      const ticks = $('<div class="slider__ticks"></div>');
      const input = $('<input class="slider__value" type="text" name="slider" value="">');

      $this.append(track);
      track.append(thumb);
      $this.append(input);

      const sliderWidth = $this.width();
      const thumbWidth = thumb.width();
      let capturePoint = '';

      const moveAt = function (event) {
        const left = (event.pageX - capturePoint - getCoords(that).left) / sliderWidth * 100;
        const value = ((event.pageX - capturePoint - getCoords(that).left) / sliderWidth) * (settings.max - settings.min) + settings.min;
        thumb.css('left', `${left}%`);
        input.val(Math.ceil(value));
      };

      const unbindHandler = function () {
        $doc.off('mousemove.moveAt');
        $doc.off('mourseup');
      }

      const pressThumb = function (event) {
        capturePoint = event.pageX - getCoords(event.target).left;

        $doc.on('mousemove.moveAt', moveAt);
        $doc.on('mouseup', unbindHandler);
      };

      const preventDrag = function (event) {
        event.preventDefault();
      };

      thumb.on('mousedown.pressThumb', pressThumb);

      thumb.on('dragstart', preventDrag);
    };

    return this.each(initSliders);
  };
}(jQuery));

$('.slider').airSlider({ min: 50, max: 500 });
$('.slider-red').airSlider({min: 50, max: 100});
