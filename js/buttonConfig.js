
export default function setUpButtons(advancedTexture, buttonList) {
    buttonList.startGameButton = advancedTexture.getControlByName("Start Game");
    buttonList.startGameButton.onPointerUpObservable.add(function () {
        console.log("%cStart Game Pressed", "color:green");
    });
}

