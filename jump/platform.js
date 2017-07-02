class Platform {

  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.pos = createVector(width, height-h);
    this.vel = createVector(-10, 0);
  }

  update() {
    this.pos.add(this.vel);
  }

  draw() {
    stroke('#455A64');
    fill('#455A64');
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }

}
