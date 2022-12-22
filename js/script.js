"use strict"

//burger
$(document).ready(function() {
  $(".header__burger").click(function(event) {
    $(".header__burger, .header__menu").toggleClass("active");
    $("body").toggleClass("lock");
  });

  $(".main").addClass("active");
});

$(document).ready(function() {
  $(".header__link").click(function(event) {
    $(".header__burger, .header__menu").removeClass("active");
    $("body").removeClass("lock");
  });

  $(".main").removeClass("active");
});





// чтобы при отправке форм не перезагружалась страница:
// нету пока






const body = document.querySelector("body");

//всплывающие окна
const openWindowUp = document.querySelectorAll(".open_window-up");
const closeWindowUp = document.querySelectorAll(".window-up__close");
const windowUp = document.querySelectorAll(".window-up");

for(let i=0; i<openWindowUp.length; i++) {
  openWindowUp[i].addEventListener("click", function(e){
    e.preventDefault();
    windowUp[i].classList.add("activeUp"); 
    body.classList.add("lock");
  });
}
for(let i=0; i<openWindowUp.length; i++) {
  closeWindowUp[i].addEventListener("click", function(e){
    windowUp[i].classList.remove("activeUp"); 
    body.classList.remove("lock");
  });
}




// SLIDER 

const prevAll = document.querySelectorAll(".slider-prev");
const nextAll = document.querySelectorAll(".slider-next");
const sliderAll = document.querySelectorAll(".slider");
const sliderLineAll = document.querySelectorAll(".slider-line");

const images1 = document.querySelectorAll(".slider-image_1");
const images2 = document.querySelectorAll(".slider-image_2");
const images3 = document.querySelectorAll(".slider-image_3");
const images4 = document.querySelectorAll(".slider-image_4");
const images5 = document.querySelectorAll(".slider-image_5");
const images6 = document.querySelectorAll(".slider-image_6");
const reviews = document.querySelectorAll(".review");

const slidesAll = [images1, images2, images3, images4, images5, images6, reviews];


function basicSlider(slider, sliderLine, slides, prev, next) {

  let count = 0; // номер картинки
  let width;

  function init() {
    width = slider.offsetWidth;
    sliderLine.style.width = width * slides.length + "px";
    slides.forEach(item => {
      item.style.width = width + "px";
      item.style.height = "auto";
    });
    slide();
  }

  window.addEventListener("resize", init);
  init();
  next.addEventListener("click", goNextSlide);
  prev.addEventListener("click", goPrevSlide);

  function goNextSlide() {
    // console.log(width);
    if (count >= slides.length-1) count=0;
    else count++;
    slide();
  }

  function goPrevSlide() {
    if (count <= 0) count=slides.length-1;
    else count--;
    slide();
  }

  function slide() {sliderLine.style.left = -(width)*count + "px";}



  // slide TOUCH (смена слайдов касанием)

  sliderLine.addEventListener("touchstart", touchStart, false);
  sliderLine.addEventListener("touchmove", touchMove, false);

  let x1 = null;
  let y1 = null;
  let x2 = null;
  let y2 = null;

  function touchStart(event) {
    const firstTouch = event.touches[0];
    //console.log(firstTouch);

    x1 = firstTouch.clientX;
    y1 = firstTouch.clientY;
    //console.log(x1, y1);
  } 
  function touchMove(event) {
    if (!x1 || !y1) return false; // если изменения координат не произошло, то false

    x2 = event.touches[0].clientX;
    y2 = event.touches[0].clientY;
    //console.log(x2, y2);

    let xDiff = x2 - x1;  //    Разница между начальными и последующими координатами,
    let yDiff = y2 - y1;  // чтобы понимать в каком направлении двигается тач

    if (Math.abs(xDiff) > Math.abs(yDiff)) { // узнаём, какая координата изменяется больше
      // right-left
      if (xDiff > 0){
        console.log("right"); // свайп вправо -
        goPrevSlide();    // - предыдущий слайд
      }  
      else {
        console.log("left");   // свайп влево -
        goNextSlide();     // - следующий слайд
      }             
    }               
    else {           
      // top-bottom
      if (yDiff > 0) console.log("down");
      else console.log("top");
    }
    x1 = null;
    y1 = null;
  }
}

basicSlider(sliderAll[0], sliderLineAll[0], images1, prevAll[0], nextAll[0]);
basicSlider(sliderAll[1], sliderLineAll[1], images2, prevAll[1], nextAll[1]);
basicSlider(sliderAll[2], sliderLineAll[2], images3, prevAll[2], nextAll[2]);
basicSlider(sliderAll[3], sliderLineAll[3], images4, prevAll[3], nextAll[3]);
basicSlider(sliderAll[4], sliderLineAll[4], images5, prevAll[4], nextAll[4]);
basicSlider(sliderAll[5], sliderLineAll[5], reviews, prevAll[5], nextAll[5]);
