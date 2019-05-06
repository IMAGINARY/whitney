import paper from 'paper';

export default class Tine {
  constructor(id, parent, radius, size, fillColor, speedFactor) {
    this.id = id;
    this.parent = parent;
    this.radius = radius;
    this.size = size;
    this.fillColor = fillColor;
    this.speedFactor = speedFactor;
    this.path = this.buildPath();
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
    this.path.tween(
      {
        fillColor: '#fff',
        scaling: new paper.Point(1.25, 1.25),
      },
      {
        fillColor: this.fillColor.toCSS(),
        scaling: new paper.Point(1, 1),
      },
      {
        duration: 500,
        easing: 'easeInQuad',
      }
    );
    this.parent.onZero(this);
  }

  buildPath() {
    const path = new paper.Path.Circle(new paper.Point(0, 0), this.size / 2);
    path.fillColor = this.fillColor;
    path.applyMatrix = false;
    return path;
  }
}
