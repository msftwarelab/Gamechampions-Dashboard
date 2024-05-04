const ConfirmBoxTheme = ({ colors, boxShadows }) => {
  return {
    rootTheme: {
      position: "fixed",
      top: "0",
      left: "0",
      height: "100%",
      width: "100%",
      backgroundColor: colors.overlayBackgroundColor
    },
    wrapperTheme: {
      position: "relative",
      padding: "1rem",
      textAlign: "center",
      width: {
        base: "100%",
        md: "28rem"
      },
      height: "fit-content",
      margin: {
        base: "1rem 0.5rem",
        md: "1rem auto"
      },
      boxShadow: boxShadows.primary,
      backgroundColor: colors.white
    },
    buttonWrapperTheme: {
      alignItems: "center",
      justifyContent: "space-evenly"
    },
    confirmButtonTheme: {
      minWidth: "10rem"
    },
    cancelLinkTheme: {
      margin: "0 3rem 0 0",
      color: colors.secondary,
      fontSize: "0.875rem",
      textTransform: "uppercase"
    },
    textTheme: {
      margin: "0 0 1rem 0",
      justifyContent: "center",
      color: colors.black
    }
  };
};

export default ConfirmBoxTheme;
