
class Barrel {
  
  constructor(game, pos) {
    this.game = game;
    this.pos = pos;
    this.movingRight = this._getNewDirection();
    this.moved = false;
    this.deleteMe = false;
  }

  update() {
    this.moved = false;

    if (!this.game.isGrounded(this.pos)) {
        this.pos.y += 1;
        this.moved = true;
        return;
    }

    let dx = (this.movingRight ? 1 : -1);
    this.pos.x += dx;
    if (this.pos.y >= this.game.screen.size.y - 1) {
      if (this.pos.x < 0 || this.pos.x >= this.game.screen.size.x) {
        this.deleteMe = true;
      }
    } else if (this.pos.x < 0 || this.pos.x >= this.game.screen.size.x) {
        this.pos.x += dx * -1;
        this.movingRight = !this.movingRight;
    } else if (this.game.isOverLadder(this.pos)) {
        this.pos.y += 1;
        this.movingRight = this._getNewDirection();
        this.moved = true;
    } else
      this.moved = true;
  }

  _getNewDirection() {
    return  (Math.random() > 0.5);
  }

}
