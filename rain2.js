// coverBackground.js
new p5((p) => {
  let backgroundImg, maskedImg, maskedLayer;
  let curves = [];
  let spawnCounter = 0;

  const CONFIG = {
    canvas: { width: 700, height: 840 },
    images: {
      backgroundPath: 'img10/rain3.png',
      maskedPath: 'img2/rain2.png'
    },
    curve: {
      startYRange: [-50, 0],
      growthSpeedRange: [1, 2],
      xDriftOptions: [[-5, 1]],
      maxLengthRange: [600, 700],
      weightRange: [2, 5]
    },
    generator: {
      spawnInterval: 5,
      maxCurves: 10
    }
  };

  p.preload = () => {
    backgroundImg = p.loadImage(CONFIG.images.backgroundPath);
    maskedImg = p.loadImage(CONFIG.images.maskedPath);
  };

  p.setup = () => {
    const canvas = p.createCanvas(CONFIG.canvas.width, CONFIG.canvas.height);
    canvas.parent("cover-canvas");
    canvas.style("z-index", "0");
    canvas.style("pointer-events", "none");


    
    maskedLayer = p.createGraphics(p.width, p.height);
    p.imageMode(p.CORNER);

    for (let i = 0; i < 8; i++) {
      curves.push(new Curve());
    }
  };

  p.draw = () => {
    p.clear(); 
  p.image(backgroundImg, 0, 0, p.width, p.height);
    maskedLayer.clear();
    maskedLayer.image(maskedImg, 0, 0, p.width, p.height);

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

    p.image(maskedLayer, 0, 0, p.width, p.height);
  };

  class Curve {
    constructor() {
      this.x0 = p.random(p.width);
      this.y0 = p.random(CONFIG.curve.startYRange[0], CONFIG.curve.startYRange[1]);
      this.speed = p.random(CONFIG.curve.growthSpeedRange[0], CONFIG.curve.growthSpeedRange[1]);
      this.weight = p.random(CONFIG.curve.weightRange[0], CONFIG.curve.weightRange[1]);
      this.length = p.random(CONFIG.curve.maxLengthRange[0], CONFIG.curve.maxLengthRange[1]);
      this.points = [];
      this.timer = 0;
      this.amp = p.random(1, 7);
      this.freq = p.random(0.02, 0.08);
      this.phase = p.random(p.TWO_PI);
      this.driftFreq = p.random(0.01, 0.05);
      this.driftAmp = p.random(0.5, 2);
      this.stopY = p.random(p.height * 0.5, p.height * 2);
    }

    update() {
      const step = this.speed;
      const last = this.points.length > 0 ? this.points[this.points.length - 1] : { x: this.x0, y: this.y0 };
      const newY = last.y + step;
      const drift = p.sin(this.timer * this.driftFreq) * this.driftAmp;
      const offsetX = p.sin(this.timer * this.freq + this.phase) * this.amp;
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
        for (let pnt of this.points) {
          gfx.curveVertex(pnt.x, pnt.y);
        }
        let last = this.points[this.points.length - 1];
        gfx.curveVertex(last.x, last.y);
        gfx.curveVertex(last.x, last.y);
        gfx.endShape();
      }
      gfx.noErase();
      gfx.pop();
    }
  }
}, "cover-canvas");
