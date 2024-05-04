import React from "react";
import { Icon, Span } from "~components/atoms";

const InputButton = props => {
  return (
    <button
      type={props.type}
      className={`button ${props.className} ${
        props.loading ? "button--loading" : ""
      }`}
      disabled={props.disabled}
      onClick={props.onButtonClick}
      onTouchStart={e => {
        e.target.classList.add("button--touch");
      }}
      onTouchEnd={e => {
        e.target.classList.remove("button--touch");
      }}
    >
      {props.icon && <Icon viewBox="0 0 32 32" scale={1.5} icon={props.icon} />}
      <Span className="button--label">{props.value}</Span>
    </button>
  );
};

export default InputButton;
