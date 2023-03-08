

class Game {
  constructor() {
    this.player = null;
    this.enemiesArr = [];
    this.bulletsArr = [];
    this.score = 0;
  }
  play() {
    this.player = new Player();

    this.attachEventListeners();

    setInterval(() => {
      const myEnemy = new Enemy();
      this.enemiesArr.push(myEnemy);
    }, 1000);

    setInterval(() => {
      this.enemiesArr.forEach((enemyInstance) => {
        enemyInstance.moveLeft();
        this.detectCollision(enemyInstance);
        this.removeEnemy(enemyInstance);
      });

      this.bulletsArr.forEach((bulletInstance) => {
        bulletInstance.moveRight();
        this.detectBulletCollision(bulletInstance);
        this.removeBullet(bulletInstance);
        });
    }, 100);
  }
  attachEventListeners() {
    let bulletCount = 0;
  setInterval(() => {
    bulletCount = 0;
  }, 4000);
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      this.player.moveUp();
    } else if (e.key === "ArrowDown") {
      this.player.moveDown();
    } else if (e.key === " " && bulletCount < 2) { // i limit the number of bullets to 2 every 4 seconds 
        const myBullet = new Bullet(
        this.player.positionX,
        this.player.positionY
      );
      this.bulletsArr.push(myBullet);
      bulletCount++;
    }
  });
  }
  //collision on X and Y axis.
  detectCollision(enemyInstance) {
    if (
      this.player.positionY + this.player.height > enemyInstance.positionY &&
      this.player.positionY < enemyInstance.positionY + enemyInstance.height &&
      this.player.positionX + this.player.width > enemyInstance.positionX &&
      this.player.positionX < enemyInstance.positionX + enemyInstance.width
    ) {
      console.log("we have died");
      // redirecting to new page when you lose.
      window.location.href = "../tryagain.html";
    }
  }
  detectBulletCollision(bulletInstance) {
    this.enemiesArr.forEach((enemyInstance) => {
      if (
        bulletInstance.positionY > enemyInstance.positionY &&
        bulletInstance.positionY <
          enemyInstance.positionY + enemyInstance.height &&
        bulletInstance.positionX + bulletInstance.width >
          enemyInstance.positionX &&
        bulletInstance.positionX <
          enemyInstance.positionX + enemyInstance.width
      ) {
        //Setting and updating the score
        this.score += 5;
        const scoreElement = document.getElementById("score");
        scoreElement.textContent = "Score: " + this.score;

        // functions that are called right after collision
        //enemyElm.showingDead();
        //this.removeEnemy(enemyInstance);
  
        
        enemyInstance.enemyElm.remove();
        bulletInstance.bulletElm.remove();
        const enemyIndex = this.enemiesArr.indexOf(enemyInstance);
        const bulletIndex = this.bulletsArr.indexOf(bulletInstance);
        this.enemiesArr.splice(enemyIndex, 1);
        this.bulletsArr.splice(bulletIndex, 1);

        //console.log("collision ");
        // bulletInstance.hide();
      }
    });
  }

  removeEnemy(enemyInstance) {
    if (enemyInstance.positionX <= 0) {
      for (let i = 0; i < this.enemiesArr.length; i++) {
        if (this.enemiesArr[i] === enemyInstance) {
          // Remove the enemy instance from the enemies array
          this.enemiesArr.splice(i, 1);
          // Remove the enemy element from the DOM
          enemyInstance.enemyElm.remove();
          break;
        }
      }
    } 
  }
   removeBullet(bulletInstance) {
    if (bulletInstance.positionX >= 80) {
      const bulletIndex = this.bulletsArr.indexOf(bulletInstance);
      this.bulletsArr.splice(bulletIndex, 1);
      bulletInstance.bulletElm.remove();
    }
    
  } 
}

class Player {
  constructor() {
    this.width = 10;
    this.height = 15;
    this.positionX = 0;
    this.positionY = 0;
    this.playerElm = document.getElementById("player");

    this.playerElm.style.width = this.width + "vw";
    this.playerElm.style.height = this.height + "vh";
  }
  moveUp() {
    if (this.positionY > 0) {
      this.positionY = this.positionY - 8;
      this.playerElm.style.top = this.positionY + "vh";
    }
  }
  moveDown() {
    if (this.positionY < 95 - this.height) {
      this.positionY = this.positionY + 8;
      this.playerElm.style.top = this.positionY + "vh";
    }
  }
}

class Bullet {
  constructor(playerPositionX, playerPositionY) {
    this.width = 2;
    this.height = 3;
    this.positionX = playerPositionX + 8;
    this.positionY = playerPositionY + 2;
    this.bulletElm = document.createElement("div");

    this.createDomElement();
  }
  // creating the bullet element
  createDomElement() {
    this.bulletElm.className = "bullet";
    this.bulletElm.style.width = this.width + "vw";
    this.bulletElm.style.height = this.height + "vh";
    this.bulletElm.style.top = this.positionY + "vh";
    this.bulletElm.style.left = this.positionX + "vw";

    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.bulletElm);
  }

  moveRight() {
    this.positionX = this.positionX + 5;
    this.bulletElm.style.left = this.positionX + "vw";
  }

  removeBullet() {
    this.bulletElm.remove();
  }
  //function to make the enemy disappear that I call inside the class Game
  hide() {
    this.bulletElm.style.display = "none";
  }
}

class Enemy {
  constructor() {
    this.width = 15;
    this.height = 25;
    this.positionX = 85;
    this.positionY = Math.floor(Math.random() * 80);
    this.enemyElm = null;

    this.createDomElement();
  }
  // creating the enemy class and setting it's sizes
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
    this.positionX = this.positionX - 3;
    this.enemyElm.style.left = this.positionX + "vw";
  }
  //function to make the enemy disappear that I call inside the class Game
  hide() {
    this.enemyElm.style.display = "none";
  }
}



const game = new Game();


game.play();
