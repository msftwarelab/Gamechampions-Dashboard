import React from "react";
import { withRouter, matchPath } from "react-router-dom";
import { connect } from "react-redux";

import { selectRoutes } from "../../containers/routes/reducer";

class ScrollToTop extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      blockScroll: true
    };
  }

  componentDidUpdate(prevProps) {
    const { routes, location } = this.props;
    if (location !== prevProps.location) {
      let routeIndex = routes.findIndex(item => {
        return (
          matchPath(location.pathname, {
            path: item.get("url"),
            exact: true
          }) !== null
        );
      });

      let previousRouteIndex = routes.findIndex(item => {
        return (
          matchPath(prevProps.location.pathname, {
            path: item.get("url"),
            exact: true
          }) !== null
        );
      });

      if (routeIndex !== -1) {
        if (
          routes.get(routeIndex).get("modal") ||
          routes.get(previousRouteIndex).get("modal")
        ) {
          this.setState({ blockScroll: true });
        } else {
          this.setState({ blockScroll: false });
        }
      }
    }

    if (!this.state.blockScroll) {
      window.scrollTo(0, 0);
      this.setState({ blockScroll: true });
    }
  }

  render() {
    return null;
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => ({
  routes: selectRoutes(state)
});

export default withRouter(connect(mapStateToProps)(ScrollToTop));
