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
        const compareResult = this.#compareShapes(player1Shape, player2Shape);
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
    
    // returns 0 for equal, 1 for shape1 > shape2 and -1 for shape1 < shape2
    #compareShapes(shape1, shape2){
        if (!shapes.includes(shape1)) throw new Error(`${shape1} is not correct shape`);
        if (!shapes.includes(shape2)) throw new Error(`${shape2} is not correct shape`);
        if (shape1 === shape2)
            return 0;
        switch (shape1){
            case 'rock':
                return shape2 === 'scissors' ? 1 : -1;
            case 'paper':
                return shape2 === 'rock' ? 1 : -1;
            case 'scissors':
                return shape2 === 'paper' ? 1 : -1;
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
    return list[randomInt(0, list.length)];
}

// returns random number including min, not including max
const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);

function main(){
    const gameObject = new RockPaperScissorsGame();
    const shapesContainer = document.getElementById('shapes-container');
    const roundResultElement = document.getElementById('round-result-message');
    const playAgainButton = document.getElementById('play-again-button');
    const shapeElements = document.querySelectorAll('.shape');
    const scoreboard = document.getElementById('scoreboard');
    const humanScoreElement = document.getElementById('human-score-counter');
    const botScoreElement = document.getElementById('bot-score-counter');

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('keydown', addActiveEffect);
        button.addEventListener('keyup', removeActiveEffect);});

    shapeElements.forEach(shape => shape.addEventListener('click', handleHumanInput));
    playAgainButton.addEventListener('click', startNewGame);

    startNewGame();

    function startNewGame(event){
        gameObject.startNewGame();
        show(scoreboard, 
             shapesContainer);
        hide(roundResultElement,
             playAgainButton);
    }

    function handleHumanInput(event){
        const humansShape =  event.currentTarget.dataset.shape;
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
        let message = `Bot choosed ${botsShape}. `;
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
        hide(shapesContainer, scoreboard);
        show(roundResultElement, playAgainButton);
    }

    function updateScore(gameObject){
        humanScoreElement.textContent = gameObject.player1Score;
        botScoreElement.textContent = gameObject.player2Score;
    }
}

function hide(...elements){
    elements.forEach(element => element.classList.add('hidden'));
}

function show(...elements){
    elements.forEach(element => element.classList.remove('hidden'));
}

function addActiveEffect(event){
    if (!isSpaceOrEnter(event.key)) return;
    event.currentTarget.classList.add('active');
}

function removeActiveEffect(event){
    if (!isSpaceOrEnter(event.key)) return;
    event.currentTarget.classList.remove('active');
}

function isSpaceOrEnter(key){
    return key === ' ' || key === 'Enter';
}

main()