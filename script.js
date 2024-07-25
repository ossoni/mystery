document.addEventListener("DOMContentLoaded", function() {
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
});
