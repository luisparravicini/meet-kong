
class Barrel {
  
  constructor(pos) {
    this.pos = pos;
    this.movingRight = this._getNewDirection();
  }

  _getNewDirection() {
    return  (Math.random() > 0.5);
  }

}
