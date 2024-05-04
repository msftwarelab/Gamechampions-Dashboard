import { lighten } from "~util/color";

const ButtonTheme = ({ colors, fonts, boxShadows }) => {
  return {
    rootTheme: {
      display: "inline-block",
      color: colors.white,
      backgroundColor: colors.secondary,
      visitedColor: colors.white,
      activeColor: colors.white,
      activeBackgroundColor: colors.activeColor,
      disabledBackgroundColor: colors.disabledBackgroundColor,
      disabledColor: colors.disabledColor,
      hoverBackgroundColor: colors.hoverColor,
      hoverColor: colors.white,
      boxShadow: boxShadows.primary,
      padding: "1.33em 1.66em",
      fontSize: fonts.medium,
      fontWeight: fonts.semiBold,
      textTransform: "uppercase"
    },
    loaderTheme: {
      scale: "2em",
      margin: "2em",
      isLoading: true
    }
  };
};

export default ButtonTheme;
