
class Screen {
  constructor(screenId) {
    this.node = document.getElementById(screenId);
    this.size = { x: 32, y: 24 };
    this.cursor = { x: 0, y: 0 };
    this.cursorChar = 'Ø';
    this.screenDelay = 10;

    this._setupScreenElement();
  }

  _setupScreenElement() {
    this.node.innerHTML = '';

    // for (let i = 0; i < this.size.y; i++) {
    //   let row = document.createElement('p');
    //   this.node.appendChild(row);
    // }
    let fontSize = 16;

    this._cells = [];
    for (let y = 0; y < this.size.y; y++) {
      let row = [];
      this._cells.push(row);
      for (let x = 0; x < this.size.x; x++) {
        let cell = document.createElement('p');
        cell.setAttribute('style', `top:${y * fontSize}px; left:${x * fontSize}px`);
        cell.innerText = 'X';

        this.node.appendChild(cell);

        row.push(cell);
      }
    }

  }

  moveTo(pos) {
    this.cursor = pos;
  }

  clear() {
    for (let y = 0; y < this.size.y; y++) {
      for (let x = 0; x < this.size.x; x++) {
        this.set_char(x, y, '');
      }
    }
    this.moveTo({x: 0, y: 0});
  }

  set_char(x, y, c) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        this._cells[y][x].innerText = c;
        resolve();
      }, this.screenDelay);
    });
  }

  _print_row(s, y) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        let y = this.cursor.y;
        for (let x = 0; x < this.size.x; x++) {
          this._cells[y][x].innerText = s[x];
        }
        resolve();
      }, this.screenDelay * this.size.x);
    });
  }

  async print(s) {
    await this._print_row(s, this.cursor.y).then(() => {
      if (this.cursor.y < this.size.y)
        this.cursor.y++;
    });
  }
}
