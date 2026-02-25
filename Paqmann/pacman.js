//board
let board;
const rowCount = 21;
const columnCount = 19;
const tileSize=32;
const boardWidth = columnCount * tileSize;
const boardHeight = rowCount * tileSize;
let context;

 //images
 let Inky2Image;
 let Clide2Image;
 let Pinky2Image;
 let Blinky2Image;
 let pacmanDownImage;
 let pacmanUpImage;
 let pacmanLeftImage;
 let pacmanRightImage;
 let Wall2Image;
 //X = wall, O = skip, P = pac man, ' ' = food
//Ghosts: b = blue, o = orange, p = pink, r = red
const tileMap = [

    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXrXX X XXXX",
    "O       bpo       O",
    "XXXX X XXXXX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X     P     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X XXXXXX X XXXXXX X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX" 
];

const walls = new Set();
const foods = new Set();
const ghosts = new Set();
let pacman;

 function loadImages() {
    Wall2Image = new Image();
    Wall2Image.src = "./wall2.png";
    
    Inky2Image = new Image();
    Inky2Image.src = "./inky2.png";
    Clide2Image = new Image();
    Clide2Image.src = "./clide2.png";
    Pinky2Image = new Image();
    Pinky2Image.src = "./pinky2.png";
    Blinky2Image = new Image();
    Blinky2Image.src = "./blinky2.png";

    pacmanDownImage = new Image();
    pacmanDownImage.src = "./pacmanDown.png";
    pacmanUpImage = new Image();
    pacmanUpImage.src = "./pacmanUp.png";
    pacmanLeftImage = new Image();
    pacmanLeftImage.src = "./pacmanLeft.png";
    pacmanRightImage = new Image();
    pacmanRightImage.src = "./pacmanRight.png";
 }
window.onload=function() {
    board = this.document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board
    context.imageSmoothingEnabled = false;

    loadImages();
    loadmap();

    update();

}

function loadmap() {
    walls.clear();
    foods.clear();
    ghosts.clear();

    for (let r = 0; r< rowCount; r++) {
      for (let c = 0; c < columnCount; c++) {
          const row = tileMap[r];
          const tileMapChar = row[c];
          const x = c * tileSize;
          const y = r * tileSize;

          if (tileMapChar == "X") {
              //block wall
              const wall = new Block(Wall2Image,x,y,tileSize,tileSize);
              walls.add(wall);    
          }
          else if (tileMapChar == "b" ) {
              //blue ghost
              const ghost = new Block(Inky2Image,x,y,tileSize,tileSize);
              ghosts.add(ghost);
          }
          else if (tileMapChar == "o") {
              //orange ghost
              const ghost = new Block(Clide2Image,x,y,tileSize,tileSize);
              ghosts.add(ghost);
          }
              else if (tileMapChar == "p" ) {
              //blue ghost
              const ghost = new Block(Pinky2Image,x,y,tileSize,tileSize);
              ghosts.add(ghost);
          }
          else if (tileMapChar == "r") {
              //orange ghost
              const ghost = new Block(Blinky2Image,x,y,tileSize,tileSize);
              ghosts.add(ghost);
          }
          else if (tileMapChar == "P") {
              //Paqmann
              pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);
          }
          else if (tileMapChar == " ") {
              //empty is food
              const food = new Block(null, x + 14, y + 14, 4, 4);
              foods.add(food)
          }
      }
    }
}

class Block {
	constructor(image,x,y,width,height){
        this.image = image;
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
        
	    this.startx=x;
	    this.starty=y;

        this.direction = 'R';
        this.velocityX = 0;
        this.velocityY = 0;
    }

    updateDirection(direction) {
        this.direction = directioon;
        this.updateVelocity();
    }

    updateVelocity() {
        if (this.direction == 'U') {
            this.velocityX = 0;
            this.velocityY = -tileSize/4;
        }
    }
}

function draw() {
    context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);
    for (let ghost of ghosts.values()){
        context.drawImage(ghost.image,ghost.x, ghost.y, ghost.width, ghost.height)
    }
    for (let wall of walls.values()){
        context.drawImage(wall.image,wall.x, wall.y, wall.width,wall.height);
    }
    context.fillStyle = "pink";
    for (let food of foods.values()){
        context.fillRect(food.x, food.y, food.width, food.height);
    }
}

function update(){
    draw();
    setTimeout(update, 50); //20 FPS 1=> 1000/20= 50
}

