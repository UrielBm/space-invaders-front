// constante y variables del control
// const socket = io("http://localhost:3000/");
const socket = io("https://spaces-invaders-game.herokuapp.com/");
const moveleft = document.querySelector("#moveleft");
const moveRight = document.querySelector("#moveright");
const buttonPlay = document.querySelector("#play");
const buttonPause = document.querySelector("#pause");
const actionShooting = document.querySelector("#actionShoot");
const sessionGame = window.location.href.split("?id=");
let status = false;
let setReintentar = false;
//funciones para el control

moveleft.addEventListener("click", () => {
  //console.log("movimiento a la izquierda");
  socket.emit("action-ship", {
    code: 37,
    sessionGame: sessionGame[1],
  });
});
moveRight.addEventListener("click", () => {
  //console.log("movimiento a la derecha");
  socket.emit("action-ship", {
    code: 39,
    sessionGame: sessionGame[1],
  });
});

actionShooting.addEventListener("click", () => {
  //console.log("shotting");
  socket.emit("action-ship", {
    code: 32,
    sessionGame: sessionGame[1],
  });
});

buttonPlay.addEventListener("click", () => {
  socket.emit("event-start", {
    sessionGame: sessionGame[1],
    data: setReintentar,
  });
  buttonPlay.firstChild.data = "Reintentar";
  setReintentar = !setReintentar;
});
buttonPause.addEventListener("click", () => {
  //pausar el juego
  socket.emit("pause", {
    pause: !status,
    sessionGame: sessionGame[1],
  });
  status
    ? (buttonPause.innerHTML = `Pausar`)
    : (buttonPause.innerHTML = `Jugar`);
  status = !status;
});
