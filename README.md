# Whitney Music Box

A Math and Music interactive exhibit by [IMAGINARY gGmbH](https://imaginary.org).

## Background

Based on a concept by [Jim Bumgardner](https://krazydad.com) inspired by experimental film pioneer John Whitney.

In page 38 of his book "Digital Harmony", Whitney writes:

> An early intuition about how to control total dynamics led me to activate all graphic elements through a motion
  function that advances each element differentially. For example, if one element were set to move at a given rate,
  the next element might be moved at two times that rate. Then the third would move at three times that rate and so
  on. Each element would move at a different rate and in a different direction within the field of action. So long
  as all elements obey a rule of direction and rate, and none drifts aimlessly or randomly, then pattern configurations
  form and reform. This is harmonic resonance, and it echoes musical harmony, stated in explicit terms. I tried this
  procedure in several films, and was gratified by the consistency of the confirmation it demonstrated.

(John Whitney, Digital Harmony: On the Complementarity of Music and Visual Art, McGraw-Hill Inc.,US; 1st edition
May 1, 1980, ISBN-13: 978-0070700154)

In the original Whitney Music Box Jim Bumgardner had 48 dots moving in a circle at different speeds. Every time the
outermost dot moved once around the circle the next dot moved twice, the next three times and so on up to the innermost
which moved 48 times around. He had the idea of playing a different note each time one of the dots moved through the
zero point. In the first version Bumgardner used a 48 note chromatic scale, and in further experiments he tried
the harmonic series with different fundamentals, putting the notes in reverse order, as a palyndrome, etc.

Source: [krazydad.com](https://web.archive.org/web/20180802002553/https://krazydad.com/blog/2006/04/23/visual-harmony/)

[White paper](https://jbum.com/papers/whitney_paper.pdf)

[Nice explanation by Jim Bumgardner at Gel 2007](https://www.youtube.com/watch?v=6nwJ5nqN4Mw)

More examples at: [github.com/jbum/Whitney-Music-Box-Examples](https://github.com/jbum/Whitney-Music-Box-Examples)

## Compilation

Compilation is not needed unless you want to do modifications.

To compile you'll need to install `yarn` and `node.js`.

Standing in the root directory run

```
yarn
```

to install dependencies. And then

```
gulp
```

to precompile ES6 and SASS sources to JS and CSS respectively.