"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var generateBtn = document.getElementById("generate-btn");
  var generatedCode = document.getElementById("generated-code");
  var codeTableBody = document.querySelector("#code-table tbody");
  generateBtn.addEventListener("click", function () {
    var code = generateAccessCode();
    var codeData = {
      code: code,
      email: "",
      users: 0
    };
    fetch('https://ossoni.github.io/mystery/create-code', {
      // 서버의 올바른 주소로 수정
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(codeData)
    }).then(function (response) {
      return response.text();
    }) // 응답을 JSON 대신 텍스트로 먼저 파싱
    .then(function (text) {
      console.log('Response Text:', text); // 응답 텍스트를 콘솔에 출력

      var data = JSON.parse(text); // 텍스트를 JSON으로 파싱

      addCodeToTable(data.code, data.email, data.users);
      generatedCode.textContent = "\uC0DD\uC131\uB41C \uCF54\uB4DC: ".concat(data.code);
      generatedCode.style.display = "block";
    })["catch"](function (error) {
      return console.error('Error:', error);
    });
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
      fetch("https://ossoni.github.io/mystery/update-code", {
        // 서버의 올바른 주소로 수정
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: code,
          email: emailInput.value,
          users: users
        })
      });
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
      fetch("https://ossoni.github.io/mystery/delete-code/".concat(code), {
        // 서버의 올바른 주소로 수정
        method: 'DELETE'
      }).then(function () {
        row.remove();
      })["catch"](function (error) {
        return console.error('Error:', error);
      });
    });
    deleteCell.appendChild(deleteBtn);
    row.appendChild(deleteCell);
    codeTableBody.appendChild(row);
  } // Load existing codes from server


  fetch('https://ossoni.github.io/mystery/access-codes') // 서버의 올바른 주소로 수정
  .then(function (response) {
    return response.json();
  }).then(function (data) {
    data.forEach(function (codeData) {
      return addCodeToTable(codeData.code, codeData.email, codeData.users);
    });
  })["catch"](function (error) {
    return console.error('Error:', error);
  });
});