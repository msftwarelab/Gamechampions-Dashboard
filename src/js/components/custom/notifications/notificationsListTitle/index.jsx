import { styled } from "~theme";

export const NotificationsListTitle = styled("div")`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gainsboro};
  padding: 5px 5px 5px 20px;
  justify-content: space-between;
`;
