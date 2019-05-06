import paper from 'paper';
import Tone from 'tone';
import querystring from 'query-string';
import Disc from './lib/disc';
import Tine from './lib/tine';
import SquareTine from './lib/tine-square';
import Slider from './lib/slider';
import rainbow from './lib/rainbow';

const qs = querystring.parse(window.location.search);

paper.setup($('#mainCanvas')[0]);

const tineCount = 48;
const TineClass = Tine;
// const TineClass = SquareTine;
const colors = rainbow(tineCount);
const discCenter = paper.view.center;
const discRadius = Math.min(paper.view.size.height, paper.view.size.width) / 2;
const disc = new Disc(discCenter, discRadius, TineClass, tineCount, colors);

const scale = [];
for (let i = 0; i !== tineCount; i += 1) {
  scale.push(Tone.Frequency('A2').transpose(i));
}
const synth = new Tone.PolySynth(48, Tone.Synth).toMaster();

const notesToPlay = [];
disc.events.on('zero', (tineID) => {
  notesToPlay.push(scale[tineID - 1]);
});

document.addEventListener('wheel', (ev) => {
  disc.setSpeed(Math.min(ev.deltaY / 5000, 1));
});

paper.view.onFrame = ((ev) => {
  notesToPlay.length = 0;
  disc.onFrame(ev);
  synth.triggerAttackRelease(notesToPlay, '8n');
});

if (qs.screenControls && qs.screenControls !== '0') {
  const sliderWrapper = $('<div></div>')
    .attr('id', 'speedSlider')
    .addClass('slider')
    .appendTo('.main');
  const slider = new Slider(sliderWrapper[0]);
  slider.events.on('changed', (value) => {
    disc.setSpeed(value);
  });
}

paper.view.draw();
