import { styled } from "~theme";
import React from "react";

const Badge = ({ number, scale }) => {
  return (
    <BadgeStyle scale={scale}>{number > 99 ? "+99" : `${number}`}</BadgeStyle>
  );
};

export default Badge;

const BadgeStyle = styled.div`
  background-color: ${({ theme }) => theme.colors.indianRed};
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fonts.small};
  transform: scale(${({ scale }) => (scale ? scale : 1)});
  height: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  flex-shrink: 0;
`;
