import paper from 'paper';
import EventEmitter from 'events';

export default class Disc {
  constructor(center, radius, TineClass, tineCount, colors, showLines = false) {
    this.showTracks = false;
    this.showBackground = false;
    this.showLines = showLines;
    this.center = center;
    this.radius = radius;
    this.TineClass = TineClass;
    this.speed = 0;
    this.path = this.showBackground ? Disc.createPath(center, radius) : null;
    this.lines = this.showLines ? Disc.createLines(tineCount) : null;
    this.zero = Disc.createZero(center, radius);
    this.tines = this.createTines(tineCount, colors);
    this.events = new EventEmitter();
  }

  createTines(count, colors) {
    const tines = [];
    const baseSize = (this.radius / count) * 2;
    const minSizeFactor = 0.5;
    const maxSizeFactor = 4;
    const minR = baseSize * minSizeFactor / 2;
    const maxR = this.radius - (baseSize * maxSizeFactor) / 2;

    for (let i = 0; i < count; i += 1) {
      const sizeFactor = minSizeFactor + ((maxSizeFactor - minSizeFactor) / (count - 1)) * i;
      // const r = minR + ((maxR - minR) / count) * (i + 1);
      const r = minR + ((maxR - minR) / (count - 1)) * i;
      const speedFactor = i + 1;
      const color = colors[i % colors.length];
      if (this.showTracks) {
        this.tracks = [];
        this.tracks.push(new paper.Path.Circle(this.center, r)
          .strokeColor = 'white');
      }
      tines.push(new this.TineClass(
        i + 1,
        this,
        r,
        baseSize * sizeFactor,
        color,
        speedFactor
      ));
    }

    return tines;
  }

  onFrame(ev) {
    this.tines.forEach(tine => tine.onFrame(ev));
    if (this.showLines) {
      this.moveLines();
    }
  }

  onZero(tine) {
    this.events.emit('zero', tine.id);
  }

  setSpeed(speed) {
    this.speed = speed * 1 / (this.tines.length * 2);
  }

  moveLines() {
    this.tines.forEach((tine, i) => {
      if (i !== 0) {
        this.lines[i - 1].segments[1].point = tine.path.position;
      }
      if (i !== this.tines.length - 1) {
        this.lines[i].segments[0].point = tine.path.position;
      }
    });
  }

  static createPath(center, radius) {
    const path = new paper.Path.Circle(center, radius);
    path.fillColor = 'white';
    path.opacity = 0.05;

    return path;
  }

  static createZero(center, radius) {
    const path = new paper.Path.Line(center, center.add(new paper.Point(radius, 0)));
    path.strokeColor = '#fff';
    return path;
  }

  static createLines(count) {
    const output = [];
    for (let i = 0; i !== count; i += 1) {
      output.push(
        new paper.Path.Line({
          from: [0, 0],
          to: [1, 1],
          strokeColor: '#fff',
          strokeWidth: 1,
        })
      );
    }
    return output;
  }
}
