import React from "react";
import { styled } from "~theme";
import { DisplayStyle } from "~components/styles";

const SelectorWrapper = ({
  children,
  isAuthenticated = false,
  showOnMobile = false
}) => {
  return (
    <SelectorWrapperStyle
      display={{
        base: showOnMobile ? "block" : isAuthenticated ? "none" : "block",
        md: "block"
      }}
    >
      {children}
    </SelectorWrapperStyle>
  );
};

const SelectorWrapperStyle = styled.div`
  ${DisplayStyle};
`;

export default SelectorWrapper;
