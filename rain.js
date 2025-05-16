
let backgroundImg, maskedImg, maskedLayer;
let curves = [];
let spawnCounter = 0;

const CONFIG = {
  canvas: {
    width: 700,
    height: 840
  },
  images: {
    backgroundPath: 'img10/rain3.png',
    maskedPath: 'img2/rain2.png'
  },
  curve: {
    startYRange: [-50, 0],
    growthSpeedRange: [1, 2],
    xDriftOptions: [[-5, 1]],
    maxLengthRange: [600, 700],
    weightRange: [2,5]
  },
  generator: {
    spawnInterval: 5,
    maxCurves: 10
  }
};

function preload() {
  backgroundImg = loadImage(CONFIG.images.backgroundPath);
  maskedImg = loadImage(CONFIG.images.maskedPath);
}

function setup() {
  createCanvas(CONFIG.canvas.width, CONFIG.canvas.height);
  maskedLayer = createGraphics(width, height); 
  imageMode(CORNER);

  for (let i = 0; i < 8; i++) {
    curves.push(new Curve());
  }
}

function draw() {
  image(backgroundImg, 0, 0, width, height); 

 
  maskedLayer.clear();
  maskedLayer.image(maskedImg, 0, 0, width, height);

  for (let i = curves.length - 1; i >= 0; i--) {
    let c = curves[i];
    c.update();
    c.display(maskedLayer); 
   
  }


  spawnCounter++;
  if (spawnCounter >= CONFIG.generator.spawnInterval && curves.length < CONFIG.generator.maxCurves) {
    curves.push(new Curve());
    spawnCounter = 0;
  }

  image(maskedLayer, 0, 0, width, height);
}

// ai helps adjust my logic
class Curve {
  constructor() {
    this.x0 = random(width); 
    this.y0 = random(CONFIG.curve.startYRange[0], CONFIG.curve.startYRange[1]); 

    this.speed = random(CONFIG.curve.growthSpeedRange[0], CONFIG.curve.growthSpeedRange[1]);
    this.weight = random(CONFIG.curve.weightRange[0], CONFIG.curve.weightRange[1]); 
    this.length = random(CONFIG.curve.maxLengthRange[0], CONFIG.curve.maxLengthRange[1]);

    this.points = [];
    this.timer = 0;

    this.amp = random(1, 7);                 
    this.freq = random(0.02, 0.08);           
    this.phase = random(TWO_PI);             
    this.driftFreq = random(0.01, 0.05);      
    this.driftAmp = random(0.5, 2);   
    this.stopY = random(height * 0.5, height * 2);  
     
  }

update() {
  const step = this.speed;
  const last = this.points.length > 0 ? this.points[this.points.length - 1] : { x: this.x0, y: this.y0 };

  const newY = last.y + step;


  const drift = sin(this.timer * this.driftFreq) * this.driftAmp;
  const offsetX = sin(this.timer * this.freq + this.phase) * this.amp;
  const newX = this.x0 + offsetX + drift;

  if (newY <= this.stopY) {
    this.points.push({ x: newX, y: newY });
    this.timer += 1;
  }
}

  display(gfx) {
    gfx.push();
    gfx.erase();
    gfx.strokeWeight(this.weight);
    gfx.noFill();
    if (this.points.length > 2) {
      gfx.beginShape();
      
      gfx.curveVertex(this.points[0].x, this.points[0].y);
      gfx.curveVertex(this.points[0].x, this.points[0].y);
      for (let p of this.points) {
        gfx.curveVertex(p.x, p.y);
      }
      let last = this.points[this.points.length - 1];
      gfx.curveVertex(last.x, last.y);
      gfx.curveVertex(last.x, last.y);
      gfx.endShape();
    }
    gfx.noErase();
    gfx.pop();
  }

  finished() {
    return this.points.length > 10 && this.points[this.points.length - 1].y > height;
  }
}
