import { styled, media } from "~theme";

export const MainContainer = styled("div")`
  display: flex;
  flex-direction: column;

  ${media.md`
    flex-direction: row;
  `};
`;

export const TabContainer = styled("div")`
  display: flex;
  white-space: nowrap;
  overflow: auto;
  width: 100%;

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background: transparent;
  }

  ${media.md`
    display: block;
    width: 240px;
  `};
  }
`;

export const TabContentContainer = styled("div")`
  width: 100%;
`;
