
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

        if (this.pos.y >= this.game.screen.size.y - 1) {
          this.deleteMe = true;
        } else {
          this.moved = true;
          this.movingRight = this._getNewDirection();
        }

        return;
    }

    let down = Object.assign({}, this.pos);
    down.y += 1;
    if (this.game.isOverLadder(down)) {
        this.pos.y += 1;
        this.movingRight = this._getNewDirection();
        this.moved = true;
        return;
    }

    let dx = (this.movingRight ? 1 : -1);
    this.pos.x += dx;
    this.moved = true;

    // the bottom of the level, hardcoded :\
    if (this.pos.y == this.game.screen.size.y - 2) {
      if (this.pos.x < 0 || this.pos.x > this.game.screen.size.x - 1) {
          this.deleteMe = true;
          return;
      }
    }

    if (this.pos.x < 0 || this.pos.x >= this.game.screen.size.x) {
        this.pos.x += dx * -1;
        this.movingRight = !this.movingRight;
        return;
    }

  }

  _getNewDirection() {
    return  (Math.random() > 0.5);
  }

}
