import React from "react";
import { Span, Icon, FlexBox, Paragraph } from "~components/atoms";
import Badge from "~components/atoms/badge";
import { styled, withTheme } from "~theme";

const StickyNavTreeItem = ({
  url,
  name,
  icon,
  isActive = false,
  theme,
  onClick,
  history,
  width,
  notification,
  newlyAdded = false
}) => {
  return (
    <FlexBox
      height="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      width={width}
      onClick={() => {
        typeof onClick == "function" && onClick();
        history.push(url);
      }}
      position="relative"
    >
      {icon && (
        <Icon
          scale={2}
          color={isActive ? theme.colors.white : theme.colors.inactive}
          icon={icon}
        />
      )}
      <Span
        className={"menu-name-show"}
        fontSize=".7rem"
        color={isActive ? theme.colors.white : theme.colors.inactive}
        lineHeight="1.5"
      >
        {name}
      </Span>
      {!!notification && (
        <BadgeContainer>
          <Badge number={notification} scale={0.9} />
        </BadgeContainer>
      )}
    </FlexBox>
  );
};

const BadgeContainer = styled.div`
  position: absolute;
  top: 5%;
  left: 50%;
  z-index: 10;
`;

export default withTheme(StickyNavTreeItem);
