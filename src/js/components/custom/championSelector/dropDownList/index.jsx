import { styled } from "~theme";

export const DropDownList = styled("ul")`
  cursor: pointer;
  border-bottom-left-radius: 26px;
  border-bottom-right-radius: 26px;
  z-index: 999;
  position: absolute;
  padding: 0 0 5px 0;
  margin: -2px 0px 0px 0px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.greyDark};
  box-sizing: border-box;
  font-size: 1.3rem;
  font-weight: 500;
  width: 277px;
  height: 381px;
  overflow: auto;
`;
