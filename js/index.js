"use strict";
var rockButton = document.getElementById("rockButton");
var scissorsButton = document.getElementById("scissorsButton");
var paperButton = document.getElementById("paperButton");
var output = document.getElementById("output");
var output2 = document.getElementById("output2");
var resultDiv = document.getElementById("round");
var round = 1;
var computerScoreDiv = document.getElementById("computerScore");
var playerScoreDiv = document.getElementById("playerScore");
var playerScore = 0;
var computerScore = 0;
var newGameButton = document.getElementById("newGameButton");
var roundToStopDiv = document.getElementById("roundToStop");
var roundToStop;
var gameOverDiv = document.getElementById("GameOver");
var endOfGame;
var gameButtonsData;


paperButton.classList.add("buttonGameHide");
rockButton.classList.add("buttonGameHide");
scissorsButton.classList.add("buttonGameHide");
newGameButton.innerHTML = "Zaczynamy!";

newGameButton.addEventListener("click", function() {
  round = 1;
  playerScore = 0;
  computerScore = 0;
  output.innerHTML = " ";
  roundToStop = window.prompt(
    "Do ilu wygranych rund gramy?"
  );

  newGameButton.classList.add("buttonGameHide");
  paperButton.classList.remove("buttonGameHide");
  rockButton.classList.remove("buttonGameHide");
  scissorsButton.classList.remove("buttonGameHide");
  if (isFinite(roundToStop) && roundToStop > 0) {
    roundToStopDiv.innerHTML =
      "Gra toczy się do " + roundToStop + " wygranych rund.";
  } else {
    output.innerHTML = "<br>Podaj wartość większą od 0<br>";
    newGameButton.classList.remove("buttonGameHide");
    paperButton.classList.add("buttonGameHide");
    rockButton.classList.add("buttonGameHide");
    scissorsButton.classList.add("buttonGameHide");
  }
});

var gameButtons = document.querySelectorAll(".player-move");
    for (var i = 0; i < gameButtons.length; i++) {
    console.log(gameButtonsData);

  gameButtons[i].addEventListener("click", function(event) {
    var gameButtonsData = event.target.getAttribute("data-move");
    console.log(gameButtonsData);
    playerMove(gameButtonsData);
   
  });
}

function playerMove(playerPick) {
  var computerPick = randomComputerPick();
  var roundResult = compare(playerPick, computerPick);

  setGamePoints();

  output.innerHTML =
    "<br><br>Wybrałeś: " +
    playerPick +
    "<br>" +
    "Komputer wybrał: " +
    computerPick +
    "<br>" +
    roundResult;

  resultDiv.innerHTML = "<br><br>WYNIK po " + round + "<br> rundach";

  gameOver();
  round++;
}

function gameOver() {
  if (computerScore >= roundToStop || playerScore >= roundToStop) {
    output.innerHTML =
      " <br>GAME OVER <BR> Wynik Komputera: " +
      computerScore +
      "<br> Twój wynik:" +
      playerScore +
      "<br>";

    playerScore = 0;
    computerScore = 0;
    round = 1;
    resultDiv.innerHTML = "";
    computerScoreDiv.innerHTML = "";
    playerScoreDiv.innerHTML = "";
    paperButton.classList.add("buttonGameHide");
    rockButton.classList.add("buttonGameHide");
    scissorsButton.classList.add("buttonGameHide");
    roundToStopDiv.innerHTML = " ";
    newGameButton.classList.remove("buttonGameHide");
    newGameButton.innerHTML = "NEW GAME";
  }
}

function randomComputerPick() {
  var computerMove = Math.floor(Math.random() * 3 + 1);
    if (computerMove == 1) {
      computerMove = "paper";
  } else if (computerMove == 2) {
    computerMove = "rock";
  } else {
    computerMove = "scissors";
  }
  return computerMove;
}

function setGamePoints() {
  computerScoreDiv.innerHTML = "Computer score: " + computerScore;
  playerScoreDiv.innerHTML = "Player score: " + playerScore;
}

function compare(playerPick, computerPick) {
  if (playerPick === computerPick) {
  return "Remis!";
}

  if (playerPick === 'rock' && computerPick === 'scissors' ||
    playerPick === 'paper' && computerPick === 'rock' ||
    playerPick === 'scissors' && computerPick === 'paper') 
  {
  playerScore++;
  return "Wygrałeś!";
}

  computerScore++;
  return "Następnym razem będzie lepiej...";

  setGamePoints();
}