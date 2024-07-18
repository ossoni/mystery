"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var clueList = document.getElementById("clue-list");
  var revealButton = document.getElementById("reveal-murderer");
  var murdererDetails = document.getElementById("murderer-details");
  var clues = ["깨진 유리병이 선장의 방에 있다.", "비밀 서랍에 중요한 문서와 녹색 액체 샘플이 있다.", "통신 장치에 부선장과의 마지막 대화가 기록되어 있다.", "연구실에서 독성 물질 샘플이 하나 사라졌다.", "실험 기록에 독성 물질의 치사량이 기록되어 있다.", "보안 카메라에 부선장이 녹색 액체 샘플을 들고 나가는 모습이 찍혀 있다.", "보안 카메라에 선장의 방 근처에서 수상한 움직임이 포착되었다.", "통신 기록에 선장이 긴급 회의를 소집한 이유가 담겨 있다.", "의무실의 의약품 목록에 녹색 액체와 유사한 물질이 포함되어 있다.", "의료 보고서에 선장이 독성 물질에 노출된 기록이 있다.", "엔진 유지보수 기록에 부선장이 수리에 관여한 흔적이 있다.", "엔진룸의 비밀 장치가 최근 사용된 흔적이 있다.", "식사 기록에 선장과 승무원들이 함께 식사한 시간이 기록되어 있다.", "빈 잔에 녹색 액체의 흔적이 있다.", "승무원 숙소에서 녹색 액체 샘플이 발견되었다.", "개인 일기에 선장에 대한 불만과 녹색 액체에 대한 언급이 있다.", "저장고에 녹색 액체가 누출된 흔적이 있다.", "저장고의 보안 기록에 누군가가 침입한 흔적이 있다."];
  clues.forEach(function (clue, index) {
    var clueListItem = document.createElement("li");
    var clueLink = document.createElement("a");
    clueLink.href = "clues/clue".concat(index + 1, ".html");
    clueLink.textContent = "\uB2E8\uC11C ".concat(index + 1);
    clueListItem.appendChild(clueLink);
    clueList.appendChild(clueListItem);
  });
  revealButton.addEventListener("click", function () {
    murdererDetails.innerHTML = "\n            <h3>\uBC94\uC778\uC740 \uC54C\uB809\uC2A4 \uC874\uC2A8 (\uCCA9\uBCF4\uC6D0)\uC785\uB2C8\uB2E4</h3>\n            <p>\uC54C\uB809\uC2A4 \uC874\uC2A8\uC740 \uAE34\uAE09 \uD68C\uC758 \uC911 \uB179\uC0C9 \uC561\uCCB4\uB97C \uC0AC\uC6A9\uD558\uC5EC \uC120\uC7A5\uC744 \uC0B4\uD574\uD588\uC2B5\uB2C8\uB2E4.</p>\n        ";
  });
});