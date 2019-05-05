import paper from 'paper';

export default function rainbow(steps) {
  const answer = [];

  // const keyColors = [
  //   '#fe0000',
  //   '#ff6200',
  //   '#ffff00',
  //   '#16cd16',
  //   '#0f8eff',
  //   '#6927bf',
  //   '#bc31ff',
  // ];

  const minHue = 0;
  const maxHue = 330;
  for (let i = 0; i < steps; i += 1) {
    answer.push(new paper.Color({
      // hue: (((steps - 1) - i) * (270 / steps)),
      hue: minHue + (maxHue - minHue) * (1 - (i / (steps - 1))),
      saturation: 1,
      brightness: 1,
      alpha: 1,
    }));
  }

  return answer;
}
