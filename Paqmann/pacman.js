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
const food = new Set();
const Ghosts = new Set();
let pacman;

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
}
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
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board
    
    loadImages();
}

function loadmap() {
    walls.clear();
    food.clear();
    Ghosts.clear();

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
              ghost.add(ghost);
          }
          else if (tileMapChar == "o") {
              //orange ghost
              const ghost = new Block(Clide2Image,x.y,tileSize,tileSize);
              ghost.add(ghost);
          }
              else if (tileMapChar == "p" ) {
              //blue ghost
              const ghost = new Block(Pinky2Image,x,y,tileSize,tileSize);
              ghost.add(ghost);
          }
          else if (tileMapChar == "r") {
              //orange ghost
              const ghost = new Block(Blinky2Image,x.y,tileSize,tileSize);
              ghost.add(ghost);
          }
          else if (tileMapChar == "P") {
              //Paqmann
              paqmann = new Block(pacmanRightImage,x.y,tileSize,tileSize);
          }
          else if (tileMapChar == " ") {
              //empty is food
              const food = new Block(null,x + 14,y + 14,tileSize,tileSize);
          }
      }
    }
}

class Block {
	construction(image,x,y,width,height){
        this.image = image;
	    this.x=x;
	    this.y=y;
	    this.width=width;
	    this.height=height;
        
	    this.startx=x;
	    this.starty=y;
    }
}