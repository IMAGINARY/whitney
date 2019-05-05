import paper from 'paper';
import Tone from 'tone';
import Disc from './lib/disc';
import Slider from './lib/slider';
import rainbow from './lib/rainbow';

const canvas = document.getElementById('mainCanvas');
paper.setup(canvas);

const tineCount = 48;
const colors = rainbow(tineCount);
const discCenter = paper.view.center;
const discRadius = Math.min(paper.view.size.height, paper.view.size.width) / 2;
const disc = new Disc(discCenter, discRadius, tineCount, colors);

const scale = [];
for (let i = 0; i !== tineCount; i += 1) {
  scale.push(Tone.Frequency('A2').transpose(i));
}
const synth = new Tone.PolySynth(48, Tone.Synth).toMaster();

const notesToPlay = [];
disc.events.on('zero', (tineID) => {
  notesToPlay.push(scale[tineID - 1]);
});

const slider = new Slider(document.getElementById('speedSlider'));
slider.events.on('changed', (value) => {
  disc.setSpeed(value);
});

document.addEventListener('wheel', (ev) => {
  disc.setSpeed(Math.min(ev.deltaY / 5000, 1));
});

paper.view.onFrame = ((ev) => {
  notesToPlay.length = 0;
  disc.onFrame(ev);
  synth.triggerAttackRelease(notesToPlay, '8n');
});
paper.view.draw();
