'use strict'
const MOVES = ['Rock', 'Paper', 'Scissors'];

export function hasPlayerWon(humanMove){
    const machineMove = genRandomMove();
    return compareMoves(humanMove, machineMove) === 1;
}

// returns 0 for equal, 1 for move1 > move2 and -1 for move1 < move2
function compareMoves(move1, move2){
    if (!MOVES.includes(move1)) throw new Exception(`${move1} is not correct move`);
    if (!MOVES.includes(move2)) throw new Exception(`${move2} is not correct move`);
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

function genRandomMove(){
    return MOVES[randomInRange(0, MOVES.length)];
}

// returns random number including min, not including max
function randomInRange(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}


// class Enum {
//     constructor(...elements){
//         if (!elements.every(element => typeof(element) === 'string'))
//             throw Error(`Enum element names must be string. Recived ${elements}`)
//         elements.forEach(element => {
//             Object.defineProperty(this, element,  {value: Symbol(element), writable: false})
//         })
//         Object.seal(this)
//         return this
//     }
// }
