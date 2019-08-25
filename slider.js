var slider = document.querySelector('.slider'),
    // ширина слайдера
    sliderWidth = slider.offsetWidth,
    thumb = slider.querySelector('.slider__thumb'),
    // ширина ручки слайдера
    thumbWidth = thumb.offsetWidth,
    // шакала со значениями шага
    sliderTicks = slider.querySelector('.slider__ticks'),
    // текстовое поле значения слайдера
    value = slider.querySelector('.slider__value'),
    // минимальное значение слайдера
    min = 5,
    // максимальное значение слайдера
    max = 150,
    step = 5,
    // половина ширины слайдера
    thumbHalfWidth = thumb.offsetWidth / 2,
    // точка захвата слайдера
    capturePoint;

for (var i = min, tickWidth = 0; i <= max; i += step) {
  var x = (i / sliderWidth),
      val = (i / sliderWidth) * (max - min) + min,
      val = Math.ceil(x),
      tick = createTick(x, i);
  sliderTicks.appendChild(tick);
  tickWidth += tick.offsetWidth
  console.log(tickWidth);
}

var ticks = slider.querySelectorAll('.slider__tick');
console.log(ticks);

//for (var i = 0, length = ticks.length, text = min; i < length; text += step) {
 // ticks[i].innerText = step;
//}
// for (var j = 0, length = ticks.length, text = min; j < ticks.length; j++, text += step) {
//   ticks[j].innerText = text;
// }

Array.prototype.forEach.call(slider.querySelectorAll('.slider__tick'), function (tick, i) {
  tick.addEventListener('click', function () {
    value.value = this.innerText;
  }, false);
});

var ticks = slider.querySelectorAll('.slider__tick');

// При изменении размера окна нужно заново пересчиать ширину слайдера, иначе ручка вылезет за пределы ползунка
window.addEventListener('resize', function () {
  sliderWidth = slider.offsetWidth;
}, false);

thumb.onmousedown = function (event) {
  // точка захвата ручки слайдера. От координаты точки клика отнимается координата левого края ручки относительно страницы
  capturePoint = event.pageX - getCoords(thumb).left;

  document.onmousemove = function (event) {
    moveAt(event);
  };

  document.onmouseup = function () {
    document.onmousemove = null;
    document.onmouseup = null;
  };
};

thumb.ondragstart = function () {
  return false;
};

function moveAt(event) {
  /**
   * Процентное значение свойства left ручки слайдера
   * @type {number}
   * event.pageX - точка клика по оси х относительно левого края окна
   * capturePoint - точка захвата ручки
   * getCoords(slider).left - левый край слайдера относительно левого края окна
   * sliderWidth - ширина слайдера
   * 100 - 100%
   * В итоге положение ручки слайдера, выраженное числм делится на ширину слайдера и умножается на 100, таким образом
   * получается процентное положение ручки слайдера относительно всей ширины слайдера и это число используется в качестве
   * процентного значения для свойства left ручки слайдера
   */
  var left = (event.pageX - capturePoint - getCoords(slider).left) / sliderWidth * 100;
  thumb.style.left = left + '%';
  // var val = ((left / sliderWidth) * (max - min) + min);
  // значение в поле значения слайдера, учитывая min и max значения
  var val = ((event.pageX - capturePoint - getCoords(slider).left) / sliderWidth) * (max - min) + min;
  // округление значения слайдера
  value.value = Math.ceil(val);

  if (parseInt(thumb.style.left) >= (100 - ((thumb.offsetWidth / sliderWidth) * 100))) {
    left = 101 - ((thumb.offsetWidth / sliderWidth) * 100);
    thumb.style.left = left + '%';
    value.value = max;
  }

  if (left < -1) {
    left = -1;
    thumb.style.left = left + '%';
    value.value = min;
  }
}

function getCoords(elem) {   // кроме IE8-
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

function createTick(xCoord, text) {
  var tick = document.createElement('span');
  tick.classList.add('slider__tick');
  // tick.style.left = xCoord + '%';
  tick.innerText = text;
  return tick;
}


