import { styled } from "~theme";
export const DropDownHeader = styled("div")`
  display: flex;
  width: 332px;
  height: 100%;
  align-items: center;
  padding: 0.2em 0.2rem 0.2rem 1.6875rem;
  border-radius: 100px;
  border: 1px solid ${({ theme }) => theme.colors.greyDark};
  margin: 0 2.5rem 1px 0;
  font-weight: 500;
  font-size: 1.3rem;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.darkenColorDark};
  cursor: pointer;
`;
