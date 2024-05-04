import { styled, media } from "~theme";

export const NotificationShowAllButton = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  height: 45px;
  cursor: pointer;
  ${media.md`
  width: 23em;
`};
`;
