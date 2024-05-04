import { styled, media } from "~theme";

const MainWrapper = styled.section`
  height: ${({ height }) => height || `100%`};
  padding: 1em 0.5em 0.5em;
  overflow-y: auto;
  transition: color 0.3s;
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  ${media.md`
    margin: 0 0.25rem;
    padding: 0 1.25rem;
    // its required to set this color due to scroll bar 
    color: ${({ theme }) => theme.colors.blackTransparent};
    height: ${({ height }) => height || `100%`};
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
  `};
`;

export default MainWrapper;
