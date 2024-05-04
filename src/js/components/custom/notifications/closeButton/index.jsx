import { styled } from "~theme";

const CloseButton = styled("div")`
  &:after {
    display: inline-block;
    width: 1.3em;
    height: 1.3em;
    margin: auto;
    content: "\\2a09";
    font-size: 1.2em;
    text-align: center;
    color: black;
    cursor: pointer;
  }
`;

export default CloseButton;
