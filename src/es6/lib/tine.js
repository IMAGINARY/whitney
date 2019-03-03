import paper from 'paper';

export default class Tine {
  constructor(id, parent, radius, size, fillColor, speedFactor) {
    this.id = id;
    this.parent = parent;
    this.radius = radius;
    this.size = size;
    this.fillColor = fillColor;
    this.speedFactor = speedFactor;
    this.path = Tine.buildPath(this.size, this.fillColor);
    this.setAngle(0);
  }

  setAngle(newAngle) {
    if (newAngle >= 360 || newAngle < 0) {
      this.onZero();
    }
    this.angle = newAngle >= 0 ? newAngle % 360 : 360 + newAngle;
    this.path.position = new paper.Point(this.radius, 0)
      .rotate(this.angle)
      .add(this.parent.center);
  }

  onFrame(ev) {
    if (this.parent.speed !== 0) {
      this.setAngle(this.angle + ev.delta * 360 * this.parent.speed * this.speedFactor);
    }
  }

  onZero() {
    this.parent.onZero(this);
  }

  static buildPath(size, fillColor) {
    const path = new paper.Path.Circle(new paper.Point(0, 0), size / 2);
    path.fillColor = fillColor;
    return path;
  }
}
