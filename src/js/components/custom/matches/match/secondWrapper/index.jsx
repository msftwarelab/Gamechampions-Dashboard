import { styled, media } from "~theme";

const SecondWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 0.375em;

  ${media.md`
  align-items: flex-start;
`};
`;

export default SecondWrapper;
