import { styled, media } from "~theme";

const ResponsiveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-grow: 1;

  ${media.md`
    flex-direction: row;
    justify-content: space-between;
    width: auto;
  `};
`;

export default ResponsiveWrapper;
