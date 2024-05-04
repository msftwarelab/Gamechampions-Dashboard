import React from "react";
import { styled, withTheme } from "~theme";
import { Icon } from "~components/atoms";
import { SpaceStyle } from "~components/styles";

const renderStars = (starsCount, color, inactive, scale = 1.5) => {
  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (starsCount >= i + 1) {
      stars.push(<Icon key={i} scale={scale} color={color} icon="stars" />);
    } else {
      stars.push(
        <Icon key={i} scale={scale} color={inactive} icon="stars_outline" />
      );
    }
  }
  return stars;
};
const XpPoints = ({ points, margin, theme, scale }) => (
  <XpPointsStyle margin={margin}>
    {points &&
      renderStars(
        points,
        theme.colors.starActive,
        theme.colors.starInactive,
        scale
      )}
  </XpPointsStyle>
);

const XpPointsStyle = styled.span`
  ${SpaceStyle};
  display: inline-flex;
  align-items: center;
  font-size: 0.75em;
  border-radius: 2em;
  color: #fff;
`;

export default withTheme(XpPoints);
