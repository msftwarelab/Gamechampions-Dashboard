import { styled } from "~theme";

export const SnackBarAction = styled("span")`
  display: flex;
  text-transform: uppercase;
  font-size: 15px;
  align-items: center;
  justify-content: end;
  color: ${({ theme }) => theme.colors.primary};
`;
