import React from "react";

import Overlay from "../nav/overlay";

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.keydownHandler = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keydownHandler);
    document.body.style.overflowY = "hidden";
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownHandler);
    document.body.style.overflowY = "visible";
  }

  handleKeyDown(e) {
    if (e.key === "Escape" && !document.activeElement.type) {
      this.props.onClick();
    }
  }

  render() {
    const {
      className,
      modalClassName,
      children,
      onClick,
      wide,
      isGlobalChat
    } = this.props;
    return (
      <section className={className || ""}>
        <Overlay
          isVisible={true}
          onClick={onClick}
          isGlobalChat={isGlobalChat}
        />
        <div
          className={`modal ${
            modalClassName ? `modal--${modalClassName}` : ""
          } ${wide ? "modal--wide" : ""}`}
        >
          {children}
        </div>
      </section>
    );
  }
}

export default Modal;
