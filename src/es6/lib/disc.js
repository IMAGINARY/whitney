import paper from 'paper';
import EventEmitter from 'events';
import Tine from './tine';

export default class Disc {
  constructor(center, radius, tineCount) {
    this.showTracks = false;
    this.center = center;
    this.radius = radius;
    this.speed = 0;
    this.path = Disc.createPath(center, radius);
    this.zero = Disc.createZero(center, radius);
    this.tines = this.createTines(tineCount);
    this.events = new EventEmitter();
  }

  createTines(count) {
    const tines = [];
    const tineSize = (this.radius / count) * 2;
    const minR = 0;
    const maxR = this.radius - tineSize / 2;

    for (let i = 0; i < count; i += 1) {
      const r = minR + ((maxR - minR) / count) * (i + 1);
      const speedFactor = i + 1;
      if (this.showTracks) {
        this.tracks = [];
        this.tracks.push(new paper.Path.Circle(this.center, r)
          .strokeColor = 'white');
      }
      tines.push(new Tine(i + 1, this, r, tineSize, 'white', speedFactor));
    }

    return tines;
  }

  onFrame(ev) {
    this.tines.forEach(tine => tine.onFrame(ev));
  }

  onZero(tine) {
    this.events.emit('zero', tine.id);
  }

  setSpeed(speed) {
    this.speed = speed * 1 / (this.tines.length * 2);
  }

  static createPath(center, radius) {
    const path = new paper.Path.Circle(center, radius);
    path.fillColor = 'white';
    path.opacity = 0.05;

    return path;
  }

  static createZero(center, radius) {
    const path = new paper.Path.Line(center, center.add(new paper.Point(radius, 0)));
    path.strokeColor = 'white';
  }
}
