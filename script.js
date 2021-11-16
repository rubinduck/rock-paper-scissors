'use strict'
const MOVES = ['Rock', 'Paper', 'Scissors'];

function hasPlayerWon(humanMove){
    const machineMove = genRandomMove();
    return compareMoves(humanMove, machineMove) === 1;
}

const getRandomMove = () =>
    MOVES[randomInRange(0, MOVES.length)];

// returns random number including min, not including max
const randomInRange = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);

// returns 0 for equal, 1 for move1 > move2 and -1 for move1 < move2
function compareMoves(move1, move2){
    if (!MOVES.includes(move1)) throw new Error(`${move1} is not correct move`);
    if (!MOVES.includes(move2)) throw new Error(`${move2} is not correct move`);
    if (move1 === move2)
        return 0;
    switch (move1) {
        case 'Rock':
            return move2 === 'Scissors' ? 1 : -1;
        case 'Paper':
            return move2 === 'Rock' ? 1 : -1;
        case 'Scissors':
            return move2 === 'Paper' ? 1 : -1;
    }
}



function main(){
    const gameInvitation = document.getElementById('game-invitation');
    const shapesContainer = document.getElementById('shapes-container');
    const winMessage = document.getElementById('win-message');
    const lossMessage = document.getElementById('loss-message');
    const playAgainButton = document.getElementById('play-again-button');
    const gameItems = Array.from(document.getElementsByClassName('game-shape'));

    gameItems.forEach(item =>
        item.addEventListener('click',
            event => playRound(event.currentTarget.value)));
    playAgainButton.addEventListener('click', event => startNewGame());
    startNewGame();

    function startNewGame(){
        show(gameInvitation);
        show(shapesContainer);
        hide(winMessage);
        hide(lossMessage);
        hide(playAgainButton);
    }

    function playRound(playersItem){
        const playerWon = hasPlayerWon(playersItem);
        hide(gameInvitation);
        hide(shapesContainer);
        if (playerWon)
            show(winMessage);
        else
            show(lossMessage);
        show(playAgainButton)
    };

    function hide(element){
        element.classList.add('hidden');
    }

    function show(element){
        element.classList.remove('hidden')
    }
}

main()