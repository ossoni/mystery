"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var cards = document.querySelectorAll(".card");
  var resetBtn = document.getElementById("reset-btn"); // Load the clicked state from localStorage

  cards.forEach(function (card) {
    var cardId = card.getAttribute("data-card-id");

    if (localStorage.getItem(cardId) === "clicked") {
      disableCard(card);
    }
  }); // Add click event listener to each card

  cards.forEach(function (card) {
    card.addEventListener("click", function (event) {
      var cardId = card.getAttribute("data-card-id");

      if (!card.classList.contains("disabled")) {
        localStorage.setItem(cardId, "clicked");
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