let url = window.location.href;
const sessionGame = Math.random().toString(16).slice(2);
sessionStorage.setItem("sessionGame", sessionGame);
url = url.replace("/index.html", `/controller.html?id=${sessionGame}`);
console.log(url);
const qrcode = new QRCode(document.getElementById("qrcode"), {
  text: url,
  width: 150,
  height: 150,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H,
});
