import { lighten } from "~util/color";

const BannerTheme = ({ colors }) => {
  return {
    headerTheme: {
      color: colors.white,
      margin: "0 0 1em",
      fontSize: {
        base: "1.6em",
        md: "2.2em"
      },
      fontWeight: "500"
    },
    summaryTheme: {
      color: colors.white,
      margin: {
        base: "0 0 2rem",
        md: "0 0 3rem"
      }
    },
    ctaButtonTheme: {
      color: colors.green,
      backgroundColor: "transparent",
      hoverColor: lighten(colors.green, 70)
    }
  };
};

export default BannerTheme;
