const TableTheme = ({ colors, fonts }) => {
  return {
    rootTheme: {
      backgroundColor: colors.white,
      color: colors.fontColor
    },
    headTheme: {
      backgroundColor: colors.primaryDark,
      color: colors.fontColorLight
    },
    headRowTheme: {
      backgroundColor: colors.primaryDark,
      color: colors.fontColorLight,
      fontSize: fonts.small
    },
    rowTheme: {
      secondBackgroundColor: "rgba(0, 0, 0, 0.05)",
      hoverBackgroundColor: "rgba(0, 0, 0, 0.1)"
    },
    mobileIconsTheme: {
      backgroundColor: colors.white
    }
  };
};

export default TableTheme;
