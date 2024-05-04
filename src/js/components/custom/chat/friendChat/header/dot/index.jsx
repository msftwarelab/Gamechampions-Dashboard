import { styled } from "~theme";

export const Dot = styled.div`
  height: 16px;
  width: 16px;
  background-color: ${({ theme }) => theme.colors.indianRed};
  border-radius: 50%;
  display: inline-block;
  margin: 0 1em;
`;
