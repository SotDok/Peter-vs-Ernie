class Game {
  constructor() {
    this.player = null;
    this.enemiesArr = [];
  }
  play() {
    this.player = new Player();
    
    this.attachEventListeners();

    setInterval( () => {
      const myEnemy = new Enemy();
      this.enemiesArr.push(myEnemy);
    }, 3000);

    setInterval( () => {
      this.enemiesArr.forEach((enemyInstance) => {
        enemyInstance.moveLeft();

        if (
          this.player.positionY + this.player.height >= enemyInstance.positionY &&
          this.player.positionY <= enemyInstance.positionY + enemyInstance.height &&
          this.player.positionX + this.player.width >= enemyInstance.positionX &&
          this.player.positionX <= enemyInstance.positionX + enemyInstance.width
        ) {
          console.log("game over");
        }
        
      });
    }, 20);
  }
  attachEventListeners(){
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        this.player.moveUp();
      } else if (e.key === "ArrowDown") {
        this.player.moveDown();
      }
    });
    
  }
}

class Player {
  constructor() {
    this.width = 8;
    this.height = 15;
    this.positionX = 0;
    this.positionY = 0;
    this.playerElm = document.getElementById("player");

    this.playerElm.style.width = this.width + "vw";
    this.playerElm.style.height = this.height + "vh";
  }
  moveUp() {
    this.positionY--;
    this.playerElm.style.top = this.positionY + "vh";
  }
  moveDown() {
    this.positionY++;
    this.playerElm.style.top = this.positionY + "vh";
  }
}

class Enemy {
  constructor() {
    this.width = 10;
    this.height = 20;
    this.positionX = 100;
    this.positionY = Math.floor(Math.random() * 70) + 10;
    this.enemyElm = null;

    this.createDomElement();
  }

  createDomElement() {
    this.enemyElm = document.createElement("div");

    this.enemyElm.className = "enemy";
    this.enemyElm.style.width = this.width + "vw";
    this.enemyElm.style.height = this.height + "vh";
    this.enemyElm.style.top = this.positionY + "vh";

    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.enemyElm);
  }
  moveLeft() {
    this.positionX--;
    this.enemyElm.style.left = this.positionX + "vw";
  }
}

const game = new Game();
game.play();




