const socket = io("https://spaces-invaders-game.herokuapp.com/");
// const socket = io("http://localhost:3000/");
const sessionGame = sessionStorage.getItem("sessionGame");
const player = new Player();
const projectiles = [];
const grids = [];
const invaderProjectiles = [];
const particles = [];
let danger = 0;
let frames = 0;
let InvadersInterval = Math.floor(Math.random() * 500 + 500);
let game = {
  over: false,
  active: true,
};
let score = 0;
const keys = {
  left: { status: false },
  right: { status: false },
  shoot: { status: false },
};
for (let i = 0; i < 100; i++) {
  particles.push(
    new Particle({
      position: {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      },
      velocity: {
        x: 0,
        y: 0.4,
      },
      radius: Math.random() * 2,
      color: "white",
    })
  );
}
window.onload = () => {
  socket.emit("session", { sessionGame });
  socket.on("move-ship", (data) => {
    // console.log(data); data del socket que escucha
    if (sessionGame === data.sessionGame) {
      const { code } = data;
      switch (code) {
        case 39:
          keys.left.status = false;
          keys.right.status = true;
          setTimeout(() => {
            keys.right.status = false;
          }, 200);
          break;
        case 37:
          keys.right.status = false;
          keys.left.status = true;
          setTimeout(() => {
            keys.left.status = false;
          }, 200);
          break;
        case 32:
          projectiles.push(
            new proyectile({
              position: {
                x: player.position.x + player.width / 2,
                y: player.position.y,
              },
              velocity: {
                x: 0,
                y: -8,
              },
            })
          );
          keys.shoot.status = true;
          break;
      }
    }
  });
  socket.on("action-pause", (data) => {
    if (sessionGame === data.sessionGame) {
      if (danger < 100) {
        game.active = !data.pause;
        data.pause ? handleAlertPause() : animate();
      }
    }
  });
  socket.on("start", (data) => {
    if (danger < 100) {
      game.active = false;
      data.data ? window.location.reload() : handleAlertReintentar(),
        setTimeout(() => {
          game.active = true;
          animate();
        }, 3100);
    }
  });
};
const createParticles = ({ object, color, fades }) => {
  for (let i = 0; i < 15; i++) {
    particles.push(
      new Particle({
        position: {
          x: object.position.x + object.width / 2,
          y: object.position.y + object.height / 2,
        },
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        },
        radius: Math.random() * 3,
        color: color || "#baa0de",
        fades,
      })
    );
  }
};
const animate = () => {
  if (!game.active) return;
  requestAnimationFrame(animate);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  particles.forEach((particle, i) => {
    if (particle.position.y - particle.radius >= canvas.height) {
      particle.position.x = Math.random() * canvas.width;
      particle.position.y = particle.radius;
    }

    if (particle.opacity <= 0) {
      setTimeout(() => {
        particles.splice(i, 1);
      }, 0);
    } else {
      particle.update();
    }
  });
  invaderProjectiles.forEach((invaderProjectile, index) => {
    if (
      invaderProjectile.position.y + invaderProjectile.height >=
      canvas.height
    ) {
      setTimeout(() => {
        invaderProjectiles.splice(index, 1);
      }, 0);
    } else {
      invaderProjectile.update();
    }
    //projectile hits player
    if (
      invaderProjectile.position.y + invaderProjectile.height >=
        player.position.y &&
      invaderProjectile.position.x + invaderProjectile.width >=
        player.position.x &&
      invaderProjectile.position.x <= player.position.x + player.width
    ) {
      if (danger >= 100) {
        setTimeout(() => {
          invaderProjectiles.splice(index, 1);
          player.opacity = 0;
          game.over = true;
        }, 0);
        setTimeout(() => {
          game.active = false;
          handleAlertGameOver(score);
        }, 2000);
      }
      createParticles({ object: player, color: "white", fades: true });
      danger = Math.floor((danger + 1) * 1.12);
      dangerLabel.className = handleDangerStatus(danger);
      dangerLabel.innerHTML = `${danger >= 100 ? 100 : danger}%`;
    }
  });
  projectiles.forEach((proyectile, i) => {
    if (proyectile.position.y + proyectile.radius <= 0) {
      setTimeout(() => {
        projectiles.splice(i, 1);
      }, 0);
    } else {
      proyectile.update();
    }
  });

  grids.forEach((grid, gridIndex) => {
    grid.update();
    //spawn proyectiles
    if (frames % 100 === 0 && grid.invaders.length > 0) {
      grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(
        invaderProjectiles
      );
    }
    grid.invaders.forEach((invader, i) => {
      invader.update({ velocity: grid.velocity });
      // projectiles hit enemy
      projectiles.forEach((proyectile, j) => {
        if (
          proyectile.position.y - proyectile.radius <=
            invader.position.y + invader.height &&
          proyectile.position.x + proyectile.radius >= invader.position.x &&
          proyectile.position.x - proyectile.radius <=
            invader.position.x + invader.width &&
          proyectile.position.y + proyectile.radius >= invader.position.y
        ) {
          setTimeout(() => {
            const invaderFound = grid.invaders.find(
              (invader2) => invader2 === invader
            );
            const proyectileFound = projectiles.find(
              (proyectile2) => proyectile2 === proyectile
            );
            if (invaderFound && proyectileFound) {
              score += 100;
              scoreLabel.innerHTML = score;
              createParticles({
                object: invader,
                fades: true,
              });
              grid.invaders.splice(i, 1);
              projectiles.splice(j, 1);
              if (grid.invaders.length > 0) {
                const firstInvader = grid.invaders[0];
                const lastInvader = grid.invaders[grid.invaders.length - 1];
                grid.width =
                  lastInvader.position.x -
                  firstInvader.position.x +
                  lastInvader.width;
                grid.position.x = firstInvader.position.x;
              } else {
                grids.splice(gridIndex, 1);
              }
            }
          }, 0);
        }
      });
    });
  });

  keys.left.status && player.position.x >= 0
    ? ((player.velocity.x = -5), (player.rotation = -0.15))
    : keys.right.status && player.position.x + player.width <= canvas.width
    ? ((player.velocity.x = 5), (player.rotation = 0.15))
    : ((player.velocity.x = 0), (player.rotation = 0));
  if (frames % InvadersInterval === 0) {
    grids.push(new Grid());
    InvadersInterval = Math.floor(Math.random() * 500 + 500);
    frames = 0;
  }
  frames++;
};
animate();

addEventListener("keydown", ({ keyCode }) => {
  if (game.over) return;
  switch (keyCode) {
    case 39:
      keys.right.status = true;
      break;
    case 37:
      keys.left.status = true;
      break;
    case 32:
      projectiles.push(
        new proyectile({
          position: {
            x: player.position.x + player.width / 2,
            y: player.position.y,
          },
          velocity: {
            x: 0,
            y: -8,
          },
        })
      );
      keys.shoot.status = true;
      break;
  }
});
addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 39:
      keys.right.status = false;
      break;
    case 37:
      keys.left.status = false;
      break;
    case 32:
      keys.shoot.status = false;
      break;
  }
});
