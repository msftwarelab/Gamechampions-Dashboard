import { styled } from "~theme";

export const WalletText = styled("p")`
  display: block;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.fontSizeNormal};
  font-weight: ${({ theme }) => theme.fonts.bold};
  align-self: center;
  margin: 0;
  width: 4.5em;
`;
