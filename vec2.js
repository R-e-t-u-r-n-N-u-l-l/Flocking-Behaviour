class vec2 {
  constructor(x, y) { this.x = x; this.y = y; }

  add(vec2) { this.x += vec2.x;   this.y += vec2.y; }
  sub(vec2) { this.x -= vec2.x;   this.y -= vec2.y; }
  mult(num) { this.x *= num;      this.y *= num;    }
  div(num)  { this.x /= num;      this.y /= num;    }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  norm() {
    let m = this.mag();
    this.x /= m;
    this.y /= m;
  }
  getAngle() {
    let vec = vec2.norm(this);
    return Math.atan2(vec.y, vec.x) + Math.PI / 2;
  }
  distanceTo(vec) {
    let dx = vec.x - this.x;
    let dy = vec.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
  }
  limit(limit) {
    if(this.mag() > limit) {
      this.norm();
      this.mult(limit);
    }
  }


  static create(x, y) { return new vec2(x, y); }
  static random(min, max) {
    let x = Math.random() * (max - min + 1 ) + min;
    let y = Math.random() * (max - min + 1 ) + min;
    return new vec2(x, y);
  }
  static add(vec, vec_) {
    let x = vec.x + vec_.x;
    let y = vec.y + vec_.y;
    return new vec2(x, y);
  }
  static sub(vec, vec_) {
    let x = vec.x - vec_.x;
    let y = vec.y - vec_.y;
    return new vec2(x, y);
  }
  static mult(vec, num) {
    let v = new vec2(vec.x, vec.y);
    v.mult(num);
    return v;
  }
  static div(vec, num) {
    let v = new vec2(vec.x, vec.y);
    v.div(num);
    return v;
  }
  static norm(vec_) {
    let vec = new vec2(vec_.x, vec_.y);
    vec.norm();
    return vec;
  }
  static fromAngleAndMagnitude(angle, magnitude) {
    let x = Math.sin(angle) *  magnitude;
    let y = Math.cos(angle) * -magnitude;
    return new vec2(x, y);
  }
}
