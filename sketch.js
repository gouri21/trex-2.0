
var PLAY = 1;
END = 0; 
GAMEstate = PLAY; 
var GAMEOVER,RESTART, gameoverIMAGE, restartIMAGE;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var clouds, obstacle ,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6, cloudGroup, obstacleGroup, cloudImage ;

var score;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage ("obstacle2.png");
  obstacle3 = loadImage ("obstacle3.png");
  obstacle4 = loadImage ("obstacle4.png");
  obstacle5 = loadImage ("obstacle5.png");
  obstacle6 = loadImage ("obstacle6.png");
  
  gameoverIMAGE = loadImage("gameOver.png");
  restartImage = loadImage("restart.png"); 
  
}

function setup() {
  createCanvas(600, 200);
  score = 0;
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation ("collided",trex_collided);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
   GAMEOVER = createSprite(300,100);
 RESTART = createSprite(300,140);
GAMEOVER.addImage(gameoverIMAGE);
GAMEOVER.scale = 0.5;
RESTART.addImage(restartImage);
RESTART.scale = 0.5;

GAMEOVER.visible = false;
RESTART.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstacleGroup = new Group();
  cloudGroup = new Group();
  
  
}

function draw() {
  background(180);
  text ("score"+ score,500,50);
      if(GAMEstate === PLAY){
  score = score + Math.round(getFrameRate()/60);
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
        if(ground.x<0){
          ground.x = ground.width/2;
        }
  spawnObstacles();
  spawnClouds();
  trex.velocityY = trex.velocityY+0.8;
        trex.collide(invisibleGround);
    if(obstacleGroup.isTouching(trex)){
      //playSound("jump.mp3");
      GAMEstate = END;
      //playSound("die.mp3");
    }
      }
  
  
  else if(GAMEstate === END) {
    GAMEOVER.visible = true;
    RESTART.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
    
  }

  if(mousePressedOver(RESTART)) {
    reset();
  }

  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
}
 
  
  


function reset(){
  GAMEstate = PLAY;
  
  GAMEOVER.visible = false;
  RESTART.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}

 

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     clouds = createSprite(600,120,40,10);
    clouds.y = Math.round(random(55,160)); 
    clouds.addImage (cloudImage);
    clouds.scale = 0.5;
    clouds.velocityX = -4;
    
     //assign lifetime to the variable
    clouds.lifetime = 280;
    cloudGroup.add(clouds);
    //adjust the depth
    clouds.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
  
    //generate random obstacles
    var rand = Math.round(random(1,6));
    //obstacle.setAnimation("obstacle" + rand);
    switch(rand){ 
      case 1: obstacle.addImage(obstacle1);
      break;
      case 2 : obstacle.addImage(obstacle2);
      break;
      case 3 : obstacle.addImage(obstacle3);
      break;
      case 4 : obstacle.addImage(obstacle4);
      break;
      case 5 : obstacle.addImage(obstacle5);
      break;
      case 6 : obstacle.addImage(obstacle6);
      break;
      default: break;
    }
      
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}