import { styled } from "~theme";

export const NotificationsList = styled("ul")`
  padding: 0;
  margin: 0;
  background: ${({ theme }) => theme.colors.white};
  right: 0;
  top: 0;
  width: 100%;
  border-radius: 3px 3px 0px 0px;
`;
