"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var accessCodeInput = document.getElementById("access-code");
  var errorMessage = document.getElementById("error-message");
  var contentSection = document.getElementById("content");
  accessForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var enteredCode = accessCodeInput.value;
    var correctAccessCode = Object.keys(localStorage).filter(function (key) {
      return key.startsWith("code-");
    }).map(function (key) {
      return JSON.parse(localStorage.getItem(key)).code;
    });

    if (correctAccessCode.includes(enteredCode)) {
      accessForm.style.display = "none";
      contentSection.style.display = "block";
    } else {
      errorMessage.style.display = "block";
    }
  });
});