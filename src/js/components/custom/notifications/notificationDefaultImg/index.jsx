import { styled } from "~theme";

export const NotificationDefaultImg = styled("div")`
  display: flex;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
`;
