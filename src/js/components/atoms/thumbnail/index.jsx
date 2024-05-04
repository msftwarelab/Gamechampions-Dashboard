import React from "react";
import { styled, withTheme } from "~theme";
import { SpaceStyle, SizeStyle, BoxShadowStyle } from "~components/styles";

const Thumbnail = ({
  src,
  srcSet,
  title,
  alt,
  margin,
  padding,
  width,
  borderRadius,
  height,
  onClick,
  className
}) => (
  <ThumbnailStyle
    src={src}
    srcSet={srcSet}
    title={title}
    alt={alt}
    margin={margin}
    padding={padding}
    width={width}
    height={height}
    borderRadius={borderRadius}
    className={className}
    onClick={onClick}
  />
);

export default withTheme(Thumbnail);

const ThumbnailStyle = styled.img`
  object-fit: cover;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "50%")};
  background-color: ${({ theme }) => theme.colors.lightenColorLight};
  ${SpaceStyle};
  ${SizeStyle};
  ${BoxShadowStyle};
`;
