export class GameManager {
    constructor() {
        this.QuestionData;
        this.roundNumber;
        this.player1IsLocked = true;
        this.player2IsLocked = true;
    }


    executeRoundSwap(HUD) {

        // console.log(this.QuestionData);

        const keys = Object.keys(this.QuestionData);
        const randomIndex = keys[Math.floor(Math.random() * keys.length)];
        const item = this.QuestionData[randomIndex];

        console.log(this.QuestionData)

        HUD.question.text = item.problem;

        HUD.player1.answer1.text = item.answers[0];
        HUD.player2.answer1.text = item.answers[2];

        HUD.player1.answer2.text = item.answers[1];
        HUD.player2.answer2.text = item.answers[1];

        HUD.player1.answer3.text = item.answers[2];
        HUD.player2.answer3.text = item.answers[0];

        HUD.correctAnswer = item.correctAnswer;


        if (!("scramble" in Array.prototype)) {
            Object.defineProperty(Array.prototype, "scramble", {
                enumerable: false,
                value: function () {
                    var o, i, ln = this.length;
                    while (ln--) {
                        i = Math.random() * (ln + 1) | 0;
                        o = this[ln];
                        this[ln] = this[i];
                        this[i] = o;
                    }
                    return this;
                }
            });
        }

        item.answers.forEach(q => {
            item.answers.scramble()
        });

        delete this.QuestionData[randomIndex];
    }

    
    async loadQuestionData(HUD) {
        let hostPath;

        if(location.hostname === "localhost"){
            hostPath = './';
        }
        else {
            hostPath = '/GGJ2025/';
        }

        try {
            const response = await fetch(hostPath + 'json/data.json');
            this.QuestionData = await response.json();
            this.executeRoundSwap(HUD);
        } catch (error) {
            return console.log(error);
        }
    }

    changeRound(number, HUD, shouldILoadData = false) {
        console.log(number);
        this.player1IsLocked = false;
        this.player2IsLocked = false;

        this.roundNumber = number;
        if (shouldILoadData) {
            this.loadQuestionData(HUD);
        } else {
            //Skip fetching and use data that's present
            this.executeRoundSwap(HUD);
        }

    }

    checkForCorrectAnswer(playerScore, playersAnswer, HUD, whichPlayer) {
        if (Number(playersAnswer) === HUD.correctAnswer) {
            this.changeRound(this.roundNumber + 1, HUD);
            return Number(playerScore) + 1;

        } else {
            console.log("%cWrong Answer!!!", "color:red");
            this.lockOutInputTemporarily(whichPlayer);
            return Number(playerScore);
        }
    }


    lockOutInputTemporarily(whichPlayer) {
        const time = 3000;
        if (whichPlayer === 'player1') {
            this.player1IsLocked = true;
            setTimeout(() => {
                this.player1IsLocked = false;
            }, time);
        } else if (whichPlayer === 'player2') {
            this.player2IsLocked = true;
            setTimeout(() => {
                this.player2IsLocked = false;
            }, time);
        }
    }
}


