import EventEmitter from 'events';

export default class Slider {
  constructor(element) {
    this.down = false;

    this.value = 0;
    this.min = -1;
    this.max = 1;
    this.snapMargin = 0.25;

    this.snapPoints = [
      { snapTo: 0, from: this.snapMargin * -1, to: this.snapMargin },
      // { snapTo: this.min, from: this.min, to: this.min + this.snapMargin },
      // { snapTo: this.max, from: this.max - this.snapMargin, to: this.max },
    ];

    this.element = element;
    this.snapElements = this.snapPoints.map(snap => this.createSnapElement(snap));
    this.snapElements.forEach(snapElement => this.element.appendChild(snapElement));
    this.handle = document.createElement('div');
    this.element.appendChild(this.handle);
    this.handle.setAttribute('class', 'handle');

    this.events = new EventEmitter();

    this.element.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));

    this.setValue(this.value);
  }

  createSnapElement(snapPoint) {
    const element = document.createElement('div');
    element.setAttribute('class', 'snap');
    const ratio = this.valueToRatio(snapPoint.snapTo);
    element.style.left = `${ratio * 100}%`;

    return element;
  }

  onMouseDown(ev) {
    if (ev.button === 0) {
      this.down = true;
    }
    this.onSlideTo(ev.clientX);
  }

  onMouseMove(ev) {
    if (this.down) {
      this.onSlideTo(ev.clientX);
    }
  }

  onMouseUp(ev) {
    if (ev.button === 0) {
      this.setValue(this.snapValue(this.value));
      this.down = false;
    }
  }

  onSlideTo(offset) {
    const rect = this.element.getBoundingClientRect();
    const handleOffset = Math.min(
      Math.max(0, offset - rect.left),
      rect.width
    );
    const ratio = handleOffset / rect.width;
    this.setValue(this.ratioToValue(ratio));
  }

  moveHandle(value) {
    const ratio = this.valueToRatio(value);
    this.handle.style.left = `${ratio * 100}%`;
  }

  ratioToValue(ratio) {
    return this.min + ratio * (this.max - this.min);
  }

  valueToRatio(value) {
    return (value - this.min) / (this.max - this.min);
  }

  snapValue(value) {
    let snappedValue = value;
    this.snapPoints.forEach((snap) => {
      if (snappedValue >= snap.from && snappedValue <= snap.to) {
        snappedValue = snap.snapTo;
      }
    });

    return snappedValue;
  }

  setValue(value) {
    this.value = value;
    this.moveHandle(value);
    this.events.emit('changed', this.value);
  }
}
