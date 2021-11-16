'use strict'
import {hasPlayerWon} from '/rock-paper-scissors.js';

function main(){
    const gameInvitation = document.getElementById('game-invitation');
    const shapesContainer = document.getElementById('shapes-container');
    const winMessage = document.getElementById('win-message');
    const lossMessage = document.getElementById('loss-message');
    const playAgainButton = document.getElementById('play-again-button');
    const gameItems = Array.from(document.getElementsByClassName('game-shape'));

    gameItems.forEach(item =>
        item.addEventListener('click', event => playRound(event.target.value)));
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