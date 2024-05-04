import { styled } from "~theme";

export const ListItem = styled("li")`
  list-style: none;
  padding-left: 5px;
  text-transform: uppercase;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.darkenColorDark};
`;
