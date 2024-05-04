export function darken(col, amt) {
  return lighten(col, -amt);
}

// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
export function lighten(color, percent) {
  let R = parseInt(color?.substring(1, 3), 16);
  let G = parseInt(color?.substring(3, 5), 16);
  let B = parseInt(color?.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  let RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  let GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  let BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}
