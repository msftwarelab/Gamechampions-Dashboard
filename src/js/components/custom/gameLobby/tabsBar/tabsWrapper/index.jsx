import { styled, media } from "~theme";

const TabsWrapper = styled("div")`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkenColorLight};
  background-color: ${({ theme }) => theme.colors.white};
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }

  ${media.md`
    width: auto;
    margin: 0 1rem;
    border-bottom: unset
  `};
`;

export default TabsWrapper;
