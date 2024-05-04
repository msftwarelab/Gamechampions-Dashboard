import { styled } from "~theme";
export const DropDownHeader = styled("div")`
  display: flex;
  width: 60px;
  height: 32px;
  align-items: center;
  justify-content: center;
  padding: 0.2em;
  border-radius: 100px;
  border: 1px solid ${({ theme }) => theme.colors.greyDark};
  margin: 0 0 1px;
  font-weight: 500;
  font-size: 1.3rem;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.darkenColorDark};
  cursor: pointer;
`;
