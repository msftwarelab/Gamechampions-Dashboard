import { styled } from "~theme";
import Button from "~components/atoms/button";
import { ColouringStyle } from "~components/styles";

const CTAButton = styled(Button)`
  ${ColouringStyle};

  padding: 10px 16px;
  border: solid 1px;

  &:visited {
    color: ${props => props.color};
  }

  &:hover {
    border: solid 1px ${props => props.hoverColor};
    color: ${props => props.hoverColor};
    opacity: ${props => props.opacity};
    background-color: transparent;
  }
`;

export default CTAButton;
