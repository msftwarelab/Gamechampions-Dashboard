import React from "react";
import { styled, media } from "~theme";

const ScoreWrapperStyle = styled.input.attrs(() => ({}))`
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;

  color: black;
  border-radius: 3px;
  font-weight: bold;

  border: 1px solid #a9a9a9;

  text-align: center;

  width: 50px;
  height: 50px;
  font-size: 1.5em;
  margin: 0 15px 10px 15px;

  &:focus {
    outline: none;
    border-color: black;
  }

  ${media.md`
  width: 75px;
  font-size: 2em;
  height: 75px;
  `};
`;

export const ScoreWrapper = props => {
  return (
    <ScoreWrapperStyle
      {...props}
      onChange={e => {
        const regex = /^[0-9\b]+$/;
        (e.target.value === "" || regex.test(e.target.value)) &&
          props.onChange(e);
      }}
    />
  );
};
