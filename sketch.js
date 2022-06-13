
var maxNumPowers = 3, powersCollected = 0;
var maxFirePoints = 4, pointsCollected = 0;
var maxWaterPoints = 4, points = 0;
var gameState="start";
var onPlatform = false;
var form, database, maxId = 0;

//moving platform only if some player steps on button2 or 3 then only it platform will stop at button
//write if function for game win 
// if you collect all the points it will be 3 stars
//create the form with name  box play button and instructions to play reset button
//update the score in the database by adding up the stars
//button for leader board show top 5 scorers

function preload() {
  trollImg = loadImage("images/rpgcharacter_18.png");
  beamImg = loadImage("images/gameplayobject_arrow_02.png");
  powerPadImg = loadImage("images/powerupBlue_bolt.png");
  watergirlImg = loadImage("images/gameplayadventure_04.png");
  exitImg = loadImage("images/exit.png");
  fireImg = loadImage("images/fire.jpeg");
  brickImg = loadImage("images/BrickWall.jpeg")

}

function setup() {
  createCanvas(1400,740);
  database = firebase.database();
  //BS3
  playersRef = database.ref("players");
  playersRef.once("value",(data) => { maxId = data.numChildren() +1; })

  troll=createSprite(1360,230,10,10);
  troll.addImage(trollImg);
  troll.scale = 0.3;
  
  beam = createSprite(108,185); 
  beam.addImage(beamImg)
  beam.scale = 0.1;
  beam.visible = false;
  
  watergirl=createSprite(100,690);
  
  watergirl.addImage(watergirlImg);
  watergirl.scale = 0.10; 
  
  fireboy=createSprite(90,590);
 
  fireboy.addImage(fireImg); 
  fireboy.scale = 0.15;
//BS debug
  watergirl.x=420
  watergirl.y=477;
  fireboy.x=420
  fireboy.y=477;
  

b1 = createSprite(700,30,1370,10);
b1.shapeColor = "white" // top

b2 = createSprite(20,375,10,700);
b2.shapeColor = "white" //left

floor = createSprite(700,720,1370,10);
floor.shapeColor = "white" //bottom

b4 = createSprite(1390,375,10,700);
b4.shapeColor = "white" // right

b5 = createSprite(710,500,1370,10);
b5.shapeColor = "white"

b6 = createSprite(890,300,1000,10);
b6.shapeColor = "white"

b7 = createSprite(120,300,200,10)
b7.shapeColor = "white"

b8 = createSprite(90,620,150,10);
b8.shapeColor = "white"

b9 = createSprite(1250,170,270,10);
b9.shapeColor = "darkRed"



invisibleWall = createSprite(1000,170,20,240);
invisibleWall.shapeColor = "black"
invisibleWall.visible = false; //BS



lava  = createSprite(500,720,100,20);
lava.shapeColor = "DarkOrange"

water = createSprite(700,720,100,20);
water.shapeColor = "darkBlue"

toxic = createSprite(900,500,100,20);
toxic.shapeColor = "darkRed"



gate1 = createSprite(700,400,70,210);
gate1.shapeColor = "lime"

firegate = createSprite(1240,115,70,100);
firegate.shapeColor = "darkOrange"

watergate = createSprite(1340,115,70,100);
watergate.shapeColor = "blue"


 
f1 = createSprite(500,670,20,20);
f1.shapeColor = "darkOrange"

f2 = createSprite(800,430,20,20);
f2.shapeColor = "darkOrange"

f3 = createSprite(900,240,20,20);
f3.shapeColor = "darkOrange"

f4 = createSprite(200,240,20,20);
f4.shapeColor = "darkOrange"




w1 = createSprite(700,670,20,20);
w1.shapeColor = "darkBlue"

w2 = createSprite(1000,420,20,20);
w2.shapeColor = "darkBlue"

w3 = createSprite(700,240,20,20);
w3.shapeColor = "darkBlue"

w4 = createSprite(300,430,20,20);   
w4.shapeColor = "darkBlue"




BoxP1 = createSprite(1295,650,200,130);
BoxP1.shapeColor = "white"

BoxTp = createSprite(1290,580,190,10);
BoxTp.shapeColor = "purple"



button1 = createSprite(300,705,40,20);
button1.shapeColor = "lime"

button2 = createSprite(500,485,40,20);
button2.shapeColor = "cyan"

button3 = createSprite(500,285,40,20);
button3.shapeColor = "cyan"

// at the start, moving platform is always moving between b1 and b5
// when watergirl/fireboy touch button2, it stops as long as they r touching
// when it is stopped, it is easier to jump, so either one of can jump and touch the button3 to allow
// the first char to jump

movingPlatform  = createSprite(300,300,180,20); //bs
movingPlatform.shapeColor ="Cyan";
//BS movingPlatform.velocityY = -7;
movingPlatform.velocityX = 0;

platform2  = createSprite(300,300,180,10); //bs
platform2.shapeColor = "white"
platform2.rotationSpeed = 5


firePower = createSprite(1160,690,50,50);
firePower.shapeColor = "yellow"
toggleVisibility(false);
form = new Form();
}

function draw() {

  background("black")
   if(gameState==="start"){
  
   
   
    form.display();
    
    
  }
  else if(gameState==="play"){
    toggleVisibility(true)
    form.hide()
    watergirl.setVelocity(0,0);
    fireboy.setVelocity(0,0);
    if (troll.velocityX == 0 && troll.velocityY == 0) troll.setVelocity(-5,0) //BS
    
    drawSprites();
    textSize(20);
    fill("blue")
    text("Total:",900,100);
    textSize(20);
    fill("orange")
    text(points,950,100)

    //troll.bounceOff(invisibleWall); BS
    watergirl.collide(floor);
    watergirl.collide(b1);
    watergirl.collide(b2);
    watergirl.collide(b9);
    watergirl.collide(b4);
    watergirl.collide(b5);
    watergirl.collide(b6);
    watergirl.collide(b7);
    watergirl.collide(b8);
    watergirl.collide(BoxP1);
    watergirl.collide(platform2); //bs 
    
    fireboy.collide(floor);
    fireboy.collide(b1)
    fireboy.collide(b2)
    fireboy.collide(b9)
    fireboy.collide(b4)
    fireboy.collide(b5)
    fireboy.collide(b6)
    fireboy.collide(b7)
    fireboy.collide(b8)
    fireboy.collide(BoxP1);
    fireboy.collide(platform2); //bs
    
/* BS
    troll .bounceOff(b4)
    troll.bounceOff(b5)
    troll.bounceOff(b6)
    troll.bounceOff(b7)
    troll.bounceOff(b8)
    
*/
    if (gate1.visible){
          watergirl.bounceOff(gate1)
          fireboy.bounceOff(gate1);
    }
    
    if (keyDown("UP_ARROW")) {
        watergirl.velocityY = -6  }
    if (keyDown("LEFT_ARROW")) {
      watergirl.setVelocity(-6,0);
    }
    if (keyDown("RIGHT_ARROW")) {
      watergirl.setVelocity(6,0);
    }
    if(keyDown("DOWN_ARROW")){
      watergirl.setVelocity(0,6)
    }

    if(keyDown("w")){
      fireboy.setVelocity(0,-6);
    }
    if(keyDown("a")){
      fireboy.setVelocity(-6,0)
    }
    if(keyDown("d")){
      fireboy.setVelocity(6,0) 
    }
    if(keyDown("s")){
      fireboy.setVelocity(0,6)
    }
  //  if (!onPlatform) {
      fireboy.velocityY +=1.5;
  // }
      watergirl.velocityY += 1.5;

    if (watergirl.isTouching(button1)||fireboy.isTouching(button1)){
      gate1.destroy();
    }   
    if (watergirl.isTouching(lava) || watergirl.isTouching(toxic) ||watergirl.isTouching(troll)){   
        watergirl.x = 100;
        watergirl.y = 690;
    }
    if(fireboy.isTouching(toxic)||fireboy.isTouching(water)||fireboy.isTouching(troll)){
      fireboy.x = 90  
      fireboy.y = 590 
    }
    if (fireboy.isTouching(BoxTp)){
      fireboy.x = 1284
      fireboy.y = 476
    }
    text(mouseX+","+mouseY,mouseX,mouseY)
    if (watergirl.isTouching(BoxTp)){
      watergirl.x = 1284
      watergirl.y = 476
    }
    movingPlatform.bounceOff(b1);
    movingPlatform.collide(b5); //bs
  
    if(fireboy.isTouching(button2)||watergirl.isTouching(button2)||fireboy.isTouching(button3)||watergirl.isTouching(button3)){
      if (!fireboy.isTouching(movingPlatform) && !watergirl.isTouching(movingPlatform))
          movingPlatform.velocityY = 0
    }
    else {// BS
      if (movingPlatform.velocityY == 0){
        movingPlatform.velocityY = -7;
      }
    }
    platform2.rotationSpeed = 5;
    //BS
    if (fireboy.isTouching(movingPlatform) && movingPlatform.velocityY == 0){
       movingPlatform.velocityY = -3
       fireboy.setVelocity(0,-7);
       platform2.rotation = 90;
       platform2.rotationSpeed = 0;
       //onPlatform = true
    }
    else if (fireboy.isTouching(movingPlatform) && !(watergirl.isTouching(button2) ||watergirl.isTouching(button3))) { 
      fireboy.x = 90; fireboy.y = 590; 
    }

    if (watergirl.isTouching(movingPlatform) && movingPlatform.velocityY == 0){
      movingPlatform.velocityY = -5
      watergirl.setVelocity(0,-7)
    }
    else if (watergirl.isTouching(movingPlatform) && !(fireboy.isTouching(button2) ||fireboy.isTouching(button3))) { 
      watergirl.x = 100; watergirl.y = 690; 
    }

    
    if (watergirl.isTouching(firePower)||fireboy.isTouching(firePower)){
      firePower.destroy();
      powersCollected++;
    }

    if (troll.isTouching(invisibleWall)){ //BS
      //troll.rotation = 90
      troll.x +=10
      troll.velocityY = -7;
      troll.velocityX = 0;
    }
    
    if(troll.isTouching(b1)){
      troll.velocityY = 7
      troll.velocityX = 0;
    }
    
    if(troll.isTouching(b6)){
      troll.velocityX = 7
      troll.y -=10;
      troll.velocityY = 0;
    }
    if(troll.isTouching(b4)){
      troll.velocityY = 0
      troll.velocityX = -7;
      troll.x -=10
    }
    
    watergirl.collide(w1,calculatePoints)
    watergirl.collide(w2,calculatePoints)
    watergirl.collide(w3,calculatePoints)
    watergirl.collide(w4,calculatePoints)
   

    fireboy.collide(f1,calculatePoints)
    fireboy.collide(f2,calculatePoints)
    fireboy.collide(f3,calculatePoints)
    fireboy.collide(f4,calculatePoints)
    



    if (keyDown("f") && powersCollected> 0){
      beam.x = watergirl.x + 10;
      beam.y = watergirl.y;
      beam.x = fireboy.x
      beam.y = fireboy.y
      beam.visible = true;
      beam.velocityX = 5;
      powersCollected--;
    }
    
    if (beam.isTouching(troll)){ //BS 
      troll.destroy();
      beam.destroy();
    
    }
    if (beam.velocityX!==0 && beam.isTouching(b2)){
      beam.destroy();    
    }
    if (watergirl.isTouching(watergate)&&fireboy.isTouching(firegate)){
      gameState = "end";
    }
    console.log(fireboy.velocityY)
  }
  else{
    fill("white");
    textAlign(CENTER, CENTER) //bs
    text("YOU WIN!CLICK ON THE LEADERBOARD TO SEE YOUR POSITION OR PRESS RETRY. ", 700,300 ) //bs
    //BS3 update current players score and  get the leaderboard data
    var playerIndex = "players/player" + maxId; 
    database.ref(playerIndex).update({ score:points })
    playersRef.orderByChild("score").limitToLast(2).on("value",(data) => { 
      allPlayers = data.val();
      console.log("Leader Board")
      console.log(allPlayers);
    });
    //leaderboard.visible = true;
    //retryButton.visible = true;
  }
  
}

function calculatePoints(char,pointSprite){
points++;
pointSprite.destroy();

}

function toggleVisibility(flag){
  watergirl.visible = flag;
  troll.visible = flag;
  gate1.visible = flag;
  button1.visible = flag;
  beam.visible = flag;
 // powerPad.visible = flag;
//  exit.visible = flag;
 // lava.visible = flag;
 // lava2.visible = flag;
 // lava3.visible = flag;
  b1.visible = flag;   
  b2.visible = flag;  
 // b3.visible = flag;
  //write till b9
  fireboy.visible = flag;
 b4.visible = flag
 b5.visible = flag
 b6.visible = flag
 b7.visible = flag
 b8.visible = flag
 b9.visible = flag
 BoxP1.visible = flag
 BoxTp.visible = flag
}