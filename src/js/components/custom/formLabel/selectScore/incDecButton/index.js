import { styled } from "~theme";

export const IncDecButton = styled("button")`
  padding: 2px 35px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.xLarge};
  font-weight: ${({ theme }) => theme.fonts.bold};
  font-family:  monospace;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  cursor: pointer;
  transition: background 0.8s;
  background-position: center;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) =>
      theme.colors.primaryLighter} radial-gradient(circle, transparent 1%, ${({
  theme
}) => theme.colors.primaryLighter} 1%) center/15000%;

  &:active {
      background-color: ${({ theme }) => theme.colors.primaryLightest};
      background-size: 100%;
      transition: background 0s;
    }
`;
