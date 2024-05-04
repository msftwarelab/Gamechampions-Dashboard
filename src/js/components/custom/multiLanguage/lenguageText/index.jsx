import { styled } from "~theme";

export const LanguageText = styled("span")`
  display: block;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  user-select: none;
`;
