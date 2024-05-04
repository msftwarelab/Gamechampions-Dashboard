import { styled } from "~theme";

export const NotificationMessage = styled("span")`
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 300px;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.black};
`;
