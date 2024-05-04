import { styled } from "~theme";

export const MiddleWrapper = styled("div")`
  color: ${({ theme }) => theme.colors.grey};
  font-family: monospace;
  text-align: center;
  font-size: 3.5em;
  font-weight: bolder;
  height: 30px;
  padding: 0 0 40px 0;
`;
