const canvas = document.getElementById("filmCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gifContainer = document.getElementById("gif-container");
const hoverFrames = [];



 const rightEndImage = new Image();
 rightEndImage.src = "img/Web_Photo_Editor.png"; 
let rightEndImageLoaded = false;
rightEndImage.onload = () => {
  rightEndImageLoaded = true;
};
const rightEndLink = "bookdouble2.html"; 
let rightEndImageBox = null; 





let scrollOffset = 0;


const scale = 0.8;
const rollHeadWidth = 445 * scale;
const frameWidth = 750 * scale;
const frameHeight = 500 * scale;
const filmHeight = 950 * scale;
const holeGap = 55 * scale;
const topOffset = 150 * scale;

const rollHeadImage = new Image();
rollHeadImage.src = "img/35mmfilmrollset3dmodels14.png";

let timeCounter = 0;
function setup() {
  const bgCanvas = createCanvas(windowWidth, windowHeight);
  bgCanvas.position(0, 0);
  bgCanvas.style('z-index', '-1');
  bgCanvas.style('position', 'fixed');
  bgCanvas.style('pointer-events', 'none');
  noStroke();
}


function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}


function draw() {
  background(0);
  fill(90);
  rect(0, 0, width, height);

  for (let i = 0; i < 10; i++) {
    fill(255);
    ellipse(random(width), random(height), random(3), random(3));
  }

  timeCounter++;
  if (timeCounter < 10) {
    fill(0, 30);
    rect(0, 0, width, height);
  }
  if (random(100) >= 99) filter(INVERT);
  if (random(100) >= 95) {
    fill(0, 10);
    rect(0, 0, width, height);
  }
}

const frames = [
  {
    images: ["img10/6d317e18a966d4cc5025a6bfe0e0461.jpg"],
    titleTop: "Parts that can be used for physical computing ",
    titleBottom: "When we first encountered these parts, my partner and I tried to name and categorize them, although there were still some parts we didn't understand.The most important part is Arduino, an open-source electronic platform that connects sensors, actuators, and computers. Arduino can read real-world input and drive the output behavior with code, such as the experiments I mentioned later."
  },
  {
    images: ["img6/fan.gif", "img7/lighti.gif"],
    titleTop: " BLINK!",
    titleBottom: "Now we are starting to try to use these parts to make a fan connected to a battery, which is a very simple experiment. Then the following experiment connected the bread board through Arduino to form two results: one to switch the red led through dimmer, and one to light the green led through button."
  },
  {
    images: ["img/55d07faa8010d7e2c38b9e0ff06884f.jpg","img5/eab14e4b27003531ca29654e114ec32.png"],
    titleTop: " Headspace & Fish Playground",
    titleBottom: "The function of Headspace is that the buzzer will make a call when the obstacle is close to the Ultrasonic distance sensor. The function of the Fish Playground is that when there is an obstacle blocking the photoresistor, the fan-like object on the blue object will rotate. But oddly enough, both of these experiments failed even though my code and the circuit were connected correctly."
  },

    {
    images: ["img8/potato.gif","img4/bibibi.gif"],
    titleTop: "Noisy potatoes and tinfoil",
    titleBottom: "When different connectors are inserted into a potato or wrapped in tin foil, the buzzer makes different sounds."
  },
  {
    images: ["img10/6117b7cd9ba342ba6c193a64472e2e8.jpg"],
    titleTop: "Physical Data to P5.js",
    titleBottom: "Arduino will connect to P5.js and output the content to the browser, I can use the potentiometer on the Arduino to control the brightness and content of the webpage. Note that when running web serial in the browser, you need to turn off the Arduino serial monitor."
  }
];

function drawFilmRollHead(x) {
  const y = topOffset - 30;
  const w = rollHeadWidth;
  const h = filmHeight;
  if (rollHeadImage.complete) {
    ctx.drawImage(rollHeadImage, x, y, w, h);
  } else {
    rollHeadImage.onload = () => ctx.drawImage(rollHeadImage, x, y, w, h);
  }
}

function drawFilmFrame(x, images, titleTop, titleBottom) {
  ctx.fillStyle = "#000";
  ctx.fillRect(x, topOffset, frameWidth, filmHeight);

  const imgBoxX = x + 25;
  const imgBoxY = topOffset + 80;
  const imgBoxWidth = frameWidth - 50;
  const imgBoxHeight = frameHeight;
  

  ctx.fillStyle = "#444";
  ctx.fillRect(imgBoxX, imgBoxY, imgBoxWidth, imgBoxHeight);

  const count = images.length;
  const singleWidth = imgBoxWidth / count;

  images.forEach((url, idx) => {
    const subX = imgBoxX + idx * singleWidth;
    const subWidth = singleWidth;

    if (url.endsWith(".gif")) {
      const gif = document.createElement("img");
      gif.src = url;
      gif.style.position = "absolute";
      gif.style.left = `${subX}px`;
     gif.style.top = `${imgBoxY - 20}px`;
     gif.style.height = `${imgBoxHeight - 20}px`;
      gif.style.width = `${subWidth}px`;
      gif.style.objectFit = "contain";
      gif.style.pointerEvents = "none";
      gif.classList.add("gif-frame");
      gifContainer.appendChild(gif);
    } else {
      const img = new Image();
      img.onload = () => {
        const imgRatio = img.width / img.height;
        const boxRatio = subWidth / imgBoxHeight;
        let drawW, drawH, offsetX, offsetY;
        if (imgRatio > boxRatio) {
          drawW = subWidth;
          drawH = subWidth / imgRatio;
          offsetX = 0;
          offsetY = (imgBoxHeight - drawH) / 2;
        } else {
          drawH = imgBoxHeight;
          drawW = imgBoxHeight * imgRatio;
          offsetX = (subWidth - drawW) / 2;
          offsetY = 0;
        }
        ctx.drawImage(img, subX + offsetX, imgBoxY + offsetY, drawW, drawH);
      };
      img.src = url;
    }
  });

  ctx.fillStyle = "#f2b27c";
 ctx.font = "20px 'Josefin Sans', sans-serif";
  ctx.textAlign = "center";

  ctx.font = "20px 'Josefin Sans', sans-serif";
  ctx.fillText(titleTop, x + frameWidth / 2, topOffset + 35);

  ctx.font = "15px 'Josefin Sans', sans-serif";
  ctx.fillStyle = "#f2b27c";
  ctx.textAlign = "center";
 const textX = x + frameWidth / 2;
 const textY = topOffset + filmHeight - 110;
 const maxTextWidth = frameWidth - 50;      
 const lineHeight = 16;                    

wrapText(ctx, titleBottom, textX, textY, maxTextWidth, lineHeight);


  for (let i = 0; i < frameWidth; i += holeGap) {
    ctx.fillStyle = "#eee";
    ctx.fillRect(x + i + 9, topOffset + 50, 15, 10);
    ctx.fillRect(x + i + 9, topOffset + filmHeight - 200, 15, 10);
  }
}

function drawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.querySelectorAll(".gif-frame").forEach(el => el.remove());

  drawFilmRollHead(-scrollOffset + 100);

  hoverFrames.length = 0;

  for (let i = 0; i < frames.length; i++) {
    const baseOffset = 65;
    const frameX = rollHeadWidth + baseOffset + i * (frameWidth + 1) - scrollOffset;
    drawFilmFrame(frameX, frames[i].images, frames[i].titleTop, frames[i].titleBottom);


  hoverFrames[i] = {
    titleTop: frames[i].titleTop,
  x: frameX,
  y: topOffset,
  width: frameWidth,
  height: filmHeight,
  imgBoxX: frameX + 25,
  imgBoxY: topOffset + 80,
  imgBoxWidth: frameWidth - 50,
  imgBoxHeight: frameHeight
};
     
  }

  if (rightEndImageLoaded) {
  const endX = rollHeadWidth + 400 + frames.length * (frameWidth + 1); 
  const imageY = topOffset + 200; 
  const imageW = 400;
const imageH = 400;


  ctx.drawImage(rightEndImage, endX - scrollOffset, imageY, 300,300); 
  
  rightEndImageBox={
    x:endX - scrollOffset,
    y:imageY,
    width:imageW,
    height:imageH
  };
}


  



}

canvas.addEventListener("wheel", function (e) {
  e.preventDefault();
  scrollOffset += e.deltaY;

 
  const imageBuffer = 1000; 
  const maxOffset = frames.length * (frameWidth + 1) + rollHeadWidth + imageBuffer - canvas.width;

  scrollOffset = Math.max(0, Math.min(scrollOffset, maxOffset));
  drawAll();
 
if (hoveredGif) {
  hoveredGif.remove();
  hoveredGif = null;
}

}, { passive: false });



drawAll();
canvas.style.cursor = 'url("img6/Metal08.png") 16 16,auto';


let hoveredGif = null;

canvas.addEventListener("mousemove", function (e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;






  let found = false;

  for (let i = 0; i < hoverFrames.length; i++) {
    const frame = hoverFrames[i];

    if (
      frame.titleTop === "Physical Data to P5.js" &&
      mouseX >= frame.x &&
      mouseX <= frame.x + frame.width &&
      mouseY >= frame.y &&
      mouseY <= frame.y + frame.height
    ) {
      if (!hoveredGif) {
        hoveredGif = document.createElement("img");
        hoveredGif.src = "img9/green.gif"; 
        hoveredGif.style.position = "absolute";
     
        hoveredGif.style.left = `${frame.imgBoxX}px`;
        hoveredGif.style.top = `${frame.imgBoxY - 25}px`;
        hoveredGif.style.width = `${frame.imgBoxWidth}px`;
        hoveredGif.style.height = `${frame.imgBoxHeight}px`;
        hoveredGif.style.pointerEvents = "none";
        hoveredGif.classList.add("hovered-gif");
        gifContainer.appendChild(hoveredGif);
      }
      found = true;
      break;
    }
  }

  if (!found && hoveredGif) {
    hoveredGif.remove();
    hoveredGif = null;
  }
});


canvas.addEventListener("click", function (e) {
  if (!rightEndImageBox) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (
    mouseX >= rightEndImageBox.x &&
    mouseX <= rightEndImageBox.x + rightEndImageBox.width &&
    mouseY >= rightEndImageBox.y &&
    mouseY <= rightEndImageBox.y + rightEndImageBox.height
  ) {
    window.open(rightEndLink, "_blank"); 
  }
});