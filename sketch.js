var gap=0
var num=30
const PLAY = 1;
const END = 0;
const START = 2
var gameState = START;
var player,playerImage;
var ground;
var platform1,platform2,platform3,platform4,platform5,platform6;

var platformGroup,newPlatformGroup;
var p, pImage, breakImage;

var bg, bgImage;


var score=0;
var jumpSound , checkPointSound, dieSound;
var gameOver, restart;


function preload(){
  
  playerImage=loadImage("jack2.png");
  pImage = loadImage("p1.png");
  bgImage = loadImage("bg.png");
  
  breakImage = loadImage("brokenPlatform.png");
  platform1 = loadImage("platform1.png");
  platform2 = loadImage("platform2.png");
  platform3 = loadImage("platform3.png");
  platform4 = loadImage("platform4.png");
  platform5 = loadImage("platform5.png");
  platform6 = loadImage("platform6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(500, 600);

  player = createSprite(250,300,20,50);
  
  player.addImage(playerImage);
  player.scale = 0.9;
  player.depth=10000;
  
  p = createSprite(250,350);
  p.addImage(pImage);
  p.scale=0.1;
  
  gameOver = createSprite(250,250);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(250,300);
  restart.addImage(restartImg);
  
  gameOver.visible = false;
  restart.visible = false;
  platformGroup = new Group();
  newPlatformGroup = new Group();
  
  score = 0;
}

function draw() {
  //player.debug = true;
  background(bgImage);

    spawnplatforms();
    if(keyDown("up")) {
      p.y=700;
      player.velocityY = -16;
      jumpSound.play();
    }

    
    player.collide(p)

    // to restart the game frameCount can not be reset, so using frameRate
    score = score + Math.round(getFrameRate()/60)
  
    // //jump when the player touches the platform
    if(platformGroup.isTouching(player) && player.velocityY>5) {
      player.velocityY = -16;
      jumpSound.play();   
    }
    
 
    if(keyDown("left"))
      {
        player.x-=7
      }
    
    if(keyDown("right"))
      {
        player.x+=7
      }
   
    //add gravity
    player.velocityY = player.velocityY + 0.8;
     
  drawSprites();
  textSize(20);
  fill(255);
  text(" Score  :  " + score, 350,50);
}



function spawnplatforms() {

  if(frameCount % 40 == 0) {
    xx=Math.round(random(50,450))
    var platform = createSprite(xx,-10,150,20);
    platform.velocityY = 4;

    var r = Math.round(random(1,5))
    switch(r){
      case 1 : platform.addImage(platform1);
      break;
      case 2 : platform.addImage(platform2);
      break;
      case 3 : platform.addImage(platform3);
      break;
      case 4 : platform.addImage(platform4);
      break;
      case 5 : platform.addImage(platform5);
      break;
      default: break;
    }
 
    //assign scale and lifetime to the platform           
    platform.scale = 0.05;

    platform.lifetime = 200;
    
    //add each platform to the group
    platformGroup.add(platform);
   
  }

}

