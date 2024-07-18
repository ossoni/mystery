document.addEventListener("DOMContentLoaded", () => {
    const clueList = document.getElementById("clue-list");
    const revealButton = document.getElementById("reveal-murderer");
    const murdererDetails = document.getElementById("murderer-details");

    const clues = [
        "깨진 유리병이 선장의 방에 있다.",
        "비밀 서랍에 중요한 문서와 녹색 액체 샘플이 있다.",
        "통신 장치에 부선장과의 마지막 대화가 기록되어 있다.",
        "연구실에서 독성 물질 샘플이 하나 사라졌다.",
        "실험 기록에 독성 물질의 치사량이 기록되어 있다.",
        "보안 카메라에 부선장이 녹색 액체 샘플을 들고 나가는 모습이 찍혀 있다.",
        "보안 카메라에 선장의 방 근처에서 수상한 움직임이 포착되었다.",
        "통신 기록에 선장이 긴급 회의를 소집한 이유가 담겨 있다.",
        "의무실의 의약품 목록에 녹색 액체와 유사한 물질이 포함되어 있다.",
        "의료 보고서에 선장이 독성 물질에 노출된 기록이 있다.",
        "엔진 유지보수 기록에 부선장이 수리에 관여한 흔적이 있다.",
        "엔진룸의 비밀 장치가 최근 사용된 흔적이 있다.",
        "식사 기록에 선장과 승무원들이 함께 식사한 시간이 기록되어 있다.",
        "빈 잔에 녹색 액체의 흔적이 있다.",
        "승무원 숙소에서 녹색 액체 샘플이 발견되었다.",
        "개인 일기에 선장에 대한 불만과 녹색 액체에 대한 언급이 있다.",
        "저장고에 녹색 액체가 누출된 흔적이 있다.",
        "저장고의 보안 기록에 누군가가 침입한 흔적이 있다."
    ];

    clues.forEach((clue, index) => {
        const clueListItem = document.createElement("li");
        const clueLink = document.createElement("a");
        clueLink.href = `clues/clue${index + 1}.html`;
        clueLink.textContent = `단서 ${index + 1}`;
        clueListItem.appendChild(clueLink);
        clueList.appendChild(clueListItem);
    });

    revealButton.addEventListener("click", () => {
        murdererDetails.innerHTML = `
            <h3>범인은 알렉스 존슨 (첩보원)입니다</h3>
            <p>알렉스 존슨은 긴급 회의 중 녹색 액체를 사용하여 선장을 살해했습니다.</p>
        `;
    });
});
