export class Config {
  static ratio = 1;

  private static getScreenSize() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    if (width > height) {
      width = height / this.ratio;
    } else {
      height = width * this.ratio;
    }

    return { width, height };
  }

  static get screenWidth() {
    const { width } = this.getScreenSize();

    return width;
  }

  static get screenHeight() {
    const { height } = this.getScreenSize();

    return height;
  }
}
