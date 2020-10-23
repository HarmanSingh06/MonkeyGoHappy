var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var time;
var ground;

function preload(){

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(500,400)
  
  //Score And Time
  score=0;
  time=0;
  
  //Monkey
  monkey = createSprite(40,100);
  monkey.addAnimation("Monkey Animation", monkey_running);
  monkey.scale=0.1;
  monkey.setCollider("circle",0,100,180)
  monkey.debug=false;
  
  ground = createSprite(200,370,1000,20);
  ground.x=ground.width/2
  ground.velocityX =-(4+time/4);
  
  //Groups
  obstacleGroup = new Group();
  bananaGroup = new Group();
}


function draw() {
  background(220);
  
  //GameState PLAY
  if(gameState===PLAY){
    
    //Increasing Time
    if(frameCount%30===0){
      time=time+1;
    }
    //Increasing Score
    if(bananaGroup.isTouching(monkey)){
       score = score+1;
       bananaGroup.destroyEach(); 
    }
    //Monkey Functions
    monkey.collide(ground)
    monkey.velocityY = monkey.velocityY + 0.8;
    if(keyDown("space") && monkey.y >= 308) {
      monkey.velocityY = -12;
      }
    //Ground Function
    if(ground.x<0){
      ground.x = ground.width/2
    }
  
    //Making Banana And Obstacles
    spawnObstacles();
    spawnBanana();
    
    //Setting Game State To END
    if(obstacleGroup.isTouching(monkey)){
      gameState=END
    }
  }
  if(gameState===END){
          monkey.destroy();
          obstacleGroup.destroyEach();
          ground.destroy();
          bananaGroup.destroyEach();
      textSize=10;
      text("GAME OVER!!!!", 200,200);
  }
  console.log(gameState);
  console.log(ground.velocityX);
  //Displaying Score and Time
     text("Score: "+score, 440,30)
     text("Time: "+time, 440,50)
   
  drawSprites();
}
function spawnObstacles(){
  if(frameCount%100 === 0){
    var obstacle = createSprite(200,343)
    obstacle.x = Math.round(random(400,600))
    obstacle.addImage("Image Of Obstacle", obstacleImage)
    obstacle.scale=0.1;
    obstacle.velocityX=-(4+time/4);
    obstacle.lifetime=400;
    obstacleGroup.add(obstacle);
     }
}
function spawnBanana(){
  if(frameCount%130===0){
    var banana = createSprite(0,200);
      banana.x=Math.round(random(450,800));
      banana.velocityX=-(4+time/4);
      banana.addImage("Image Of Banana", bananaImage);
      banana.scale=0.13;  
      banana.lifetime=400;
      bananaGroup.add(banana);
  }
}




