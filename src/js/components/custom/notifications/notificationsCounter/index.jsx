import { styled } from "~theme";

export const NotificationCounter = styled("div")`
  background-color: ${({ theme }) => theme.colors.indianRed};
  border-radius: 2px;
  height: 15px;
  width: 15px;
  padding: 1px 4px;
  font-size: 10px;
  position: absolute;
  z-index: 1;
  top: 10px;
  right: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
