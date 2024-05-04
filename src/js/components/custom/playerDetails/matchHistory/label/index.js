import React from "react";
import { styled } from "~theme";

const Label = ({ text, last }) => (
  <LabelStyle last={last}>
    <Text>{text}</Text>
  </LabelStyle>
);

const LabelStyle = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: ${props => (props.last ? "0" : "0.5em")};
  padding: 0 0.4em;
  background-color: #27778a;
  font-size: 0.75em;
  border-radius: 2em;
  color: #fff;
`;

const Text = styled.span`
  margin: 0 0.5em;
`;

export default Label;
