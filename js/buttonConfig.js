
export default function setUpButtons(advancedTexture, buttonList) {
    buttonList.startGameButton = advancedTexture.getControlByName("Start Game");
    buttonList.startGameButton.onPointerUpObservable.add(function () {
        console.log("%cStart Game Pressed", "color:green");
    });
    buttonList.retry = advancedTexture.getControlByName("RetryGame");
    buttonList.retry.onPointerUpObservable.add(function () {
        console.log("%cretry", "color:green");
    });
}

