import React, { Component } from "react";
import { withTheme } from "~theme";
import merge from "deepmerge";

const withBaseComponent = WrappedComponent => {
  class BaseComponent extends Component {
    render() {
      const { overrideTheme, theme = {} } = this.props;
      let componentThemes = null;

      if (overrideTheme) {
        componentThemes = merge(theme, this.props.overrideTheme);
      }

      return (
        <WrappedComponent {...this.props} theme={componentThemes || theme} />
      );
    }
  }

  return withTheme(BaseComponent);
};

/** @component */
export default withBaseComponent;
