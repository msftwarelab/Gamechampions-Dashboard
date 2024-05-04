import React from "react";

// This extends PureComponent instead of functional component because we use ref
export default class Overlay extends React.PureComponent {
  constructor(props) {
    super(props);

    this.addEventListener = this.addEventListener.bind(this);
    this.setVisible = this.setVisible.bind(this);

    this.state = {
      isVisible: props.isVisible
    };
  }

  componentDidUpdate() {
    const { isVisible } = this.props;
    if (
      isVisible !== undefined &&
      this.state.isVisible !== this.props.isVisible
    ) {
      this.setVisible(isVisible);
    }
  }

  componentDidMount() {
    const { onClick } = this.props;

    if (onClick) {
      this.addEventListener("click", onClick);
    }
  }

  render() {
    const { className = "", isGlobalChat } = this.props;

    return (
      <div
        className={`modal__overlay
          ${isGlobalChat ? "global-chat__overlay" : ""}
          ${className || ""}
          ${this.state.isVisible ? " modal__overlay--visible" : ""}`}
        ref={n => (this.element = n)}
      />
    );
  }

  addEventListener(event, callback) {
    this.element.addEventListener(event, e => {
      callback(e);
    });
  }

  setVisible(isVisible) {
    this.setState({ isVisible: isVisible });
  }

  toggle() {
    // toggle the class 'visible'
    let className = "modal__overlay--visible";
    if (this.element.classList) {
      this.element.classList.add(className);
    } else {
      let classes = this.element.className.split(" ");
      let existingIndex = classes.indexOf(className);

      if (existingIndex >= 0) {
        classes.splice(existingIndex, 1);
      } else {
        classes.push(className);
      }

      this.element.className = classes.join(" ");
    }
  }
}
