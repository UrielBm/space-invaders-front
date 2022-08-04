const handleDangerStatus = (danger) => {
  if (danger <= 35) {
    return "right";
  } else if (danger >= 36 && danger <= 75) {
    return "warning";
  } else {
    return "danger";
  }
};

const handleSizeWindow = () => {
  if (window.innerWidth <= 800) {
    return true;
  } else {
    return false;
  }
};

const handleAlertGameOver = (puntos) => {
  Swal.fire({
    title: "Fin del juego",
    text: `Obtuviste ${puntos} puntos, ¿quieres registrar tu marca?`,
    background: "#000000",
    color: "#ffffff",
    imageUrl: "./../assets/gameover.gif",
    imageAlt: "imagen de game over",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "Registrar",
    cancelButtonText: "Reintentar",
  }).then((result) => {
    if (result.isConfirmed) {
      sessionStorage.setItem("score", puntos);
      const url = window.location.href.replace("game.html", "bestscores.html");
      window.location.href = url;
    } else {
      const url = window.location.href.replace("game.html", "index.html");
      window.location.href = url;
    }
  });
};
