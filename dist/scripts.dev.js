"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var revealButton = document.getElementById("reveal-murderer");
  var murdererDetails = document.getElementById("murderer-details");
  revealButton.addEventListener("click", function () {
    var userConfirmed = confirm("범인 지목이 끝났나요?");

    if (userConfirmed) {
      murdererDetails.innerHTML = "\n                <h3>\uBC94\uC778\uC740 \uC54C\uB809\uC2A4 \uC874\uC2A8 (\uC5F0\uAD6C \uC870\uC218)\uC785\uB2C8\uB2E4</h3>\n                <p>\uC54C\uB809\uC2A4 \uC874\uC2A8\uC740 \uB179\uC0C9 \uC561\uCCB4\uB97C \uC0AC\uC6A9\uD558\uC5EC \uC120\uC7A5\uC744 \uC0B4\uD574\uD588\uC2B5\uB2C8\uB2E4. \uADF8\uC758 \uB3D9\uAE30\uB294 \uC5F0\uAD6C \uACB0\uACFC\uB97C \uC65C\uACE1\uD558\uACE0 \uC790\uC2E0\uC758 \uBA85\uC131\uC744 \uC5BB\uAE30 \uC704\uD574\uC11C\uC600\uC2B5\uB2C8\uB2E4.</p>\n                <p><strong>\uBC94\uC778\uC758 \uB3D9\uAE30:</strong> \uC54C\uB809\uC2A4\uB294 \uC5B4\uB9B0 \uC2DC\uC808\uBD80\uD130 \uACFC\uD559\uC5D0 \uC5F4\uC815\uC744 \uAC00\uC9C0\uACE0 \uC788\uC5C8\uC2B5\uB2C8\uB2E4. \uADF8\uB294 \uD56D\uC0C1 \uC778\uC815\uBC1B\uAE30\uB97C \uC6D0\uD588\uC9C0\uB9CC, \uB300\uD559 \uC2DC\uC808\uBD80\uD130 \uADF8\uC758 \uC5F0\uAD6C\uAC00 \uC5EC\uB7EC \uCC28\uB840 \uC2E4\uD328\uD558\uBA74\uC11C \uC88C\uC808\uC744 \uACAA\uC5C8\uC2B5\uB2C8\uB2E4. \uD0D0\uC0AC\uC120\uC5D0 \uD569\uB958\uD55C \uD6C4\uC5D0\uB3C4 \uADF8\uC758 \uC5F0\uAD6C\uB294 \uD06C\uAC8C \uC8FC\uBAA9\uBC1B\uC9C0 \uBABB\uD588\uACE0, \uC120\uC7A5 \uC81C\uC784\uC2A4 \uCF5C\uC740 \uC54C\uB809\uC2A4\uC758 \uC5F0\uAD6C\uC5D0 \uD68C\uC758\uC801\uC774\uC5C8\uC2B5\uB2C8\uB2E4. \uC54C\uB809\uC2A4\uB294 \uC120\uC7A5\uC758 \uC2E0\uB8B0\uB97C \uC5BB\uACE0 \uC790\uC2E0\uC758 \uC5F0\uAD6C\uB97C \uC131\uACF5\uC2DC\uD0A4\uAE30 \uC704\uD574 \uADF9\uB2E8\uC801\uC778 \uC120\uD0DD\uC744 \uD558\uAC8C \uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uADF8\uB294 \uC120\uC7A5\uC744 \uC81C\uAC70\uD568\uC73C\uB85C\uC368 \uC790\uC2E0\uC758 \uC5F0\uAD6C\uAC00 \uC8FC\uBAA9\uBC1B\uC744 \uAC83\uC774\uB77C \uBBFF\uC5C8\uACE0, \uC790\uC2E0\uC774 \uC120\uC7A5\uC758 \uC790\uB9AC\uB97C \uB300\uC2E0\uD560 \uC218 \uC788\uC744 \uAC83\uC774\uB77C \uC0DD\uAC01\uD588\uC2B5\uB2C8\uB2E4.</p>\n                <p><strong>\uC5D4\uB529 \uC2A4\uD1A0\uB9AC:</strong> \uC54C\uB809\uC2A4 \uC874\uC2A8\uC740 \uACB0\uAD6D \uBC94\uC778\uC73C\uB85C \uBC1D\uD600\uC84C\uACE0, \uADF8\uC758 \uC74C\uBAA8\uB294 \uBAA8\uB450\uC5D0\uAC8C \uD3ED\uB85C\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uD0D0\uC0AC\uC120\uC758 \uC2B9\uBB34\uC6D0\uB4E4\uC740 \uADF8\uC758 \uBC30\uC2E0\uC5D0 \uD070 \uCDA9\uACA9\uC744 \uBC1B\uC558\uACE0, \uC54C\uB809\uC2A4\uB294 \uC9C0\uAD6C\uB85C \uC1A1\uD658\uB418\uC5B4 \uBC95\uC758 \uC2EC\uD310\uC744 \uBC1B\uAC8C \uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uD0D0\uC0AC\uC120\uC740 \uC0C8\uB85C\uC6B4 \uC120\uC7A5\uC744 \uC784\uBA85\uD558\uACE0, \uC5D0\uB9AC\uB2E8 IV\uB97C \uD5A5\uD55C \uD0D0\uC0AC\uB97C \uACC4\uC18D\uD558\uAC8C \uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uC2B9\uBB34\uC6D0\uB4E4\uC740 \uC54C\uB809\uC2A4\uC758 \uC74C\uBAA8\uB97C \uBC1D\uD600\uB0B8 \uAC83\uC5D0 \uC790\uBD80\uC2EC\uC744 \uB290\uB07C\uBA70, \uB2E4\uC2DC \uD55C \uBC88 \uC11C\uB85C\uB97C \uC2E0\uB8B0\uD558\uACE0 \uD611\uB825\uD558\uC5EC \uC784\uBB34\uB97C \uC644\uC218\uD558\uAE30\uB85C \uACB0\uC2EC\uD588\uC2B5\uB2C8\uB2E4.</p>\n            ";
    }
  });
});