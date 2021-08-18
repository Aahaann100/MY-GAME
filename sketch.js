var PLAY=1
var END=0
var gameState=PLAY
var steve, steveImg
var score=0;

var robot, robotImg, robotGroup, robotBGroup, RB, RBimg;
var invisibleGround;

var gun1, gun1Img

var heart1, heart1Img, heart2, heart2Img, heart3, heart3Img;
var bullet, bulletImg, bulletGroup;

var morning, morningImg
var restart, restartImg, Gameover, GameoverImg;
var life=3;

function preload(){

walkingLeft=loadAnimation("Images/s-2.png","Images/s-3.png","Images/s-4.png","Images/s-5.png")
walkingRight = loadAnimation("Images/s-2-mirror.png","Images/s-3-mirror.png","Images/s-4-mirror.png","Images/s-5-mirror.png")
standing = loadAnimation("Images/s-1.png")
morningImg=loadImage("Images/bg.jpg")
running=loadAnimation("r1.png","r2.png","r3.png","r4.png","r5.png","r6.png","r7.png","r8.png","r9.png")
bulletImg=loadImage("Images/bullet.png")
heart1Img=loadImage("Images/heart.png")
heart2Img=loadImage("Images/heart.png")
heart3Img=loadImage("Images/heart.png")
RBimg=loadImage("R-1/Bullet_004.png")
restartImg=loadImage("Images/restart-pls.png")
GameoverImg=loadImage("Images/Gameover.png")

}


function setup(){
  createCanvas(1200,600)



  morning=createSprite(600,300)
  morning.addImage(morningImg)
  morning.scale=2.6
  bulletGroup=createGroup()
  robotGroup=createGroup()
  robotBGroup=createGroup()
  Gameover=createSprite(600,200,20,20)
  Gameover.addImage("over", GameoverImg)
  restart=createSprite(600,400,20,20)
  restart.addImage("restart", restartImg)

  

  
 
 

  heart1=createSprite(100,100,50,50)
  heart1.addImage("heart1", heart1Img)
  heart1.scale=0.3
  heart2=createSprite(200,100,50,50)
  heart2.addImage("heart1", heart2Img)
  heart2.scale=0.3
  heart3=createSprite(300,100,50,50)
  heart3.addImage("heart1", heart3Img)
  heart3.scale=0.3

  invisibleGround=createSprite(600,500,1200,20)
  invisibleGround.visible=false



  steve=createSprite(100,500,50,50)
  steve.addAnimation("walkright",walkingRight)
  steve.addAnimation("walkleft",walkingLeft)
  steve.addAnimation("standing",standing)
  

 
}


function draw(){
 background("white")
 
if(gameState===PLAY){
  
  restart.visible=false
  Gameover.visible=false
  if(keyDown(RIGHT_ARROW)){
    steve.x=steve.x+2
    steve.changeAnimation("walkleft",walkingLeft)
  }
  else if(keyDown(LEFT_ARROW)){
   steve.x=steve.x-2
   steve.changeAnimation("walkright",walkingRight)
 }
 else{
   steve.changeAnimation("standing",standing)
 }
 if(keyDown("space")&& steve.y >380){
  console.log("space is pressed")
 steve.velocityY=-20 
 }

 steve.velocityY=steve.velocityY+0.8


 
 if(mouseWentDown("left")){
 spawnBullets();
 }
 
 
 

 
 console.log(steve.y)

 for(var i=0;i<bulletGroup.length;i++){
    temp_arrow = bulletGroup.get(i); 
    for(var j=0;j<robotGroup.length;j++){ 
      temp_balloon = robotGroup.get(j);
       if(temp_arrow.isTouching(temp_balloon)){ 
         bulletGroup.remove(bulletGroup.get(i)); 
         robotGroup.remove(robotGroup.get(j)); 
         temp_arrow.destroy();
          temp_balloon.destroy();
          score=score+1
           }
          }
          }
         if(steve.isTouching(robotBGroup)){
           robotBGroup.destroyEach();
           
           if(life>0){
            
            switch(life){
              case 1: heart1.visible=false
              gameState=END
              break;
              case 2: heart2.visible=false
              break;
              case 3: heart3.visible=false
              break;
              default:break;
              
              
            }
            

            life=life-1

           }
          
          
         }


         if(steve.isTouching(robotGroup)){
          
          robotGroup.destroyEach();
          if(life>0){
           
           switch(life){
             case 1: heart1.visible=false
             gameState=END
             break;
             case 2: heart2.visible=false
             break;
             case 3: heart3.visible=false
             break;
             default:break;
             
             
           }
           

           life=life-1

          }
         
         
        }



          
          spawnRobots()
          
          
}else if(gameState===END){
  Gameover.visible=true
  restart.visible=true
  steve.velocityY=0
  robotGroup.setVelocityXEach(0)
  bulletGroup.setVelocityXEach(0)
  robotBGroup.setVelocityXEach(0)
  if(mousePressedOver(restart)){
    reset();
  }
}



steve.collide(invisibleGround)

drawSprites();
textSize(30)
text("score "+score,width-150,50)

 


 
 
 
}



  function spawnRobots(){
    if(frameCount%160==0){
      robot=createSprite(1200,400,20,20)
      robot.velocityX=-4
      robot.addAnimation("RUN", running)
      robot.scale=0.3
      robotGroup.add(robot)
      var RB=createSprite(robot.x-100,robot.y)
      RB.velocityX=-10
      RB.addImage("fireMG", RBimg)
      RB.scale=0.5
      robotBGroup.add(RB)
    }
    
  }


function spawnBullets(){
  var bullet=createSprite(steve.x,mouseY)
  bullet.velocityX=10
  bullet.addImage("fire",bulletImg)
  bulletGroup.add(bullet)
  bullet.scale=0.02
  
}
function reset(){
  heart1.visible=true
  heart2.visible=true
  heart3.visible=true

  Gameover.visible=false
  restart.visible=false
  life=3

  gameState=PLAY
}
