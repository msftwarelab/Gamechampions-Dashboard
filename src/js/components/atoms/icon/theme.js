const IconTheme = ({ colors }) => {
  return {
    rootTheme: {
      color: colors.secondary,
      disabledColor: colors.grey,
      margin: "0 0 0 1rem"
    },
    svgTheme: {
      scale: "1.5",
      viewBox: "0 0 24 24"
    }
  };
};

export default IconTheme;
