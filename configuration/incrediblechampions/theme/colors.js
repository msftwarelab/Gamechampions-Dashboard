import { lighten, darken } from "~util/color";

const backgroundColor = "#f6f6f6";
const primary = "#0d2440";
const primaryDark = darken(primary, 10);
const primaryLight = lighten(primary, 10);
const primaryLighter = lighten(primary, 50);
const primaryLighterSecond = lighten(primary, 75);
const primaryLightest = lighten(primary, 100);
const primaryLightSecond = "#01285E";
const secondary = "#50b05c";
const secondaryDark = darken(secondary, 10);
const secondaryLight = lighten(secondary, 10);
const secondaryLightSecond = "#16FF00";
const tertiary = "#27778a";
const tertiaryDark = darken(tertiary, 10);
const tertiaryLight = lighten(tertiary, 10);
const white = "#ffffff";
const indianRed = "#ec3a55";
const starActive = "#ead405";
const whiteDark = darken(white, 10);
const grey = "#777777";
const greyDark = darken(grey, 10);
const greyLight = lighten(grey, 10);
const starInactive = lighten(grey, 30);
const green = "#72f58b";
const yellow = "#ffc400";
const black = "#000000";
const blackLight = lighten(black, 10);
const inactive = "rgba(255,255,255, 0.5)";
const blackTransparent = "rgba(0, 0, 0, 0)";
const errorBackgroundColor = "#ffdbd9";
const errorColor = "#f44336";
const offlineBackgroundColor = "#333";
const darkenColorDark = "rgba(0, 0, 0, 0.54)";
const darkenColor = "rgba(0, 0, 0, 0.33)";
const darkenColorLight = "rgba(0, 0, 0, 0.1)";
const lightenColor = "rgba(255, 255, 255, 0.66)";
const lightenColorLight = "rgba(255, 255, 255, 0.33)";
const inputDisabledBackgroundColor = "#eee";
const disabledBackgroundColor = "#9a9a9a";
const disabledColor = "#ccc";
const fontColor = "rgba(0, 0, 0, 0.87)";
const darkenFontColorLight = "rgba(0, 0, 0, 0.05)";
const fontColorLight = "#fff";
const overlayBackgroundColor = "rgba(255, 255, 255, 0.7)";
const hoverBackgroundColor = "#cccccc";
const gainsboro = "#dfdfdf";
const snackBarAction = "#A168D5";
const snackBarBackgroundColor = "#fee74e";
const lobbyGrey = "#3C3C3C";
const lobbyBackgroundGrey = "#f0f2f8";
const prizeAmountColor = "#2FCE2C";
const pointsColor = "#00c2ff";
const brightturquoise = "#00FFD1";
const welcomeBonusBgColor = "rgba(236, 236, 236, 0.5)";

export const colors = {
  backgroundColor,
  primary,
  primaryDark,
  primaryLight,
  primaryLighter,
  primaryLightest,
  primaryLighterSecond,
  primaryLightSecond,
  secondary,
  secondaryDark,
  secondaryLight,
  secondaryLightSecond,
  tertiary,
  tertiaryDark,
  tertiaryLight,
  white,
  indianRed,
  starActive,
  whiteDark,
  grey,
  greyDark,
  greyLight,
  starInactive,
  green,
  yellow,
  black,
  blackLight,
  blackTransparent,
  errorBackgroundColor,
  errorColor,
  offlineBackgroundColor,
  darkenColorDark,
  darkenColor,
  darkenColorLight,
  lightenColor,
  lightenColorLight,
  inputDisabledBackgroundColor,
  disabledBackgroundColor,
  disabledColor,
  fontColor,
  fontColorLight,
  overlayBackgroundColor,
  darkenFontColorLight,
  hoverBackgroundColor,
  gainsboro,
  snackBarAction,
  snackBarBackgroundColor,
  inactive,
  lobbyGrey,
  lobbyBackgroundGrey,
  prizeAmountColor,
  pointsColor,
  brightturquoise,
  welcomeBonusBgColor
};
