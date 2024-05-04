import React from "react";
import { Icon } from "~components/atoms";
import { withTheme } from "~theme";

const ChevronDown = ({ theme }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(50% - 12px)",
        right: "12px"
      }}
    >
      <Icon
        color={theme.colors.silverGrey}
        icon={"chevronDown"}
        viewBox="0 0 12 9"
        scale={0.75}
      />
    </div>
  );
};

export default withTheme(ChevronDown);
