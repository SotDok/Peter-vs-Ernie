class Game {
  constructor() {
 
  }
   start(){
    const keeperElm = document.getElementById("keeper");


  }
  jump();
   

    this.attachEventListeners();
   }
   start(){
    this.player = new Player();
    this.attachEventListeners();

   }

  attachEventListeners(){
    document.addEventListener("keydown", (e) => {
      if (e.key === "Space"){
        this.ball.moveRight();
        }
    });
  }
}


class Player {
  constructor() {

  }
}

class Keeper {
  constructor (){

    }
    function jump(){
      setInterval (() => {
        keeperElm.classList.toggle("jump");
      }, 500);
    }
}

class Ball {
  constructor(){

  }
}


document.addEventListener