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