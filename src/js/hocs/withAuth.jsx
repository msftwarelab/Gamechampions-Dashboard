import React from "react";
import { connect } from "react-redux";
import hoistNonReactStatic from "hoist-non-react-statics";
import { matchPath } from "react-router-dom";
import ExecutionEnvironment from "exenv";
import { selectAuth } from "~containers/app/reducer";
import {
  setAuthentication,
  resetAuthentication
} from "~containers/app/actions";
import { selectRoutes } from "~containers/routes/reducer";
import Api from "~service/main";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";

const withAuth = WrappedComponent => {
  class Authenticate extends React.PureComponent {
    componentDidMount() {
      this.syncToken();
      this._checkAndRedirect();
    }

    UNSAFE_componentWillReceiveProps() {
      this.syncToken();
      this._checkAndRedirect();
    }

    syncToken() {
      const apiToken = Api.getToken();
      const apiRefreshToken = Api.getRefreshToken();
      const {
        authentication = {},
        onSetAuthentication,
        onResetAuthentication
      } = this.props;
      const { token, refreshToken } = authentication.toJS();

      // if token or refresh token is updated by authenticatedApiService
      // we need to sync the new token with the store
      if (apiToken !== token || apiRefreshToken !== refreshToken) {
        // token is removed due to 401
        if (!apiToken) {
          onResetAuthentication();
        } else {
          // token is just updated so update in store as well
          onSetAuthentication({
            ...authentication.toJS(),
            token: apiToken,
            refreshToken: apiRefreshToken
          });
        }

        this._checkAndRedirect();
      }
    }

    isAuthenticated() {
      const { authentication = {} } = this.props;
      const { token } = authentication.toJS();

      if (token) {
        return true;
      } else {
        return false;
      }
    }

    hasRoleAccess() {
      const { authentication = {} } = this.props;
      const { role } = authentication.toJS();
      const roles = this.getRoute().get("roles");

      if (roles) {
        if (roles.toJS().includes(role)) {
          return true;
        }
        return false;
      } else {
        // route is not based on role
        return true;
      }
    }

    getRoute() {
      return this.props.routes.find(item => {
        return matchPath(this.props.match.url, {
          path: item.get("url"),
          exact: true
        });
      });
    }

    _checkAndRedirect() {
      const { history, selectedLanguage, match = {} } = this.props;
      const { url } = match;

      if (!this.isAuthenticated() && !this.getRoute().get("isPublic")) {
        history.push(`/${selectedLanguage}/login?redirect_url=${url}`);
      } else if (!this.hasRoleAccess()) {
        history.push(`/${selectedLanguage}/arena`);
      }
    }

    render() {
      let component = null;

      if (ExecutionEnvironment.canUseDOM) {
        if (this.getRoute().get("isPublic")) {
          component = <WrappedComponent {...this.props} />;
        } else {
          if (this.isAuthenticated() && this.hasRoleAccess()) {
            component = <WrappedComponent {...this.props} />;
          }
        }
      } else {
        // if request comes from server,
        // server pipeline will handle the authentication validation
        component = <WrappedComponent {...this.props} />;
      }

      return component;
    }
  }

  hoistNonReactStatic(Authenticate, WrappedComponent);

  // maps the redux store state to the props related to the data from the store
  const mapStateToProps = state => ({
    routes: selectRoutes(state),
    authentication: selectAuth(state),
    selectedLanguage: selectSelectedLanguage(state)
  });

  // specifies the behaviour, which callback prop dispatches which action
  const mapDispatchToProps = dispatch => ({
    onSetAuthentication: data => dispatch(setAuthentication(data)),
    onResetAuthentication: () => dispatch(resetAuthentication())
  });

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
};

export default withAuth;
