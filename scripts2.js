document.addEventListener("DOMContentLoaded", () => {
    const revealButton = document.getElementById("reveal-murderer");
    const murdererDetails = document.getElementById("murderer-details");

    revealButton.addEventListener("click", () => {
        const userConfirmed = confirm("범인 지목이 끝났나요?");
        if (userConfirmed) {
            murdererDetails.innerHTML = `
                <h3>범인은 알렉스 존슨 (연구 조수)입니다</h3>
                <p>알렉스 존슨은 녹색 액체를 사용하여 선장을 살해했습니다. 그의 동기는 연구 결과를 왜곡하고 자신의 명성을 얻기 위해서였습니다.</p>
                <p><strong>범인의 동기:</strong> 알렉스는 어린 시절부터 과학에 열정을 가지고 있었습니다. 그는 항상 인정받기를 원했지만, 대학 시절부터 그의 연구가 여러 차례 실패하면서 좌절을 겪었습니다. 탐사선에 합류한 후에도 그의 연구는 크게 주목받지 못했고, 선장 제임스 콜은 알렉스의 연구에 회의적이었습니다. 알렉스는 선장의 신뢰를 얻고 자신의 연구를 성공시키기 위해 극단적인 선택을 하게 되었습니다. 그는 선장을 제거함으로써 자신의 연구가 주목받을 것이라 믿었고, 자신이 선장의 자리를 대신할 수 있을 것이라 생각했습니다.</p>
                <p><strong>엔딩 스토리:</strong> 알렉스 존슨은 결국 범인으로 밝혀졌고, 그의 음모는 모두에게 폭로되었습니다. 탐사선의 승무원들은 그의 배신에 큰 충격을 받았고, 알렉스는 지구로 송환되어 법의 심판을 받게 되었습니다. 탐사선은 새로운 선장을 임명하고, 에리단 IV를 향한 탐사를 계속하게 되었습니다. 승무원들은 알렉스의 음모를 밝혀낸 것에 자부심을 느끼며, 다시 한 번 서로를 신뢰하고 협력하여 임무를 완수하기로 결심했습니다.</p>
            `;
        }
    });
});
