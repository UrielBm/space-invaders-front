const canvas = document.querySelector("#canvas");
const scoreLabel = document.querySelector("#scoreLabel");
const dangerLabel = document.querySelector("#dangerLabel");
const context = canvas.getContext("2d");

if (handleSizeWindow()) {
  canvas.width = innerWidth - 1;
  canvas.height = innerHeight - 10;
} else {
  canvas.width = 1024;
  canvas.height = 576;
}
