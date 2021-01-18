var bg1,bg2;
var bgimg1,bgimg2;
var shooter,shooterImg;
var invisibleground
var ob1,ob2,ob3,ob4,ob5,ob6,ob8,ob7;
var obstacle,obstaclesgroup
var obstacle1,obstaclesgroup1
var bulletImage,bullet
var START=1
var PLAY=2
var END=0
var gameState=START
var bulletgroup;
var score=0;
var bullets=50;
var lives=5
var heartImg
var jumpsound,shootsound,diesound
var restart,gameover
var restartImg,gameoverimg


function preload(){
  bgimg1=loadImage("sprites/GB-3.png")
  bgimg2=loadImage("sprites/city background.jpg")
  shooterImg=loadAnimation("sprites/10.png","sprites/20.png","sprites/30.png","sprites/40.png","sprites/50.png","sprites/60.png")
  ob1=loadAnimation("sprites/456.png","sprites/123.png","sprites/234.png","sprites/345.png","sprites/678.png")
  ob2=loadImage("sprites/102.png")
  ob3=loadImage("sprites/103.png")
  ob4=loadImage("sprites/104.png")
  ob5=loadImage("sprites/ob1.png")
  ob6=loadImage("sprites/ob2.png")
  ob7=loadImage("sprites/ob3.png")
  ob8=loadImage("sprites/ob4.png")
  bulletImage=loadImage("sprites/bullet.png")
  heartImg=loadImage("sprites/Heart.png")
  jumpsound=loadSound("sprites/jump.mp3")
  shootsound=loadSound("sprites/shoot.mp3")
  diesound=loadSound("sprites/die.wav")
  restartimg=loadImage("sprites/restart.png")
  gameoverimg=loadImage("sprites/gameover.png")
  

}


function setup() {
  createCanvas(1400,700);
  input=createInput("")
  input.position(700,200)
  title=createElement("h2");
  title.html("Shooter Game")
  title.position(700,20)
  button=createButton("Start")
  button.position(700,230)
  
  bg1=createSprite(700,200 , 1400,1165);
  bg1.addImage(bgimg1)
   bg1.scale=1

   gameover=createSprite(700,200)
   gameover.addImage("gameisover",gameoverimg )
   gameover.scale=1
   
   restart=createSprite(700,250)
   restart.addImage("restart",restartimg)
   restart.scale=1
 
  shooter=createSprite(200,500,100,100)
  shooter.addAnimation("shooter",shooterImg)
  invisibleground=createSprite(700,600,1400,20)
  invisibleground.visible=false;
  obstaclesgroup = createGroup();
  obstaclesgroup1=createGroup();
  bulletgroup=createGroup();
  
}

function draw() {
  background(255,255,255);  
  if(gameState===START){
  background("White")
  bg1.visible=false
  shooter.visible=false
 
    textSize(30);
    fill("Black")
    text("Score for the circle obstacles:20",700,300)
    text("Score for the hanging obstacles:30",700,350)
    gameover.visible=false
    restart.visible=false
 //image(bgimg2,0,0)
    button.mousePressed(()=>{
   input.hide();
   button.hide();
   gameState=PLAY
   touches=[]
    })
 
  }
  drawSprites();
  if(gameState===PLAY){
  bg1.visible=true
  shooter.visible=true
  gameover.visible=false
  restart.visible=false
  bg1.velocityX=-10
  if(bg1.x<600){
    bg1.x=900
  }

  //shooter.debug=true;
  shooter.setCollider("rectangle",0,0,70,200)
  if((touches.length>0 || keyDown("space"))&&shooter.y>=250){
    shooter.velocityY=-10
    touches=[]
  }

  if(keyDown("UP_ARROW")){
    if(frameCount%30===0){
    bullet=createSprite(shooter.x+60,shooter.y-30)
    bullet.addImage(bulletImage)
    bullet.velocityX=10
    bulletgroup.add(bullet)
    bullets=bullets-1
    shootsound.play()
    }
  }

  for(var i=0;i<obstaclesgroup1.length;i++){
    if(bulletgroup.isTouching(obstaclesgroup1)){
      obstaclesgroup1.get(i).destroy(i) 
      bulletgroup.get(i).destroy(i)
      score=score+20
     // bullets=bullets-1
    }
  }
  for(var i=0;i<obstaclesgroup.length;i++){
    if(bulletgroup.isTouching(obstaclesgroup)){
      obstaclesgroup.get(i).destroy(i) 
      bulletgroup.get(i).destroy(i)
      score=score+30
     // bullets=bullets-1
    }
  }
  /*if(bulletgroup.isTouching(obstaclesgroup)||bulletgroup.isTouching(obstaclesgroup1)){
       obstaclesgroup1.destroyEach()
       obstaclesgroup.destroyEach()
       bulletgroup.destroyEach()
  }
*/

  /*if(){
       obstaclesgroup1.destroyEach()
  }*/

  shooter.velocityY=shooter.velocityY+1    
  shooter.collide(invisibleground)      
  spawnObstacles();
  spawnObstacles1();
  for(var j=0;j<obstaclesgroup.length;j++){
    if(shooter.isTouching(obstaclesgroup)){
      obstaclesgroup.get(j).destroy(j) 
      lives=lives-1
      diesound.play()
     // bullets=bullets-1
    }
  }
  for(var k=0;k<obstaclesgroup1.length;k++){
    if(shooter.isTouching(obstaclesgroup1)){
      obstaclesgroup1.get(k).destroy(k) 
      lives=lives-1
      diesound.play()
     // bullets=bullets-1
    }
  }
  if(lives===0){
    gameState=END
  }
  /*if(shooter.isTouching(obstaclesgroup)||shooter.isTouching(obstaclesgroup1)){
    lives=lives-1
   
  }*/
 // drawSprites();
  textSize(50)
  text("Score = "+score,100,100)
  text(":"+bullets,500,100)
 image(bulletImage,475,70,25,25)
  text(":"+lives,620,100)
  image(heartImg,585,70,30,30)

}
else if(gameState===END){
  bg1.velocityX=0
  obstaclesgroup1.setVelocityXEach(0)
  obstaclesgroup.setVelocityXEach(0)
  shooter.collide(invisibleground)   
  shooter.velocityY=0
  gameover.visible=true
  restart.visible=true
  if(touches.length>0){
    reset();
    touches=[]
    }
 // drawSprites();
  textSize(50)
  text("Score = "+score,100,100)
  text(":"+bullets,500,100)
 image(bulletImage,475,70,25,25)
  text(":"+lives,620,100)
  image(heartImg,585,70,30,30)

}
   

  
}

function spawnObstacles1() {
  if(frameCount % 100 === 0) {
     obstacle1 = createSprite(1400,450,10,40);
    obstacle1.velocityX = -6
    obstacle1.addAnimation("ob1",ob1)
    //obstacle1.debug=true;
                         
    obstaclesgroup1.add(obstacle1)
    
    //assign scale and lifetime to the obstacle           
    obstacle1.scale = 0.5;
   // obstacle.lifetime = 200;
  }
}
function spawnObstacles() {
  if(frameCount % 200=== 0) {
     obstacle = createSprite(1400,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand =Math.round(random(1,3));
    switch(rand){
      case 1:obstacle.addImage(ob2);
      break;
      case 2:obstacle.addImage(ob3);
      break;
      case 3:obstacle.addImage(ob4);
      break;
      default:break;
    }                     
   // obstacle.debug=true;
    obstaclesgroup.add(obstacle)
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
   // obstacle.lifetime = 200;
  }
}
function reset(){
  score=0;
  bullets=50;
  lives=5
  gameState=PLAY;
  obstaclesgroup.destroyEach()
  obstaclesgroup1.destroyEach()

}
function touchMoved() {
  if(frameCount%30===0){
    bullet=createSprite(shooter.x+60,shooter.y-30)
    bullet.addImage(bulletImage)
    bullet.velocityX=10
    bulletgroup.add(bullet)
    bullets=bullets-1
    shootsound.play()
  }
}