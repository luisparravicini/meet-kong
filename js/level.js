class Level {

  constructor(screen) {
    this.screen = screen;
  }

  load(data) {
    this.data = data;
  }

  async draw() {
    for (let i = 0; i < this.data.length; i++) {
      await this.screen.print(this.data[i]);
    }
  }

}
