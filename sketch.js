var ground,groundImg;
var player ,playerImg;
var obstacle, obstacle1,obstacle2,obstace3,bmwGroup,obstacleGroup,carGroup,bmw;
var gameState="play";
var score = 0;
var life,lifeImage,lifeGroup;
var sound;
var reload,reloadImage;

function preload(){
groundImg = loadImage("city1.jpg");
playerImg=loadImage("bugatti.png");
reloadImage=loadImage("wheel.png");
obstacle1=loadImage("petroeum.png");
obstacle2 =loadImage("ferrari.png");
obstacle3 =loadImage("bmw.png");
lifeImage =loadImage("fuel.png")
}
function setup() {
  createCanvas(1000,500);
  
  ground = createSprite(100,200,100,80);
  ground.addImage(groundImg);
  ground.scale=5;
  ground.x = ground.width /2;
  player = createSprite(200, 200);
  player.addImage(playerImg);
  player.scale=1.7;

  reload = createSprite(900,100);
  reload.addImage(reloadImage);
  reload.scale=0.5;
  reload.visible=false;

  obstacleGroup = new Group();
  carGroup = new Group();
  lifeGroup = new Group();
  bmwGroup = new Group();
  lifeGroup =new Group();
}

function draw() {
  background(255,255,255);  
  if(gameState=="play"){
    if (ground.x < 50){
        ground.x = ground.width/2;
      }
    }
    ground.velocityX=-(3 + score/50);

    if(keyDown(UP_ARROW))
  {
    player.y=player.y-4;
  }
  if(keyDown(DOWN_ARROW))
  {
    player.y=player.y+4;
  }
  if(keyDown(RIGHT_ARROW))
  {
    player.x=player.x+4;
  }
  if(keyDown(LEFT_ARROW))
  {
    player.x=player.x-4;
  }

  if(lifeGroup.isTouching(player)){
    lifeGroup.destroyEach();
    score =score+10;}

    if(carGroup.isTouching(player) ||   obstacleGroup.isTouching(player))
{
  gameState = "end";
  ground.x=0;
  player.visible=false;
  reload.visible=true;
}
obstacleGroup.collide(bmwGroup);
  carGroup.collide(obstacleGroup);
  bmwGroup.collide(carGroup);
  carGroup.collide(bmwGroup);
  lifeGroup.collide(bmwGroup);
  lifeGroup.collide(carGroup);
  lifeGroup.collide(obstacleGroup);


spwanlife();
spawnobstacle();
drawSprites();
stroke("red");
fill("red");
textSize(25);
text("life ="+score,400,50);

if(gameState==="end"){
  stroke("yellow");
  fill("yellow");
  textSize(50);
  text("Game Over",10,200);
   obstacleGroup.setLifetimeEach(-1);
  carGroup.setLifetimeEach(-1);
  lifeGroup.setLifetimeEach(-1);
  bmwGroup.setLifetimeEach(-1);
   obstacleGroup.setVelocityXEach(0);
   lifeGroup.setVelocityXEach(0);
   carGroup.setVelocityXEach(0);
   bmwGroup.setVelocityXEach(0);
  }
if(mousePressedOver(reload)) {
   
  reset();
  }
}
function spawnobstacle(){
  if(frameCount % 250 === 0) {
   var obstacle = createSprite(800,165,10,40);
    obstacle.addImage(obstacle1);
    obstacle.scale=1.0;
     obstacle.velocityX = -(6 + score/50);
     obstacle.y = Math.round(random(190,550));
    obstacle.lifetime = 300;
    var car = createSprite(800,165,10,40);
    car.addImage(obstacle2);
    car.scale=1.5;
    car.velocityX = -(6 + score/50);
    car.y = Math.round(random(190,550));
    car.lifetime = 300;
    var bmw = createSprite(800,165,10,40);
     bmw.addImage(obstacle3);
     bmw.scale=1.5;
     bmw.velocityX = -(6 + score/50);
     bmw.lifetime = 300;
    bmw.y = Math.round(random(200,550));
   
    bmw.depth = car.depth;
    bmw.depth = bmw.depth+0.5;
    bmw.depth = obstacle.depth;
    bmw.depth = bmw.depth+0.5;
     obstacle.depth = car.depth;
    obstacle.depth = obstacle.depth+0.5;
   //add each obstacle to the group
   obstacleGroup.add(obstacle);
    carGroup.add(car);
  bmwGroup.add(bmw);
 }
}
function spwanlife(){
  if(frameCount%50===0){
    life = createSprite(800,152);
    life.addImage(lifeImage);
    life.velocityX=-6;
    life.scale=0.2;
    life.y = Math.round(random(200,550));
  
  lifeGroup.add(life);
  }
  
}

function reset(){
  gameState="play";
 reload.visible=false;
 player.visible=true;
  score =0;
   carGroup.destroyEach();
  bmwGroup.destroyEach();
  obstacleGroup.destroyEach();
  lifeGroup.destroyEach();
}
