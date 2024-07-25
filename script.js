document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".card");
    const resetBtn = document.getElementById("reset-btn");
    const accessForm = document.getElementById("access-form");
    const accessCodeInput = document.getElementById("access-code");
    const errorMessage = document.getElementById("error-message");
    const contentSection = document.getElementById("content");

    accessForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const enteredCode = accessCodeInput.value;
        const correctAccessCode = Object.keys(localStorage).filter(key => key.startsWith("code-")).map(key => JSON.parse(localStorage.getItem(key)).code);

        if (correctAccessCode.includes(enteredCode)) {
            accessForm.style.display = "none";
            contentSection.style.display = "block";
        } else {
            errorMessage.style.display = "block";
        }
    });

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
            if (!card.classList.contains("disabled")) {
                const cardId = card.getAttribute("data-card-id");
                localStorage.setItem(cardId, "clicked");
                window.open(card.querySelector("a").href, "_blank");
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
