/* keep encoding as iso-8859-1 */

class Game {

  constructor(screen) {
    this.screen = screen;
    this.jumping = false;
    this.jumpStep = 100;
    this.barrels = [];
    this.barrelEmitTime = 5000;

    this.barrelEmitterChar = 'o';
    this.playerChar = 'x';

    this.barrelInScreenChar = 'O';
    this.playerInScreenChar = "\xb0";//'°';
    this.ladderInScreenChar = 'H';
    this.emptyInScreenChar = ' ';

    this.charBehindPlayer = ' ';
  }

  load(data) {
    this.data = data;
    this._setup();
  }

  moveLeft() {
    if (!this._canMove()) return;

    this._move(-1, 0);
  }

  moveRight() {
    if (!this._canMove()) return;

    this._move(1, 0);
  }

  moveUp() {
    if (!this._canMove()) return;

    if (!this._isOverLadder(this.playerPos)) return;

    this._move(0, -1);
  }

  jumpLeft() {
    if (!this._canMove()) return;

    this._jump(-1);
  }

  jumpRight() {
    if (!this._canMove()) return;

    this._jump(1);
  }

  update() {
    if (this.jumping)
      return;

    if (!this._isGrounded(this.playerPos))
      this._move(0, 1);


    
    this._updateBarrels();
  }

  _emitBarrel() {
    let pos = this.barrelEmmitters[Math.floor(Math.random() * this.barrelEmmitters.length)];
    let barrel = new Barrel(pos);
    this.barrels.push(barrel);
  }

  _updateBarrels() {
    let forRemoval = [];

    this.barrels.forEach(barrel => {
      let moved = false;
      let oldPos = Object.assign({}, barrel.pos);

      if (!this._isGrounded(barrel.pos)) {
          barrel.pos.y += 1;
          moved = true;
      } else {
        let dx = (barrel.movingRight ? 1 : -1);
        barrel.pos.x += dx;
        if (barrel.pos.y >= this.screen.size.y - 1) {
          if (barrel.pos.x < 0 || barrel.pos.x >= this.screen.size.x) {
            forRemoval.push(barrel);
          }
        } else if (barrel.pos.x < 0 || barrel.pos.x >= this.screen.size.x) {
            barrel.pos.x += dx * -1;
            barrel.movingRight = !barrel.movingRight;
        } else if (this._isOverLadder(barrel.pos)) {
            barrel.pos.y += 1;
            barrel.movingRight = barrel._getNewDirection();
            moved = true;
        } else
          moved = true;
      }

      if (moved) {
          this.screen.set_char(this.data[oldPos.y][oldPos.x], oldPos);
          this.screen.set_char(this.barrelInScreenChar, barrel.pos);
      }

    });

    forRemoval.forEach(x => this.barrels.splice(this.barrels.indexOf(x), 1));
  }

  _canMove() {
    return this._isGrounded(this.playerPos);
  }

  _isGrounded(pos) {
    let y = pos.y + 1;
    if (y >= this.screen.size.y)
      return true;

    let c = this.data[y][pos.x];
    if (c == this.emptyInScreenChar)
      return false;

    return true;
  }

  _isOverLadder(pos) {
    return (this.data[pos.y][pos.x] == this.ladderInScreenChar);
  }

  _jump(dx) {
    this.jumping = true;

    let steps = [
      {x: dx, y: -1},
      {x: dx, y: 0},
      {x: dx, y: 1},
    ];
    let jumpIndex = 0;

    this._moveJumpStep(steps, jumpIndex);
  }

  _moveJumpStep(steps, jumpIndex) {
    setTimeout(() => {
      if (jumpIndex < steps.length) {
        let step = steps[jumpIndex];
        let moved = this._move(step.x, step.y);
        if (moved) {
          this._moveJumpStep(steps, jumpIndex + 1);
        } else {
          this.jumping = false;
        }
      } else {
        this.jumping = false;
      }
    }, this.jumpStep);
  }

  _move(dx, dy) {
    let pos = Object.assign({}, this.playerPos);
    pos.x += dx;
    pos.y += dy;

    if (pos.x < 0 || pos.x >= this.screen.size.x)
      return false;
    if (pos.y < 0 || pos.y >= this.screen.size.y)
      return false;


    this.screen.set_char(this.charBehindPlayer, this.playerPos);
    this.playerPos = pos;
    this.charBehindPlayer = this.data[pos.y][pos.x];
    this.screen.set_char(this.playerInScreenChar, this.playerPos);

    return true;
  }

  async draw() {
    for (let i = 0; i < this.data.length; i++) {
      await this.screen.print(this.data[i]);
    }

    await this.screen.set_char(this.playerInScreenChar, this.playerPos);
  }

  _setup() {
    let positions = [];
    let playerPos = {x: 0, y: 0};

    for (let y = 0; y < this.data.length; y++) {  
      let line = this.data[y];
      for (let x = 0; x < this.data.length; x++) {

        if (line[x] == this.barrelEmitterChar)
          positions.push({x: x, y: y});

        if (line[x] == this.playerChar) {
          playerPos = {x: x, y: y};
          this.data[y] = line.substring(0, x) + ' ' + line.substring(x + 1);
        }
      }
    }

    this.barrelEmmitters = positions;
    this.playerPos = playerPos;

    console.log('found', this.barrelEmmitters.length, ' barrel emitters');
    console.log('player pos at', this.playerPos);

    setInterval(() => {
      if (this.barrels.length < 1)
        this._emitBarrel();
    }, this.barrelEmitTime);
  }

}
