class Obstruction {
  constructor(x, y) {
    this.pos = vec2.create(x, y);

    this.size = 25;
  }

  render() {
    ctx.strokeStyle = '#333';
    ctx.fillStyle = 'rgba(20, 20, 20, 0.4)';
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
}
