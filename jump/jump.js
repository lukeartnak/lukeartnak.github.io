let ball = null;
let platforms = [];
let gap = 100;

let score = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  ball = new Ball(100, 300);
  let platform = new Platform(1000, 400);
  platform.pos.x = 0;
  platforms.push(platform);
}

function draw() {
  clear();
  background('#F5F5F5');

  noStroke();
  fill('#FDD835');
  ellipse(width - 100, 100, 100, 100);

  let last = platforms[platforms.length-1];

  if (last.pos.x + last.w < width - gap) {
    platforms.push(new Platform(random(200, 400), random(100, 400)));
    gap = random(100, 200);
  }

  platforms = platforms.reduce((active, platform) => {

    if (platform.pos.x + platform.w > 0) {
      platform.update();
      platform.draw();
      active.push(platform);
    }

    return active;

  }, []);

  let under = platforms.find(platform => {
    return ball.pos.x > platform.pos.x &&
      ball.pos.x < platform.pos.x + platform.w &&
      ball.pos.y <= platform.pos.y &&
      ball.pos.y + ball.r + ball.vel.y >= platform.pos.y;
  });

  if (under) {
    console.log('under');
    ball.vel.mult(0);
    ball.pos.y = under.pos.y - ball.r;
    ball.jumping = false;
  } else {
    ball.force(0, .5);
  }

  ball.update();
  ball.draw();

  if (ball.pos.y < height) {
    score += max(pow(ball.pos.x, 2) / width / 10, 1);
    textSize(20);
    textAlign(LEFT);
    fill('#43A047');
    text(round(score).toLocaleString(), 20, 40);
  } else {
    textSize(50);
    textAlign(CENTER);
    fill('#43A047');
    text('Final Score', 0, height / 2 - 100, width);
    textSize(100);
    text(round(score).toLocaleString(), 0, height / 2, width);
  }

}

function keyPressed() {
  if (keyCode === 32 && !ball.jumping) {
    ball.force(0, -10);
    ball.jumping = true;
  }
}
