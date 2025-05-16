// Modified from My old film by Sean Simon
let timeCounter = 0;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');         
  canvas.style('position', 'fixed');     
  noStroke();
}

function draw() {
  background(0);

  fill(50);
  rect(0, 0, width, height);

  for (let i = 0; i < 10; i++) {
    fill(255);
    ellipse(random(width), random(height), random(3), random(3));
  }

  timeCounter++;

  textAlign(CENTER, CENTER);

  if (timeCounter < 10) {
    fill(0, 30);
    rect(0, 0, width, height);
  }

  if (random(100) >= 99) {
    filter(INVERT);
  }

  if (random(100) >= 95) {
    fill(0, 10);
    rect(0, 0, width, height);
  }
}
