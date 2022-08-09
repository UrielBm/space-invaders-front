let score = sessionStorage.getItem("score");
const playerName = document.querySelector("#playerName");
const actionButton = document.querySelector("#actionButton");
const list = document.querySelector("#orderlist");
window.onload = async () => {
  await handeGetRecords(list);
};
actionButton.addEventListener("click", async (e) => {
  e.preventDefault();
  if (score === null) {
    handleStatusError();
  } else if (playerName.value.trim() === "") {
    handleAlertNameEmpety();
  } else {
    const playerData = await handleDoRegister(playerName.value, score);
    // console.log(playerData); return de la data del registro
    if (playerData.status) {
      handleRightRegister(
        playerData.register.gamertag,
        playerData.register.score,
        playerData.position
      );
      playerName.value = "";
      score = null;
      sessionStorage.clear();
    }
  }
});

// const arrayItems = data.map((player, index) => {
//     return `<li><span class="name">${player.gamertag}</span><span class="points">${player.score}pts</span></li>`;
//   });
//   list.innerHTML = arrayItems;
