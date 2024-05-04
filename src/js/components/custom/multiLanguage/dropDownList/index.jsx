import { styled } from "~theme";

export const DropDownList = styled("ul")`
  cursor: pointer;
  border-radius: 3px;
  z-index: 999;
  position: absolute;
  padding: 0 0 5px 0;
  margin: 0;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.greyDark};
  box-sizing: border-box;
  font-size: 1.3rem;
  font-weight: 500;
  width: 60px;
  ${({ isDirectionTop }) =>
    isDirectionTop
      ? `
      bottom: 33px;
    `
      : ""};
`;
