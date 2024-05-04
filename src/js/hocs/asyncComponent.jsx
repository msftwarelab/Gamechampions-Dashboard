import React from "react";

const asyncComponent = importComponent => {
  return class AsyncComponent extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = { component: null };
    }

    componentDidMount() {
      importComponent().then(cmp => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
