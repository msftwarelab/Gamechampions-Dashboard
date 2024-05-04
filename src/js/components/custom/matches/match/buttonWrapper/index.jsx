import { styled, media } from "~theme";

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  ${media.md`
    justify-content: flex-end;
    width: auto;
  `};
`;

export default ButtonWrapper;
