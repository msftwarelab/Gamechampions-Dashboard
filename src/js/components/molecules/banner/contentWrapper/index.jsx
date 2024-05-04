import { media, styled } from "~theme";

const ContentWrapper = styled.div`
  position: relative;
  padding: 3rem 0.375rem 1.5rem;
  ${media.md`
  padding: 2.5rem 2rem 1rem;
`};
`;

export default ContentWrapper;
