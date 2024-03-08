const handeGetRecords = async () => {
  try {
    const response = await fetch(
      "https://spaceinvadersgameback-production.up.railway.app/bestplaces",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.length > 0) {
      list.innerHTML = "";
      data.forEach((player) => {
        const item = document.createElement("li");
        item.innerHTML = `<span class="name">${player.gamertag}</span><span class="points">${player.score}pts</span>`;
        list.appendChild(item);
      });
    } else {
      const item = document.createElement("li");
      item.className = "no-data";
      item.innerHTML = "<span>Aun no hay registros :(</span>";
      list.appendChild(item);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleStatusError = () => {
  Swal.fire({
    title: "No hay puntos registrados",
    text: `Debes jugar una partida para registrar puntos`,
    background: "#000000",
    color: "#ffffff",
    imageUrl: "./../assets/scoreBug.gif",
    imageAlt: "imagen de Score Bug",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "Jugar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      const url = "https://space-invaders-front.vercel.app";
      window.location.href = url;
    }
  });
};
const handleAlertNameEmpety = () => {
  Swal.fire({
    title: "¡Cuidado!",
    text: "No has colocado tu nombre de jugador para registrarlo.",
    background: "#000000",
    color: "#ffffff",
    imageUrl: "./../assets/bugname.gif",
    imageAlt: "imagen de Score Bug",
    timer: 2000,
  });
};

const handleRightRegister = (gamertag, score, position) => {
  Swal.fire({
    title: position === 1 ? "¡Eres el mejor!" : "Bien jugado",
    text: `${gamertag} has quedado registrado con un score de: ${score}pts eres el ${position} en la tabla de posiciones`,
    background: "#000000",
    color: "#ffffff",
    imageUrl:
      position === 1 ? "./../assets/winner.gif" : "./../assets/check.gif",
    imageAlt: "Correct",
  }).then((result) => {
    if (result.isConfirmed && position <= 10) {
      handeGetRecords();
    }
  });
};

const handleDoRegister = async (gamertag, score) => {
  try {
    let response = await fetch(
      "https://spaceinvadersgameback-production.up.railway.app/registerrecord",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gamertag, score }),
      }
    );
    response = await response.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};
