var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var fruitS = 0;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -5;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background('lightblue');
  
  ground.x=ground.width/2;
  monkey.collide(ground);
  
  textSize(17);
  fill('green');
  text('No. of bananas: ' + fruitS,0,20);
  text('Survival Time: ' + survivalTime,260,20);
  
  if(gameState===PLAY){
    //make the monkey jump
    if (keyDown("space") && monkey.y>310){
      monkey.velocityY=-20;
    }
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      fruitS = fruitS+1;
    }

    monkey.velocityY=monkey.velocityY+1;
    food();
    stone();
    
    if(obstacleGroup.isTouching(monkey)){
      obstacleGroup.destroyEach();
      gameState = END;
    }
    
    survivalTime = Math.round(frameCount/frameRate());
  }
  
  if(gameState===END){
    monkey.visible=false;
    
    fill('red');
    textSize(60);
    text('GAME OVER',10,150);
  }

  drawSprites();
}

function food(){
  if(World.frameCount%80===0){
    banana = createSprite(400,200,20,20);
    banana.y = Math.round(random(120,200));
    banana.velocityX = -(5 + fruitS/4);
    banana.addImage(bananaImage);
    banana.scale=0.08;
    banana.lifetime = 100;
    bananaGroup.add(banana);
  }
}

function stone(){
  if(World.frameCount%300===0){
    obstacle = createSprite(400,315);
    obstacle.velocityX = -(5 + fruitS/6);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.lifetime = 100;
    obstacle.setCollider('circle',-3,0,210);
    obstacleGroup.add(obstacle);
  }
}