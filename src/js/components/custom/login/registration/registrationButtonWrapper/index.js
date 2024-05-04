import { styled, media } from "~theme";

export const RegistrationButtonWrapper = styled("div")`
  text-align: center;
  margin: -1em 1em;
  ${media.md`
    text-align: left 
`};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;
