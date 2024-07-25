document.addEventListener("DOMContentLoaded", function() {
    const generateBtn = document.getElementById("generate-btn");
    const generatedCode = document.getElementById("generated-code");
    const codeTableBody = document.querySelector("#code-table tbody");

    generateBtn.addEventListener("click", function() {
        const code = generateAccessCode();
        const codeData = { code: code, email: "", users: 0 };

        fetch('/create-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(codeData)
        })
        .then(response => response.text())  // 응답을 JSON 대신 텍스트로 먼저 파싱
        .then(text => {
            console.log('Response Text:', text);  // 응답 텍스트를 콘솔에 출력
            const data = JSON.parse(text);  // 텍스트를 JSON으로 파싱
            addCodeToTable(data.code, data.email, data.users);
            generatedCode.textContent = `생성된 코드: ${data.code}`;
            generatedCode.style.display = "block";
        })
        .catch(error => console.error('Error:', error));
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
            fetch(`/update-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code: code, email: emailInput.value, users: users })
            });
        });
        emailCell.appendChild(emailInput);
        row.appendChild(emailCell);

        const usersCell = document.createElement("td");
        usersCell.textContent = users || 0;
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
            fetch(`/delete-code/${code}`, {
                method: 'DELETE'
            })
            .then(() => {
                row.remove();
            })
            .catch(error => console.error('Error:', error));
        });
        deleteCell.appendChild(deleteBtn);
        row.appendChild(deleteCell);

        codeTableBody.appendChild(row);
    }

    // Load existing codes from server
    fetch('/access-codes')
        .then(response => response.json())
        .then(data => {
            data.forEach(codeData => addCodeToTable(codeData.code, codeData.email, codeData.users));
        })
        .catch(error => console.error('Error:', error));
});
