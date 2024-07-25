"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var generateBtn = document.getElementById("generate-btn");
  var generatedCode = document.getElementById("generated-code");
  var codeTableBody = document.querySelector("#code-table tbody");
  generateBtn.addEventListener("click", function () {
    var code = generateAccessCode();
    localStorage.setItem("code-".concat(code), JSON.stringify({
      code: code,
      email: ""
    }));
    addCodeToTable(code, "");
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

  function addCodeToTable(code, email) {
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
    codeTableBody.appendChild(row);
  } // Load existing codes from localStorage


  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);

    if (key.startsWith("code-")) {
      var _JSON$parse = JSON.parse(localStorage.getItem(key)),
          code = _JSON$parse.code,
          email = _JSON$parse.email;

      addCodeToTable(code, email);
    }
  }
});