import { styled } from "~theme";

export const MessageBoxWrapper = styled("div")`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 2.625em;
  border-top: 1px solid ${({ theme }) => theme.colors.darkenColorLight};
`;
