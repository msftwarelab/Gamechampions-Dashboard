import React from "react";
import { default as styled } from "styled-components";
import { SizeStyle, SpaceStyle } from "~components/styles";

const Image = ({
  src,
  title,
  alt,
  width,
  height,
  minHeight,
  maxHeight,
  margin,
  onClick,
  objectFit = "cover",
  opacity = 1,
  filter = null,
  className
}) => {
  return (
    <ImageStyled
      src={src}
      title={title}
      alt={alt}
      width={width}
      height={height}
      minHeight={minHeight}
      maxHeight={maxHeight}
      margin={margin}
      className={className}
      onClick={onClick}
      objectFit={objectFit}
      filter={filter}
      opacity={opacity}
    />
  );
};

export default Image;

const ImageStyled = styled.img`
  ${SizeStyle};
  ${SpaceStyle};

  object-fit: ${({ objectFit }) => objectFit};
  opacity: ${({ opacity }) => opacity};
  ${({ filter }) => (filter ? `filter: ${filter}` : "")};
`;
