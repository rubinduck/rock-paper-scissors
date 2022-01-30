'use strict'
const shapes = ['rock', 'paper', 'scissors'];
const playerNumbers = ['First', 'Second'];
const roundResults = ['first-won', 'second-won', 'draw', 'erorr'];
const WIN_SCORE = 5;


class RockPaperScissorsGame {
    player1Score = 0;
    player2Score = 0;

    startNewGame(){
        this.player1Score = 0;
        this.player2Score = 0;
    }

    //returns string from roundResults
    //Can be: 'first-won', 'second-won', 'draw', 'erorr'
    playRound(player1Shape, player2Shape){
        if (this.maybeGetWinner() !== null)
            return 'error';
        if (!shapes.includes(player1Shape) || !shapes.includes(player2Shape))
            return 'error';
        const compareResult = this.compareMoves(player1Shape, player2Shape);
        if (compareResult === 1){
            this.player1Score++;
            return 'first-won';
        }
        else if (compareResult === -1){
            this.player2Score++;
            return 'second-won';
        }
        return 'draw';
    }
    
    // returns 0 for equal, 1 for move1 > move2 and -1 for move1 < move2
    compareMoves(move1, move2){
        if (!shapes.includes(move1)) throw new Error(`${move1} is not correct move`);
        if (!shapes.includes(move2)) throw new Error(`${move2} is not correct move`);
        if (move1 === move2)
            return 0;
        switch (move1){
            case 'rock':
                return move2 === 'scissors' ? 1 : -1;
            case 'paper':
                return move2 === 'rock' ? 1 : -1;
            case 'scissors':
                return move2 === 'paper' ? 1 : -1;
        }
    }

    // if there is winner returns its number otherwise null
    maybeGetWinner(){
        if (this.player1Score === WIN_SCORE)
            return 'First';
        if (this.player2Score === WIN_SCORE)
            return 'Second';
        return null;
    }
}

const genRandomShape = () =>
    chooseRandomItem(shapes);

const chooseRandomItem = (list) => {
    if (list.length === 0) throw new Error('Cant choose item from empty list');
    return list[randomInRange(0, list.length)];
}

// returns random number including min, not including max
const randomInRange = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);

function main(){
    const gameObject = new RockPaperScissorsGame();
    const gameInvitation = document.getElementById('game-invitation');
    const shapesContainer = document.getElementById('shapes-container');
    const roundResultElement = document.getElementById('round-result-message');
    const playAgainButton = document.getElementById('play-again-button');
    const gameItems = Array.from(document.getElementsByClassName('game-shape'));
    const scoreboard = document.getElementById('scoreboard');
    const humanScoreElement = document.getElementById('human-score-counter');
    const botScoreElement = document.getElementById('bot-score-counter');

    gameItems.forEach(item =>
        item.addEventListener('click', event => handleHumanInput(event.currentTarget.value)));
    playAgainButton.addEventListener('click', startNewGame);
    startNewGame();

    function startNewGame(event){
        gameObject.startNewGame();
        show(scoreboard, 
             gameInvitation,
             shapesContainer);
        hide(roundResultElement,
             playAgainButton);
    }

    function handleHumanInput(humansShape){
        const botsShape = genRandomShape();
        const roundResult = gameObject.playRound(humansShape, botsShape);
        if (roundResult === 'error') throw new Error('Round was not ok. Maybe invalid input');
        // const humanWon = gameObject.maybeGetWinner() === 'First';
        displayRoundResult(botsShape, roundResult)
    };

    function displayRoundResult(botsShape, roundResult){
        if (gameObject.maybeGetWinner() !== null){
            displayGameFinalResult(gameObject.maybeGetWinner());
            return;
        }
        let message = `Bot choosed ${botsShape}\n`;
        switch (roundResult) {
            case 'first-won':
                message += 'You won this round';
                break;
            case 'second-won':
                message += 'You lost this round';
                break;
            default:
                message += 'Draw';
        }
        roundResultElement.textContent = message;
        show(roundResultElement);
        updateScore(gameObject, humanScoreElement, botScoreElement);
    }

    function displayGameFinalResult(winner){
        const message = (winner === 'First')
        ? 'You won 🎉'
        : 'You lost 🙁';
        roundResultElement.textContent = message;
        hide(gameInvitation, shapesContainer, scoreboard);
        show(roundResultElement);
    }

    function updateScore(gameObject, scoreElement1, scoreElement2){
        scoreElement1.textContent = gameObject.player1Score;
        scoreElement2.textContent = gameObject.player2Score;
    }

    function hide(...elements){
        elements.forEach(element => element.classList.add('hidden'));
    }

    function show(...elements){
        elements.forEach(element => element.classList.remove('hidden'));
    }
}

main()