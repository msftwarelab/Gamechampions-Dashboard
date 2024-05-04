import { media, styled } from "~theme";

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${media.md`
  flex: 1;
  width: 100%;
`};
`;

export default TextWrapper;
