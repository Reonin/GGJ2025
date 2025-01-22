export default function setUpHUD(advancedTexture, HUD){
    HUD.player1Score = advancedTexture.getControlByName("Player1Points");
    HUD.player2Score = advancedTexture.getControlByName("Player2Points");
    HUD.scoreLabel1 = advancedTexture.getControlByName("ScoreLabel1");
    HUD.scoreLabel2 = advancedTexture.getControlByName("ScoreLabel2");
    HUD.title = advancedTexture.getControlByName("Title");
    HUD.subtitle = advancedTexture.getControlByName("Subtitle");
    HUD.question = advancedTexture.getControlByName("Question");

    /**player 1 controls**/
    HUD.player1.answer1 = advancedTexture.getControlByName("Answer1");
    HUD.player1.answer2 = advancedTexture.getControlByName("Answer2");
    HUD.player1.answer3 = advancedTexture.getControlByName("Answer3");


     /**player 2 controls**/
    HUD.player2.answer1 = advancedTexture.getControlByName("Answer4");
    HUD.player2.answer2 = advancedTexture.getControlByName("Answer5");
    HUD.player2.answer3 = advancedTexture.getControlByName("Answer6");
   
    
}