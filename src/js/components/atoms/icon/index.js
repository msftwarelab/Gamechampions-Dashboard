import React from "react";
import { default as styled } from "styled-components";
import { withBaseComponent } from "~hocs";
import IconSvgStyle from "./iconSvg";
import IconPathStyle from "./iconPath";
import { ColouringStyle, SpaceStyle } from "~components/styles";
import { media } from "~theme";

const Icon = ({
  color,
  id,
  icon,
  title,
  margin,
  theme,
  setRef,
  scale,
  viewBox,
  onClick,
  displayOnMobile = true,
  isDisabled,
  cursor = "pointer"
}) => {
  const { iconTheme } = theme;
  const { rootTheme, svgTheme } = iconTheme;

  return (
    <IconStyle
      id={id}
      {...rootTheme}
      color={isDisabled ? rootTheme.disabledColor : color || rootTheme.color}
      margin={margin}
      onClick={!isDisabled ? onClick : null}
      ref={setRef}
      displayOnMobile={displayOnMobile}
      title={title}
      cursor={cursor}
    >
      <IconSvgStyle
        {...svgTheme}
        scale={scale || svgTheme.scale}
        viewBox={
          icon == "arena" ? "0 -960 960 960" : viewBox || svgTheme.viewBox
        }
      >
        <IconPathStyle d={theme.icons[icon]} />
      </IconSvgStyle>
    </IconStyle>
  );
};

const IconStyle = styled.i`
  display: ${props => (props.displayOnMobile ? "inline-block" : "none")};
  ${ColouringStyle};
  ${SpaceStyle};
  ${media.md`
  display: inline-flex;
  cursor: ${props => props.cursor};
`};
`;

export default withBaseComponent(Icon);
