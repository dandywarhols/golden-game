const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var bg;
var bird;
var toxin,toxingrp;
var reset;

var play = 1;
var end = 0;
var gamestate = play;
function preload(){
bg1 = loadImage("sprites/city2.jpg");
bg2 = loadImage("sprites/gameover1.jpg")
spider1 = loadImage("sprites/spider2.png");
toxic1 = loadImage("sprites/toxic 1.png")
}
function setup(){
    var canvas = createCanvas(900,900);
    engine = Engine.create();
    world = engine.world;
    
     bg = createSprite(400,450,800,900);
     bg.scale=7;
    bg.addImage(bg1);
    ground = new Ground(600,height,1200,20)

   

    bird = createSprite(400,800,50,50);
    toxingrp = new Group();
    

}

function draw(){
    background("white");
    textSize(50);
    fill("red");
    drawSprites();
   
    if(gamestate === play){
        bg.addImage(bg1);
       bird.display();
        bird.addImage(spider1);
        bird.scale=0.1
        bg.velocityY = 5;

        if(bg.y>900){
        bg.y = 1;
        }
        spawnEnemy();
        keyPresseD();
        var time =Math.round( frameCount/45); 
        text("time "+time, 400,100);
       
        if(bird)
       if(toxingrp.isTouching(bird)){
           gamestate = end;
       }
    }
    if(gamestate === end){
        bg.velocityY = 0;
        bg.addImage(bg2);
        toxingrp.setVelocityYEach(0);
        bird.velocityY = 0;
        bird.velocityX= 0;
        toxingrp.destroyEach();
        bird.destroy();
        text("click ctrl+r to restart",450,100);
    }
   
   
   
}

function spawnEnemy(){
    if(frameCount % 60 ===0){
        toxin = createSprite(400,-50,50,50);
        toxin.addImage(toxic1);
        toxin.scale=0.4;
        toxin.velocityY = 5;
        toxin.x= Math.round(random(100,700))
        toxingrp.add(toxin);
    }
    
}

function keyPresseD(){
    if (keyCode === LEFT_ARROW){
        bird.velocityX = -4
    }
    if (keyCode === RIGHT_ARROW){
        bird.velocityX = 4
    }
}