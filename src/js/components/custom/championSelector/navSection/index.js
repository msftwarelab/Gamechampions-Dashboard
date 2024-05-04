import React from "react";
import { styled } from "~theme";
import { DisplayStyle, PaddingStyle, FlexBoxStyle } from "~components/styles";

const NavSection = ({ children }) => {
  return (
    <NavSectionStyle
      display={{
        base: "flex",
        md: "none"
      }}
      padding="0.5em"
      justifyContent="center"
    >
      {children}
    </NavSectionStyle>
  );
};

const NavSectionStyle = styled.div`
  ${DisplayStyle};
  ${FlexBoxStyle};
  ${PaddingStyle};
  gap: 2em;
`;

export default NavSection;
