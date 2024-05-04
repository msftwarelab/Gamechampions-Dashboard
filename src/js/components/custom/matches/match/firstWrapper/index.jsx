import { media, styled } from "~theme";

const FirstWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  gap: 1em;
  ${media.md`
  justify-content: space-between;
`};
`;

export default FirstWrapper;
