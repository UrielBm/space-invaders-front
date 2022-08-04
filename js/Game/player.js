class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.rotation = 0;
    this.opacity = 1;
    const image = new Image();
    image.src = "./../assets/spaceship.png";

    image.onload = () => {
      const scale = 0.15;
      this.image = image;
      (this.width = image.width * scale), (this.height = image.height * scale);
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20,
      };
    };
  }
  draw() {
    // context.fillStyle = 'red';
    // context.fillRect(this.position.x,this.position.y,this.width,this.height)
    context.save();
    context.globalAlpha = this.opacity;
    context.translate(
      player.position.x + player.width / 2,
      player.position.y + player.height / 2
    );
    context.rotate(this.rotation);
    context.translate(
      -player.position.x - player.width / 2,
      -player.position.y - player.height / 2
    );
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    context.restore();
  }
  update() {
    if (this.image) {
      this.draw();
      this.position.x += this.velocity.x;
    }
  }
}
