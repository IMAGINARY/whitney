import paper from 'paper';
import Tine from './tine';

export default class SquareTine extends Tine {
  buildPath() {
    const side = Math.sqrt(Math.pow(this.size, 2) / 2);
    const path = new paper.Path.Rectangle(
      new paper.Point(0, 0),
      new paper.Size(side, side)
    );
    path.fillColor = this.fillColor;
    path.applyMatrix = false;
    return path;
  }

  onFrame(ev) {
    super.onFrame(ev);
    this.path.rotation = ((this.parent.tines[0].angle * -4) + 45) % 360;
  }
}
