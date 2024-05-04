import { styled, media } from "~theme";

const ListStyle = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0.5em;
  margin: 0;
  list-style: none;
  flex: 1;
  overflow: auto;
  color: ${({ theme }) => theme.colors.primary};
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  ${media.md`
    color: ${({ theme }) => theme.colors.blackTransparent};
  `};
`;

export default ListStyle;
