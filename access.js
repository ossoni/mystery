document.addEventListener("DOMContentLoaded", function() {
    const generateBtn = document.getElementById("generate-btn");
    const generatedCode = document.getElementById("generated-code");
    const codeTableBody = document.querySelector("#code-table tbody");

    generateBtn.addEventListener("click", function() {
        const code = generateAccessCode();
        localStorage.setItem(`code-${code}`, JSON.stringify({ code: code, email: "", users: 0 }));
        addCodeToTable(code, "", 0);
        generatedCode.textContent = `생성된 코드: ${code}`;
        generatedCode.style.display = "block";
    });

    function generateAccessCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    function addCodeToTable(code, email, users) {
        const row = document.createElement("tr");

        const codeCell = document.createElement("td");
        codeCell.textContent = code;
        row.appendChild(codeCell);

        const emailCell = document.createElement("td");
        const emailInput = document.createElement("input");
        emailInput.type = "email";
        emailInput.value = email;
        emailInput.addEventListener("change", function() {
            const storedData = JSON.parse(localStorage.getItem(`code-${code}`));
            storedData.email = emailInput.value;
            localStorage.setItem(`code-${code}`, JSON.stringify(storedData));
        });
        emailCell.appendChild(emailInput);
        row.appendChild(emailCell);

        const usersCell = document.createElement("td");
        usersCell.textContent = users;
        row.appendChild(usersCell);

        const editCell = document.createElement("td");
        const editBtn = document.createElement("button");
        editBtn.textContent = "수정";
        editBtn.addEventListener("click", function() {
            emailInput.focus();
        });
        editCell.appendChild(editBtn);
        row.appendChild(editCell);

        const deleteCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function() {
            localStorage.removeItem(`code-${code}`);
            row.remove();
        });
        deleteCell.appendChild(deleteBtn);
        row.appendChild(deleteCell);

        codeTableBody.appendChild(row);
    }

    // Load existing codes from localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("code-")) {
            const { code, email, users } = JSON.parse(localStorage.getItem(key));
            addCodeToTable(code, email, users);
        }
    }
});
