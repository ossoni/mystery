"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var cards = document.querySelectorAll(".card");
  var resetBtn = document.getElementById("reset-btn");
  var accessForm = document.getElementById("access-form");
  var accessCodeInput = document.getElementById("access-code");
  var errorMessage = document.getElementById("error-message");
  var contentSection = document.getElementById("content"); // 페이지 로드 시 기존 상태 확인

  var savedCode = localStorage.getItem("enteredCode");

  if (savedCode) {
    var correctAccessCode = Object.keys(localStorage).filter(function (key) {
      return key.startsWith("code-");
    }).map(function (key) {
      return JSON.parse(localStorage.getItem(key)).code;
    });

    if (correctAccessCode.includes(savedCode)) {
      accessForm.style.display = "none";
      contentSection.style.display = "block";
    }
  }

  accessForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var enteredCode = accessCodeInput.value;
    var codeKey = "code-".concat(enteredCode);
    var correctAccessCode = Object.keys(localStorage).filter(function (key) {
      return key.startsWith("code-");
    }).map(function (key) {
      return JSON.parse(localStorage.getItem(key)).code;
    });

    if (correctAccessCode.includes(enteredCode)) {
      var storedData = JSON.parse(localStorage.getItem(codeKey));

      if (storedData.users < 7) {
        storedData.users += 1;
        localStorage.setItem(codeKey, JSON.stringify(storedData));
        accessForm.style.display = "none";
        contentSection.style.display = "block";
        localStorage.setItem("enteredCode", enteredCode); // 상태 저장
      } else {
        errorMessage.textContent = "접속 인원이 초과되었습니다.";
        errorMessage.style.display = "block";
      }
    } else {
      errorMessage.textContent = "잘못된 접근 코드입니다.";
      errorMessage.style.display = "block";
    }
  }); // Load the clicked state from localStorage

  cards.forEach(function (card) {
    var cardId = card.getAttribute("data-card-id");

    if (localStorage.getItem(cardId) === "clicked") {
      disableCard(card);
    }
  }); // Add click event listener to each card

  cards.forEach(function (card) {
    card.addEventListener("click", function (event) {
      if (!card.classList.contains("disabled")) {
        var cardId = card.getAttribute("data-card-id");
        localStorage.setItem(cardId, "clicked");
        window.open(card.querySelector("a").href, "_blank");
        setTimeout(function () {
          return disableCard(card);
        }, 100); // Add a slight delay to allow the link to open
      }
    });
  }); // Reset button click event

  resetBtn.addEventListener("click", function () {
    cards.forEach(function (card) {
      var cardId = card.getAttribute("data-card-id");
      localStorage.removeItem(cardId);
      enableCard(card);
    });
    localStorage.removeItem("enteredCode"); // 상태 초기화

    location.reload(); // 페이지 새로고침
  });

  function disableCard(card) {
    card.classList.add("disabled");
    card.querySelector("a").removeAttribute("href");
    card.innerHTML = "<span style=\"color: red; font-size: 2em;\">X</span>";
  }

  function enableCard(card) {
    card.classList.remove("disabled");
    var href = card.getAttribute("data-card-id") + ".html";
    card.innerHTML = "<a href=\"clues/".concat(href, "\" target=\"_blank\">").concat(card.textContent.trim(), "</a>");
  }
});