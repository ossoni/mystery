document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".card");
    const resetBtn = document.getElementById("reset-btn");
    const accessForm = document.getElementById("access-form");
    const accessCodeInput = document.getElementById("access-code");
    const errorMessage = document.getElementById("error-message");
    const contentSection = document.getElementById("content");

    // 페이지 로드 시 기존 상태 확인
    const savedCode = localStorage.getItem("enteredCode");
    if (savedCode) {
        const correctAccessCode = Object.keys(localStorage).filter(key => key.startsWith("code-")).map(key => JSON.parse(localStorage.getItem(key)).code);
        if (correctAccessCode.includes(savedCode)) {
            accessForm.style.display = "none";
            contentSection.style.display = "block";
        }
    }

    accessForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const enteredCode = accessCodeInput.value;
        const codeKey = `code-${enteredCode}`;
        const correctAccessCode = Object.keys(localStorage).filter(key => key.startsWith("code-")).map(key => JSON.parse(localStorage.getItem(key)).code);

        if (correctAccessCode.includes(enteredCode)) {
            const storedData = JSON.parse(localStorage.getItem(codeKey));
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
        localStorage.removeItem("enteredCode"); // 상태 초기화
        location.reload(); // 페이지 새로고침
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
