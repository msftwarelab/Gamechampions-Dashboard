import { NavLink } from "react-router-dom";
import { styled, media } from "~theme";

const StyledLink = styled(NavLink)`
  text-transform: uppercase;
  padding: 0.4rem 0.4em;

  ${media.sm`
    padding: 0.4rem 1em;
  `};

  color: ${({ theme }) => theme.colors.fontNobelColor};

  &:visited {
    color: ${({ theme }) => theme.colors.fontNobelColor};
  }
  &:hover {
    color: ${({ theme }) => theme.colors.fontNobelColor};
  }
  &.active {
    color: ${({ theme }) => theme.colors.primary};
    &:after {
      content: "\\2022";
      font-size: 2.8rem;
      margin-top: -0.4rem;
      display: block;
      text-align: center;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default StyledLink;
