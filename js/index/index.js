//variables del Qr y del socket
const socket = io("http://localhost:3000/");
let url = window.location.href;
const sessionGame = Math.random().toString(16).slice(2);
sessionStorage.setItem("sessionGame", sessionGame);
// console.log(`${url}controller.html?id=${sessionGame}`);

//creación del código Qr

const qrcode = new QRCode(document.getElementById("qrcode"), {
  text: `${url}controller.html?id=${sessionGame}`,
  width: 150,
  height: 150,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H,
});

// funciones que se ejecutan al cargar la página
window.onload = () => {
  socket.emit("session", { sessionGame });
  socket.on("start", () => {
    window.location.href = `${url}game.html`;
  });
};
