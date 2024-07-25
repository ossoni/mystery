"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var generateBtn = document.getElementById("generate-btn");
  var generatedCode = document.getElementById("generated-code");
  var codeTableBody = document.querySelector("#code-table tbody");
  var resetMessage = document.getElementById("reset-message");
  generateBtn.addEventListener("click", function () {
    var code = generateAccessCode();
    localStorage.setItem("code-".concat(code), JSON.stringify({
      code: code,
      email: "",
      users: 0
    }));
    addCodeToTable(code, "", 0);
    generatedCode.textContent = "\uC0DD\uC131\uB41C \uCF54\uB4DC: ".concat(code);
    generatedCode.style.display = "block";
  });

  function generateAccessCode() {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var code = '';

    for (var i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return code;
  }

  function addCodeToTable(code, email, users) {
    var row = document.createElement("tr");
    var codeCell = document.createElement("td");
    codeCell.textContent = code;
    row.appendChild(codeCell);
    var emailCell = document.createElement("td");
    var emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.value = email;
    emailInput.addEventListener("change", function () {
      var storedData = JSON.parse(localStorage.getItem("code-".concat(code)));
      storedData.email = emailInput.value;
      localStorage.setItem("code-".concat(code), JSON.stringify(storedData));
    });
    emailCell.appendChild(emailInput);
    row.appendChild(emailCell);
    var usersCell = document.createElement("td");
    usersCell.textContent = users || 0;
    row.appendChild(usersCell);
    var editCell = document.createElement("td");
    var editBtn = document.createElement("button");
    editBtn.textContent = "수정";
    editBtn.addEventListener("click", function () {
      emailInput.focus();
    });
    editCell.appendChild(editBtn);
    row.appendChild(editCell);
    var deleteCell = document.createElement("td");
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      localStorage.removeItem("code-".concat(code));
      row.remove();
    });
    deleteCell.appendChild(deleteBtn);
    row.appendChild(deleteCell);
    var resetCell = document.createElement("td");
    var resetBtn = document.createElement("button");
    resetBtn.textContent = "초기화";
    resetBtn.addEventListener("click", function () {
      var storedData = JSON.parse(localStorage.getItem("code-".concat(code)));
      storedData.users = 0;
      localStorage.setItem("code-".concat(code), JSON.stringify(storedData));
      usersCell.textContent = storedData.users;
      resetMessage.style.display = "block";
      codeTableBody.style.display = "none"; // Hide code table

      localStorage.removeItem("enteredCode"); // 상태 초기화
    });
    resetCell.appendChild(resetBtn);
    row.appendChild(resetCell);
    codeTableBody.appendChild(row);
  } // Load existing codes from localStorage


  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);

    if (key.startsWith("code-")) {
      var _JSON$parse = JSON.parse(localStorage.getItem(key)),
          code = _JSON$parse.code,
          email = _JSON$parse.email,
          users = _JSON$parse.users;

      addCodeToTable(code, email, users);
    }
  }
});