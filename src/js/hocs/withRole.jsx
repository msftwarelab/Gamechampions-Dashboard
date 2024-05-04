import React from "react";
import { connect } from "react-redux";
import hoistNonReactStatic from "hoist-non-react-statics";
import { selectAuth } from "~containers/app/reducer";

const withRole = WrappedComponent => {
  class RoleChecker extends React.PureComponent {
    hasRoleAccess() {
      const { authentication = {} } = this.props;
      const { role } = authentication.toJS();
      const roles = WrappedComponent.Roles;

      if (roles) {
        if (roles.includes(role)) {
          return true;
        }
        return false;
      } else {
        // component is not based on role
        return true;
      }
    }

    render() {
      let component = null;

      if (this.hasRoleAccess()) {
        component = <WrappedComponent {...this.props} />;
      }

      return component;
    }
  }

  hoistNonReactStatic(RoleChecker, WrappedComponent);

  const mapStateToProps = state => ({
    authentication: selectAuth(state)
  });

  return connect(mapStateToProps, null)(RoleChecker);
};

export default withRole;
