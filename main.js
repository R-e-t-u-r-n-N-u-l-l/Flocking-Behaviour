let canvas, ctx, BOIDS, ENEMIES, OBSTRUCTIONS;

const ZOMBIE_MODE = false;

onload = () => {
  canvas  = document.querySelector('canvas');
  ctx     = canvas.getContext('2d');

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  BOIDS = Array(750)
          .fill()
          .map(
            b => new Boid(
              Math.random() * canvas.width,
              Math.random() * canvas.height));
  ENEMIES = Array(0)
          .fill()
          .map(
            b => new Enemy(
              Math.random() * canvas.width,
              Math.random() * canvas.height));

  OBSTRUCTIONS = [];

  ctx.font = "30px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "hanging";

  update();
}

onclick = (e) => {
  if(e.button == 0)
    OBSTRUCTIONS.push(new Obstruction(e.pageX, e.pageY));
  else if(e.button == 2) {
    OBSTRUCTIONS = OBSTRUCTIONS.filter(o => {
      let mouse = vec2.create(e.pageX, e.pageY);
      return !(mouse.distanceTo(o.pos) < o.size);
    })
  }
}
oncontextmenu = (e) => {
  e.preventDefault();

}


const update = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  BOIDS.map(b => b.adjustToNearBoids(BOIDS, OBSTRUCTIONS.concat(ENEMIES)));
  BOIDS.map(b => b.move());
  BOIDS.map(b => b.render());


  ENEMIES.map(b => b.adjustToNearBoids(BOIDS, OBSTRUCTIONS));
  ENEMIES.map(e => e.move());
  ENEMIES.map(e => e.render());

  OBSTRUCTIONS.map(o => o.render());

  ctx.fillStyle = 'rgba(20, 20, 20, 0.7)'
  ctx.fillText('Total boids: ' + BOIDS.length, 5, 5);

  requestAnimationFrame(update);
}
