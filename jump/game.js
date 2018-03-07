const ball = {
  x: 50,
  y: 400,
  dy: 0,
  r: 10,
  j: false
};

const buildings = [{
  x: 0,
  w: window.innerWidth,
  h: 300
}];

const state = {
  score: 0,
  over: false
};

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
}

function draw() {
  background(250);

  fill(64);
  for (let building of buildings) {
    const y = height - building.h;
    rect(building.x, y, building.w, building.h);
  }

  fill(153, 51, 255);
  ellipse(ball.x, ball.y, 2 * ball.r, 2 * ball.r);

  fill(51, 153, 51);
  textSize(32);
  textAlign(CENTER);
  text(state.score.toLocaleString(), 0, height / 6, width);

  if (state.over) {
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER);
    textStyle(BOLD);
    text('Game Over', 0, height / 3, width);

    textSize(12);
    textAlign(CENTER);
    textStyle(NORMAL);
    text('Press R to restart'.toUpperCase(), 0, height / 3 + 24, width);
  } else {
    update();
  }
}

function update() {

  const building = buildings.find(b => b.x <= ball.x && b.x + b.w >= ball.x);

  if (building) {
    if (ball.y + ball.r > height - building.h) {
      state.over = true;
    } else if (ball.y + ball.r + ball.dy > height - building.h) {
      ball.y = height - building.h - ball.r;
      ball.dy = 0;
      ball.j = false;
    } else {
      ball.y += ball.dy;
      ball.dy++;
      ball.j = true;
    }
  } else {
    ball.y += ball.dy;
    ball.dy++;
    ball.j = true;
  }

  if (ball.y - ball.r > height) {
    state.over = true;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    if (ball.x < width - 5) {
      ball.x += 5;
    }
  } else if (keyIsDown(LEFT_ARROW)) {
    if (ball.x > 5) {
      ball.x -= 5;
    }
  }

  if (keyIsDown(UP_ARROW) && !ball.j) {
    ball.dy = -30;
    ball.j = true;
  }

  for (let building of buildings) {
    building.x -= 5;
  }

  const last = buildings[buildings.length - 1];
  if (last.x + last.w < width) {
    buildings.push({
      x: width + random(100, 300),
      w: random(300, 500),
      h: random(200, 400)
    });
  }

  const first = buildings[0];
  if (first.x + first.w < 0) {
    buildings.shift();
  }

  state.score += Math.floor((ball.x * ball.x) / 10000);
}

function keyPressed() {
  if (keyCode === 82 && state.over) {
    Object.assign(ball, {
      x: 50,
      y: 400,
      dy: 0,
      r: 10,
      j: false
    });

    Object.assign(state, {
      score: 0,
      over: false
    });

    buildings.splice(0, buildings.length, {
      x: 0,
      w: window.innerWidth,
      h: 300
    });
  }
}