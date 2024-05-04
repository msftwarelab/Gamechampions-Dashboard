import { Link } from "react-router-dom";
import { styled } from "~theme";

const CloseButton = styled(Link)`
  &:after {
    position: absolute;
    top: 0;
    right: -0.65em;
    bottom: 0;
    display: inline-block;
    width: 1.3em;
    height: 1.3em;
    margin: auto;
    content: "\\2a09";
    font-size: 1.2em;
    text-align: center;
    color: #999;
    background-color: #fff;
    border: solid 1px #e6e6e6;
    border-radius: 1em;
  }
`;

export default CloseButton;
