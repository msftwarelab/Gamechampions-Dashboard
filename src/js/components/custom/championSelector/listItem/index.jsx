import { styled } from "~theme";

export const ListItem = styled("li")`
  display: block;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25rem;
  font-weight: 500;
  user-select: none;
`;
