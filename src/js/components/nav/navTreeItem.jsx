import React from "react";
import { Link } from "react-router-dom";
import { Span, Icon, FlexBox, Paragraph } from "~components/atoms";
import { styled, withTheme } from "~theme";
import Badge from "~components/atoms/badge";

const NavTreeItem = ({
  url,
  name,
  icon,
  isActive,
  onClick,
  isExternal,
  isMenuOpen,
  theme,
  notifications,
  newlyAdded = false
}) => {
  const className = isActive ? "selected" : "";
  let menuNameStyle = "menu-name-hide";
  if (!isMenuOpen) {
    menuNameStyle = "menu-name-show";
  }
  return (
    <Container>
      {isExternal && (
        <a
          href={url}
          target={"_blank"}
          rel="noopener noreferrer"
          download={url.match(/\.\w{3,4}$/)}
          className={`nav__link ${className}`}
          onClick={() => {
            onClick(url);
          }}
        >
          {icon && (
            <Icon
              color={isActive ? theme.colors.secondary : theme.colors.greyLight}
              icon={icon}
              scale={1.5}
            />
          )}
          {!!notifications && (
            <BadgeContainer>
              <Badge number={notifications} />
            </BadgeContainer>
          )}

          <Span
            margin="0 0 0 0.5rem"
            className={menuNameStyle}
            color={isActive ? theme.colors.secondary : theme.colors.greyLight}
          >
            {name}
          </Span>
        </a>
      )}
      {!isExternal && (
        <Link
          to={url}
          title={name}
          className={`nav__link ${className}`}
          onClick={() => {
            onClick(url);
          }}
        >
          {icon && (
            <Icon
              color={isActive ? theme.colors.secondary : theme.colors.greyLight}
              icon={icon}
              scale={1.5}
            />
          )}
          {!!notifications && (
            <BadgeContainer>
              <Badge number={notifications} scale={0.75} />
            </BadgeContainer>
          )}

          <Span
            margin="0 0 0 0.5rem"
            className={menuNameStyle}
            color={isActive ? theme.colors.secondary : theme.colors.greyLight}
          >
            {name}
          </Span>
        </Link>
      )}
    </Container>
  );
};

export default withTheme(NavTreeItem);

const Container = styled.div`
  position: relative;
`;

const BadgeContainer = styled.div`
  position: absolute;
  left: 5%;
  top: 5%;
`;
