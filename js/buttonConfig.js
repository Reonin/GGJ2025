
export default function setUpButtons(advancedTexture, buttonList) {
    buttonList.startGameButton = advancedTexture.getControlByName("Start Game");
    buttonList.startGameButton.onPointerUpObservable.add(function () {
    });
    buttonList.retry = advancedTexture.getControlByName("RetryGame");
    buttonList.retry.onPointerUpObservable.add(function () {
    });
}

