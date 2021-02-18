var ground, mario, bg, marioRuning;
var obstacles, obstaclesImage, obstaclesgroup;
var gameState = "play";


function preload() {
  bg = loadImage("bg.png");
  marioRuning = loadAnimation("mario00.png", "mario01.png", "mario02.png", "mario03.png");
  obstaclesImage = loadAnimation("obstacle1.png", "obstacle2.png", "obstacle3.png",
    "obstacle4.png")

}
function setup() {
  createCanvas(1000, 600);
  ground = createSprite(500, 535, 2000, 50);
  ground.velocityX = -3;
  ground.visible = false;

  mario = createSprite(50, 515, 65, 35);
  mario.addAnimation("running", marioRuning); 5
  mario.scale = 2;
  mario.debug = true;

  obstaclesgroup = new Group()
}

function draw() {
  background(bg);

  if (gameState === "play") {
    if (ground.x < 0) {
      ground.x = 500;
    }
    if (keyDown("space") && mario.y >= 100) {
      mario.velocityY = -12;
    }

    mario.velocityY = mario.velocityY + 0.9;

    mario.collide(ground);
    spawnObstacles()
    if (obstaclesgroup.isTouching(mario)) {
      gameState = "end";
    }
  }
  else if (gameState === "end") {
    ground.velocityX = 0;
    mario.velocityY = 0;
    obstaclesgroup.setVelocityXEach(0);
  }
  drawSprites()
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    obstacles = createSprite(1000, 480, 10, 40);
    obstacles.velocityX = -5;
    obstacles.addAnimation("obstacle", obstaclesImage)
    obstaclesgroup.add(obstacles);
  }
}
