const CONFIG = {
  canvas: {
    width: 600,
    height: 800
  },
  images: {
    backgroundPath: 'Frame 2.png',
    maskedPath: 'Frame 3.png'     
  },
  curve: {
    startYRange: [-20, 0],          
    growthSpeedRange: [1, 3],      
    xDriftOptions: [[-1, 1]],       
    maxLengthRange: [600, 1000],    
    weightRange: [3, 4]              
  },
  generator: {
    spawnInterval: 60,              
    maxCurves: 60                   
  }
};
