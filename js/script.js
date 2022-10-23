"use strict"

$(document).ready(function() {
  $(".header__burger").click(function(event) {
    $(".header__burger, .header__menu").toggleClass("active");
    $("body").toggleClass("lock");
  });

  $(".main").addClass("active");
});

document.addEventListener("DOMContentLoaded", function() {
  const feedback_form = document.getElementById("feedback");
  feedback_form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(feedback_form);

    let feedbackFormData = new FormData(feedback_form);

    if (error === 0) {
      let response = await fetch("sendmail.php", {
        method: "POST",
        body: feedbackFormData
      });
      if (response.ok) {
        let result  = await response.json();
        alert(result.message);
        formPreview.innerHTML = "";
        feedback_form.reset();
      } else {

      }

    } else {
      alert("Необходимо заполнить поля")
    }
  }

  function formValidate(feedback_form) {
    let error = 0;
    let feedbackReq = document.querySelectorAll("._req");

    for (let index = 0; index < feedbackReq.length; index++) {
      const input = feedbackReq[input];
      formRemoveError(input);

      if (input.value === "") {
        formAddError(input);
        error++; 
      }
    }
    return error;
  }  

  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }

});


// слайдер отзывов
const reviews = document.querySelectorAll(".review"); // массив со всеми отзывами
const sliderLine = document.querySelector(".slider-line"); // лента с отзывами 
let count = 0;

const buttonNext = document.querySelector("#buttonNext");
const buttonPrev = document.querySelector("#buttonPrev");



buttonNext.addEventListener("click", slideNextReview);
buttonPrev.addEventListener("click", slidePrevReview);

sliderLine.addEventListener("touchstart", touchStart, false);
sliderLine.addEventListener("touchmove", touchMove, false);


function slideNextReview() {
  let width = reviews[0].offsetWidth;
  count++;
  if (count >= reviews.length) count = 0;
  sliderLine.style.transform = "translate(-" + count * width + "px)";
}
function slidePrevReview() {
  let width = reviews[0].offsetWidth;
  count--;
  if (count < 0) count = reviews.length - 1;
  sliderLine.style.transform = "translate(-" + count * width + "px)";
}

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
      slidePrevReview();    // - предыдущий слайд
    }  
    else {
      console.log("left");   // свайп влево -
      slideNextReview();     // - следующий слайд
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





