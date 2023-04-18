
let tablero = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let w; 
let h; 
let ai = 'X';
let human = 'O';
let currentPlayer = human;

function setup() {
  createCanvas(200, 200); //Tamaño del tablero 
  w = width / 3;  //Divide el espacio en 3
  h = height / 3;
  bestMove(); //La ia comienza la jugada
}


//que las tres casillas tengan lo mismo y que la casilla principal no este vacia
function equals3(a, b, c) {
  return a == b && b == c && a != '';
}
//Compara los valores x/o en las posibles lineas del tablero
function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(tablero[i][0], tablero[i][1], tablero[i][2])) {
      winner = tablero[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(tablero[0][i], tablero[1][i], tablero[2][i])) {
      winner = tablero[0][i];
    }
  }

  // Diagonal
  if (equals3(tablero[0][0], tablero[1][1], tablero[2][2])) {
    winner = tablero[0][0];
  }
  if (equals3(tablero[2][0], tablero[1][1], tablero[0][2])) {
    winner = tablero[2][0];
  }

  //Cuenta las casillas vacias
  let emptySquares = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (tablero[i][j] == '') {
        emptySquares++;
      }
    }
  }
  if (winner == null && emptySquares == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function mousePressed() {
  //human's turn
  if (currentPlayer == human) {
    // Obtiene las coordenadas del mouse
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    //Sino esta vacio coloca 'O' y el jugador actual es la ia
    if (tablero[i][j] == '') {
      tablero[i][j] = human;
      currentPlayer = ai;
      bestMove(); //Ejecuta algoritmo minmax
    }
  }
}

function draw() {
  background(255);
  strokeWeight(10); //Ancho 
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = tablero[i][j];
      textSize(32);
      let r = w / 4;
      if (spot == human) {
        noFill();
        ellipse(x, y, r * 2);
      } else if (spot == ai) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  let result = checkWinner();
  
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '20pt').style('font-family', 'arial').style('font-weight','bold');
    if (result == 'tie') {
      resultP.html('EMPATE (☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)');
    } else {
      if (result=='O'){
        resultP.html("EL HUMANO GANÓ (☞ﾟヮﾟ)☞")
      }else{
        resultP.html("LA IA GANÓ (❁´◡`❁)")        
      }
    }
  }
}