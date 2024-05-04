import { styled, media } from "~theme";

const GridList = styled.ul`
  display: grid;
  padding: 0;
  margin: 0 0 0.5rem 0;
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  grid-template-columns: 1fr 1fr;
  ${media.md`
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
`};
`;

export default GridList;
