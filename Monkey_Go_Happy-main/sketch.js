var backImage,backgr;
var player, player_running,player1
var ground,ground_img; 
var obstaclesGroup
var FoodGroup
var obstacle1
var bananaImage

var gameOver,gameOver1

var END =0;
var PLAY =1;
var gameState = PLAY;
var score =0

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  obstacle1 = loadImage("stone.png")
  bananaImage = loadImage("banana.png")
  gameOver1 = loadImage("gameOver.png")
}
function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,200)
  gameOver.visible=false

  obstaclesGroup = createGroup()
  FoodGroup = createGroup()
  score =0
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){

    if(player.isTouching(FoodGroup)){
      score=score+10
    }
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space")&& player.y >=280 ) {
      player.velocityY = -15;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    
    if(obstaclesGroup.isTouching(player)){
      player.scale=0.1
      obstaclesGroup.destroyEach()

      score=0

      if(score<=0){
        gameState=END
      }
    }
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach()
    }
    ran=Math.round(random(1,60))
  switch(score){
    case 10:player.scale=0.11
      break;
    case 20:player.scale=0.12
      break;
    case 30:player.scale=0.13
      break;
    case 40:player.scale=0.14
      break;
    case 50:player.scale=0.15
      break;
    case 60:player.scale=0.16
      break;
      default:break;
    
  }

  }

  else if (gameState === END) {
     
    ground.velocityX = 0;
     player.velocityY = 0
    backgr.velocityX=0
   
   obstaclesGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
    
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);  

    gameOver.visible=true
    gameOver.addImage(gameOver1)
  
  }
  spawnObstacles()
  spawnFood()
  drawSprites();
  stroke("write")
  textSize(15)
  fill("write")
  text("Score: "+ score, 500,15);
}      
function spawnObstacles(){
  if (frameCount % 300 === 0){
    var obstacle2 = createSprite(850,165,10,40);
     obstacle2.velocityX = -(6 + score/100);
     obstacle2.y = Math.round(random(330,290));
     obstacle2.addImage(obstacle1);
     obstacle2.scale = 0.09;
     obstacle2.lifetime = 300;
     
   obstaclesGroup.add(obstacle2);
  }
 }
 function spawnFood() {
   if (frameCount % 150 === 0){
     var banana = createSprite(850,250,40,10)
     banana.y=random(340,260)
     banana.addImage(bananaImage)
     banana.scale=0.05
     banana.velocityX=-5
     banana.lifetime = 300

     player.depth = banana.depth +1
     FoodGroup.add(banana)

   }
 }