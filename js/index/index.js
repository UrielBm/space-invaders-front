let url = window.location.href;
const sessionGame = Math.random().toString(16).slice(2);
sessionStorage.setItem("sessionGame", sessionGame);
const qrcode = new QRCode(document.getElementById("qrcode"), {
  text: `${url}controller.html?id=${sessionGame}`,
  width: 150,
  height: 150,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H,
});
