export default function setUpHUD(advancedTexture, HUD){
    HUD.player1Score = advancedTexture.getControlByName("Player1Points");
    HUD.scoreLabel1 = advancedTexture.getControlByName("ScoreLabel1");
    HUD.title = advancedTexture.getControlByName("Title");
    HUD.subtitle = advancedTexture.getControlByName("Subtitle");
    HUD.question = advancedTexture.getControlByName("Question");

    
}