const LoaderTheme = ({ colors }) => {
  return {
    rootTheme: {
      justifyContent: "center"
    },
    defaultSpinnerTheme: {
      scale: "2rem",
      color: colors.primary
    }
  };
};

export default LoaderTheme;
