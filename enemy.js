class Enemy extends Boid {
  constructor(x, y) {
    super(x, y)
  }

  move() {
    this.vel.add(this.acc);
    this.vel.limit(MAXSPEED / 1.25);
    this.pos.add(this.vel);

    this.angle = this.vel.getAngle();

    this.pos.x < 0 ? this.pos.x = canvas.width    : 1;
    this.pos.y < 0 ? this.pos.y = canvas.height   : 1;
    this.pos.x > canvas.width   ? this.pos.x = 0  : 1;
    this.pos.y > canvas.height  ? this.pos.y = 0  : 1;

    // this.pos.x <= 0 + this.size || this.pos.x >= canvas.width   + this.size  ? this.vel.x *= -1 : 1;
    // this.pos.y <= 0 + this.size || this.pos.y >= canvas.height  + this.size  ? this.vel.y *= -1 : 1;

    this.acc.mult(0);
  }

  render() {
    ctx.strokeStyle = '#333';
    ctx.fillStyle = 'rgba(220, 20, 20, 0.4)';
    ctx.save();

    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.angle);

    ctx.beginPath();
    ctx.moveTo(0, -this.size);
    ctx.lineTo( this.size / 2, this.size);
    ctx.lineTo(-this.size / 2, this.size);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.restore();
/*
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
*/
  }
}
