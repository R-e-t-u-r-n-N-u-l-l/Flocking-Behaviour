const MAXSPEED = 5;
const MAXFORCE = .03;
const ALIGNMENT_WEIGHT  = 1;
const COHESION_WEIGHT   = 1;
const SEPARATION_WEIGHT = 5;

class Boid {
  constructor(x, y) {
    this.pos = vec2.create(x, y);
    this.vel = vec2.fromAngleAndMagnitude(Math.random() * Math.PI * 2, 3);
    this.acc = vec2.create(0, 0);

    this.size = 10;
    this.angle = this.vel.getAngle();
    this.radius = 100;
  }

  move() {
    this.vel.add(this.acc);
    this.vel.limit(MAXSPEED);
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

  adjustToNearBoids(boids, obstrucions) {

    let nearBoids = boids.filter(b => {
      return (this.pos.distanceTo(b.pos) < this.radius && b != this);
    });

    if(nearBoids.length == 0) {
      this.angle = this.angle;
      return;
    }

    let total = vec2.create(0, 0);

    total.add(vec2.mult(this.align(nearBoids), ALIGNMENT_WEIGHT));
    total.add(vec2.mult(this.cohere(nearBoids), COHESION_WEIGHT));
    total.add(vec2.mult(this.separate(nearBoids, obstrucions), SEPARATION_WEIGHT));

    this.acc = total;
  }

  align(near) {
    let sum = vec2.create(0, 0);
    near.map(b => sum.add(b.vel));
    sum.div(near.length);
    sum.limit(MAXFORCE);

    return sum;
  }

  cohere(near) {
    let sum = vec2.create(0, 0);
    near.map(b => sum.add(b.pos));
    sum.div(near.length);

    return this.steerTo(sum)
  }

  separate(boids, obstructions) {
    let sum = vec2.create(0, 0);
    let nearBoids = boids.filter(b => {
      return (this.pos.distanceTo(b.pos) < this.size * 2 && b != this);
    });

    let nearObstructions = obstructions.filter(o => {
      return (this.pos.distanceTo(o.pos) < this.size * 2 + o.size * 2);
    });

    let near_ = nearBoids.concat(nearObstructions);

    let active = true;
    obstructions.map(o => {
      if(this.pos.distanceTo(o.pos) < this.size + o.size && o instanceof Enemy) {
        BOIDS.splice(BOIDS.indexOf(this), 1);
        active = false;

        if(ZOMBIE_MODE)
          ENEMIES.push(new Enemy(this.pos.x, this.pos.y));

        return o;
      }
    });

    if(!active)
      return vec2.create(0, 0);

    near_.map(b => {

      let tmp = vec2.sub(this.pos, b.pos);
      tmp.norm();
      tmp.div(this.pos.distanceTo(b.pos) + (this.size * 2 + b.size * 2) / 2);
      sum.add(tmp);

      return b;
    });

    if(sum.mag() > 0)
      sum.div(near_.length);

    sum.mult(this.vel.mag() * 2);

    return sum;
  }

  steerTo(target) {
    let destination = vec2.sub(target, this.pos);
    let distance    = destination.mag();

    if(distance > 0) {
      destination.norm();

      if(distance < this.radius)
        destination.mult(MAXSPEED * (distance / this.radius));
      else
        destination.mult(MAXSPEED);

      destination.sub(this.vel);
      destination.limit(MAXFORCE)
    }
    else
      destination = vec2.create(0, 0);

    return destination;
  }


  render() {
    ctx.strokeStyle = '#333';
    ctx.save();

    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.angle);

    ctx.beginPath();
    ctx.moveTo(0, -this.size);
    ctx.lineTo( this.size / 2, this.size);
    ctx.lineTo(-this.size / 2, this.size);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
/*
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
*/
  }
}
