const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessage = document.getElementById("winningMessage");
const message = document.getElementById("message");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "x";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  currentPlayer = "x";
  cellElements.forEach((cell) => {
    cell.classList.remove("x", "o");
    cell.textContent = "";
    cell.addEventListener("click", handleClick, { once: true });
  });
  winningMessage.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  cell.classList.add(currentPlayer);
  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
  }
}

function swapTurn() {
  currentPlayer = currentPlayer === "x" ? "o" : "x";
}

function checkWin(player) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(player);
    });
  });
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
}

function endGame(draw) {
  if (draw) {
    message.textContent = "Draw!";
  } else {
    message.textContent = `${currentPlayer.toUpperCase()} Wins!`;
  }
  winningMessage.classList.add("show");
}
