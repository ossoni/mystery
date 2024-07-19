document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".card");
    const resetBtn = document.getElementById("reset-btn");

    // Load the clicked state from localStorage
    cards.forEach(card => {
        const cardId = card.getAttribute("data-card-id");
        if (localStorage.getItem(cardId) === "clicked") {
            disableCard(card);
        }
    });

    // Add click event listener to each card
    cards.forEach(card => {
        card.addEventListener("click", function(event) {
            const cardId = card.getAttribute("data-card-id");
            if (!card.classList.contains("disabled")) {
                localStorage.setItem(cardId, "clicked");
                setTimeout(() => disableCard(card), 100); // Add a slight delay to allow the link to open
            }
        });
    });

    // Reset button click event
    resetBtn.addEventListener("click", function() {
        cards.forEach(card => {
            const cardId = card.getAttribute("data-card-id");
            localStorage.removeItem(cardId);
            enableCard(card);
        });
    });

    function disableCard(card) {
        card.classList.add("disabled");
        card.querySelector("a").removeAttribute("href");
        card.innerHTML = `<span style="color: red; font-size: 2em;">X</span>`;
    }

    function enableCard(card) {
        card.classList.remove("disabled");
        const href = card.getAttribute("data-card-id") + ".html";
        card.innerHTML = `<a href="clues/${href}" target="_blank">${card.textContent.trim()}</a>`;
    }
});
