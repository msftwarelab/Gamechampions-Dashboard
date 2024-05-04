import { lighten, darken } from "~util/color";

const backgroundColor = "#f6f6f6";
const primary = "#00143C";
const primaryDark = "#050F21";
const primaryLight = lighten(primary, 10);
const primaryLighter = lighten(primary, 50);
const primaryLighterSecond = lighten(primary, 75);
const primaryLightest = lighten(primary, 100);
const primaryLightSecond = "#01285E";
const secondary = "#00A826";
const secondaryDark = darken(secondary, 10);
const secondaryLight = "#6DE83C";
const secondaryLighten = "#00A82626";
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
const greyDim = lighten(grey, 42.5); // a9a9a9
const starInactive = lighten(grey, 30);
const green = "#72f58b";
const brightGreen = "#04fe82";
const lightGreen = "#E3FFD9";
const forestGreen = "#007D1C";
const kiwigreen = "#73F340";
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
const hoverColor = "#01C12C";
const activeColor = "#01811D";
const fontColor = "rgba(0, 0, 0, 0.87)";
const fontNobelColor = "#979797";
const secondFontColor = "rgba(0, 0, 0, 0.7)";
const darkenFontColorLight = "rgba(0, 0, 0, 0.05)";
const fontColorLight = "#fff";
const overlayBackgroundColor = "rgba(255, 255, 255, 0.7)";
const hoverBackgroundColor = "#cccccc";
const gainsboro = "#dfdfdf";
const snackBarAction = "#A168D5";
const snackBarBackgroundColor = "#fee74e";
const lobbyGrey = "#3C3C3C";
const darkAqua = "#00788D";
const dimGray = "#565656";
const lobbyBackgroundGrey = "#f0f2f8";
const prizeAmountColor = "#2FCE2C";
const pointsColor = "#00c2ff";
const greySoft = "#EDEDED";
const energyColor = "#1493FF";
const darkBlue = "#000e3f";
const skyBlue = "#07A8B2";
const dodgerBlue = "#1982FC";
const navyBlue = "#01143C";
const azureBlue = "#00B2FF";
const platinumGray = "#e1e1e1";
const red = "#FF0000";
const burntOrange = "#E66319";
const brightOrange = "#FF6D00";
const peelOrange = "#FFA800";
const peelOrangeLighten = "#FFA80033";
const darkSlateGray = "#545454";
const slateGray = "#86919F";
const gainsboroGrey = "#B9B9B9";
const silverGrey = "#D9D9D9";
const charcoalGrey = "#1E1E1E";
const steelGrey = "#6B6B6B";
const pewterGrey = "#797979";
const mistyGrey = "#F5F5F5";
const linenGrey = "#EAE7E7";
const bluishGrey = "#969CA9";
const darkGrey = "#363636";
const smokeWhite = "#FAFAFA";
const lightSlateGray = "#BABABA";
const teal = "#36879A";
const tealBlue = "#2E778A";
const turquoiseFilled = "#5AD1CE";
const turquoiseFilledLighten = "#5AD1CE33";
const turquoiseLightLighten = "#20EFE333";
const electricIndigo = "#6F00FF";
const lemonglacier = "#F6FB04";
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
  secondaryLighten,
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
  greyDim,
  starInactive,
  green,
  brightGreen,
  lightGreen,
  forestGreen,
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
  hoverColor,
  activeColor,
  fontColor,
  secondFontColor,
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
  greySoft,
  energyColor,
  darkBlue,
  skyBlue,
  dodgerBlue,
  navyBlue,
  azureBlue,
  platinumGray,
  red,
  burntOrange,
  brightOrange,
  peelOrange,
  peelOrangeLighten,
  darkSlateGray,
  slateGray,
  gainsboroGrey,
  silverGrey,
  charcoalGrey,
  steelGrey,
  pewterGrey,
  kiwigreen,
  mistyGrey,
  linenGrey,
  bluishGrey,
  darkGrey,
  smokeWhite,
  lightSlateGray,
  teal,
  tealBlue,
  turquoiseFilled,
  turquoiseFilledLighten,
  turquoiseLightLighten,
  electricIndigo,
  lemonglacier,
  brightturquoise,
  fontNobelColor,
  darkAqua,
  dimGray,
  welcomeBonusBgColor
};
