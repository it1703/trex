var PLAY =1;
var END =0;
var gameState=PLAY ;
var gameover
var restat

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var obstaclesGroup;
var cloud, cloudsGroup, cloudImage;
var gameoverIMG,restatIMG;


var newImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
 obstacle1= loadImage("obstacle1.png");
 obstacle2= loadImage("obstacle2.png");
 obstacle3= loadImage("obstacle3.png");
 obstacle4= loadImage("obstacle4.png");
 obstacle5= loadImage("obstacle5.png");
 obstacle6= loadImage("obstacle6.png");
gameoverIMG=loadImage("gameOver.png");
restatIMG=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  trex.setCollider("circle",0,0,40);
  trex.debug=true
  obstaclesGroup=createGroup();
  cloudsGroup=createGroup();
  gameover=createSprite(300,100);
  gameover.addImage(gameoverIMG);
  restat=createSprite(300,140);
  restat.addImage(restatIMG);
}

function draw() {
  background(180);
  if (gameState ===PLAY){
      
    gameover.visible = false
    restat.visible = false 
    ground.velocityX = -4; 
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space") && trex.y>=100) {
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.8
    spawnClouds();
    spawnObstacles();
    drawSprites();

      if (obstaclesGroup.isTouching(trex)){
   gameState= END
    
  } else if (gameState===END){
    gameover.visible = true
    restat.visible = true
    ground.velocityX=0
    trex.velocityY=0
    obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);
 
 obstaclesGroup.setVelocityXEach(0);
 cloudsGroup.setVelocityXEach(0);
  }
}
  
 
  
  
  
  
  
  trex.collide(invisibleGround);
  
  //aparecer nubes
 
}

function spawnClouds() {
  //escribir aquí el código para aparecer las nubes
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloud.lifetime=200;
    
    cloud.depth=trex.depth;
   trex.depth=trex.depth + 1;
   cloudsGroup.add(cloud);
    }
    
}
function spawnObstacles(){

  if(frameCount % 60 ==0){
    var obstacle =createSprite(600,165,10,40);
  obstacle.velocityX=-4;

  var rand = Math.round(random(1,6));
  switch (rand) {
        case 1:obstacle.addImage(obstacle1);
        break;
        case 2: obstacle.addImage(obstacle2);
        break;
        case 3 :obstacle.addImage(obstacle3);
        break;
        case 4: obstacle.addImage(obstacle4);
        break;
        case 5:obstacle.addImage(obstacle5);
        break;
        case 6:obstacle.addImage(obstacle6);
        break;

    default:break;
    
  }
  obstacle.scale=0.5
  obstacle.lifetime=250
  obstaclesGroup.add(obstacle);
  }
}

