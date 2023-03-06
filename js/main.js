class Player {
  constructor(){
    this.positionX = 0;
    this.PositionY = 0;
    this.playerElm = document.getElementById("player");
  }
  moveUp(){
    this.PositionY --;
    this.playerElm.style.top = this.PositionY + "vh";
  }
  moveDown(){
    this.PositionY ++;
    this.playerElm.style.top = this.PositionY + "vh";
    }
 }


const myPlayer = new Player();

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp"){
    myPlayer.moveUp();
  } else if (e.key === "ArrowDown"){
    myPlayer.moveDown();
  }
});