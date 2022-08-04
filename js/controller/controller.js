const socket = io("https://spaces-invaders-game.herokuapp.com/");
const moveleft = document.querySelector("#moveleft");
const moveRight = document.querySelector("#moveright");
const actionShooting = document.querySelector("#actionShoot");

moveleft.addEventListener("click", () => {
  console.log("movimiento a la izquierda");
  socket.emit("action-ship", {
    code: 37,
  });
});
moveRight.addEventListener("click", () => {
  console.log("movimiento a la derecha");
  socket.emit("action-ship", {
    code: 39,
  });
});

actionShooting.addEventListener("click", () => {
  console.log("shotting");
  socket.emit("action-ship", {
    code: 32,
  });
});
