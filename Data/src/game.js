let playGameButton = document.querySelector("#playGame");
let newGame;

playGameButton.onclick = function () {
  if (!newGame /*|| !newGame.gameOn*/) {
    playGameButton.innerText = "Restart";
    map.createMap();
    newGame = new Game();
    newGame.startGame();

    window.addEventListener("keydown", (e) => {
      newGame.runLoop(e.key);
    });
  } else {
    playGameButton.innerText = "Play Game";
    map.createMap();
    newGame.stopLoop();
    location.reload();
  }
};
