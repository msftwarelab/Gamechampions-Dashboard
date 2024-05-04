import { styled, media } from "~theme";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;

  ${media.md`
    width: auto;
  `};
`;

export default ContentWrapper;
