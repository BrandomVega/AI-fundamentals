function bestMove() {
  let bestScore = -1000000;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      //Espacio disponible
      if (tablero[i][j] == '') {
        tablero[i][j] = ai;
        let score = minimax(tablero, 0, false);
        tablero[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  tablero[move.i][move.j] = ai;
  currentPlayer = human;
}

let scores = {
  X: 1,
  O: -1,
  tie: 0
};


//isMaximazing permite saber el turno de max  o de min y actuar sobre eso
function minimax(tablero, depth, isMax) {
  let result = checkWinner();
  if (result !== null) { //Ya hay un ganador
    //console.log(depth);
    return scores[result];
  }
  console.log(depth)
  if (isMax) {
    let bestScore = -1000000;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (tablero[i][j] == '') {
          tablero[i][j] = ai;
          let score = minimax(tablero, depth + 1, false);
          tablero[i][j] = '';
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else { //Turno de mini
    let bestScore = 1000000;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (tablero[i][j] == '') {
          tablero[i][j] = human;
          let score = minimax(tablero, depth + 1, true);
          tablero[i][j] = '';
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}