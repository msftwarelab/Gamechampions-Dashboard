import { styled } from "~theme";

export const MessageWrapper = styled("div")`
  display: ${props => (props.isVisible ? "block" : "none")};
`;
