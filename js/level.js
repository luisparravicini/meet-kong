/* keep encoding as iso-8859-1 */

class Level {

  constructor(screen) {
    this.screen = screen;

    this.barrelEmitterChar = 'o';
    this.playerChar = 'x';

    this.barrelInScreenChar = 'o';
    this.playerInScreenChar = 'µ';

    this.charBehindPlayer = ' ';
  }

  load(data) {
    this.data = data;
    this._setup();
  }

  moveLeft() {
    this._move(-1, 0);
  }

  moveRight() {
    this._move(1, 0);
  }

  _move(dx, dy) {
    let pos = Object.assign({}, this.playerPos);
    pos.x += dx;
    pos.y += dy;

    if (pos.x < 0 || pos.x >= this.screen.size.x)
      return;
    if (pos.y < 0 || pos.y >= this.screen.size.y)
      return;


    this.screen.set_char(this.charBehindPlayer, this.playerPos);
    this.playerPos = pos;
    this.charBehindPlayer = this.data[pos.y][pos.x];
    this.screen.set_char(this.playerInScreenChar, this.playerPos);
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
  }

}
