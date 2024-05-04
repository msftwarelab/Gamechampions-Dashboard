import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { setBoundaryError } from "~containers/app/actions";

// HOC for catching errors from React tree up to WrappedComponent
const withErrorBoundary = WrappedComponent =>
  class ErrorBoundary extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    componentDidCatch() {
      this.props.onSetBoundaryError(true);
      this.setState({ hasError: true });
    }

    render() {
      if (this.state.hasError) {
        return <WrappedComponent {...this.props} />;
      }
      return this.props.children;
    }
  };

const mapDispatchToProps = dispatch => {
  return {
    onSetBoundaryError: data => dispatch(setBoundaryError(data))
  };
};

export default compose(connect(null, mapDispatchToProps), withErrorBoundary);
