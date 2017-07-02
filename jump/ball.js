class Ball {

  constructor(x, y, r = 10) {
    this.r = r;
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.jumping = false;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (keyIsDown(65)) {
      this.pos.add(-5, 0);
    } else if (keyIsDown(68)) {
      this.pos.add(5, 0);
    }
  }

  draw() {
    stroke('#5E35B1');
    fill('#5E35B1');
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
  }

  force(x, y) {
    this.acc.add(createVector(x, y));
    this.vel.add(this.acc);
    this.vel.y = min(this.vel.y, 10);
    this.pos.add(this.vel);
    this.acc = createVector(0, 0);
  }

}
