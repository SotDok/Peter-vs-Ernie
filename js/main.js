class Game {
  constructor() {
    this.player = null;
    this.keeper = null;
    this.ball = null;
  }
   start(){
    this.ball = new Ball ();

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
