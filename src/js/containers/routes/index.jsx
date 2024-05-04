import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter, matchPath } from "react-router-dom";

import { fetchRoutes, getGoMaps } from "./actions";
import { selectGoMaps } from "./reducer";
import AppAbstract from "../app/abstract";
import Layout from "../layout/";
import PageNotFound from "../pageNotFound/";
import Settings from "../settings/";
import { ErrorBoundary } from "../errorBoundary";
import { getRouteComponent } from "~routes";
import { selectAuth } from "../app/reducer";

class RoutesWrapper extends React.PureComponent {
  constructor(props) {
    super(props);

    const { routes } = this.props;

    this.layoutRoutes = routes.filter(item => !item.get("modal"));
    this.modalRoutes = routes.filter(item => item.get("modal"));
    this.previousLocation = this.props.location;
  }

  componentDidMount() {
    let { authentication, onLoadGoMaps } = this.props;

    if (authentication.get("token")) {
      onLoadGoMaps();
    }
  }

  componentDidUpdate(nextProps) {
    let { location, routes, authentication, onLoadGoMaps } = this.props;

    if (nextProps.history.action !== "POP") {
      let route = routes.find(item => {
        return matchPath(location.pathname, {
          path: item.get("url"),
          exact: true
        });
      });

      if (route && !route.get("modal")) {
        this.previousLocation = this.props.location;
      }
    }

    if (
      authentication.get("token") &&
      nextProps.authentication.get("token") !== authentication.get("token")
    ) {
      onLoadGoMaps();
    }
  }

  render() {
    const { params, location, goMaps } = this.props;

    const goMapUrl = goMaps.find(item => {
      return item.get("key") === location.pathname;
    });

    let isModal = false;

    if (location) {
      isModal = this.modalRoutes.some(item => {
        return matchPath(location.pathname, {
          path: item.get("url"),
          exact: true
        });
      });
    }

    return (
      <Switch>
        <Route
          path="/settings"
          render={props => (
            <Layout>
              <ErrorBoundary>
                <Settings {...props} routeName={"Settings"} />
              </ErrorBoundary>
            </Layout>
          )}
        />
        <Route>
          <Layout showBreadcrumbs={false}>
            <Route component={AppAbstract} />
            <Switch location={isModal ? this.previousLocation : location}>
              {goMapUrl && (
                <Redirect to={`https://${goMapUrl.get("urlValue")}`} />
              )}
              {this.layoutRoutes.map(route => {
                const Component = getRouteComponent(route.get("name"))
                  .component;
                return (
                  <Route
                    key={route.get("url")}
                    path={route.get("url")}
                    render={props => (
                      <ErrorBoundary>
                        <Component
                          {...props}
                          {...params}
                          previousLocation={this.previousLocation}
                          routeName={route.get("name")}
                        />
                      </ErrorBoundary>
                    )}
                    exact={route.get("exact")}
                  />
                );
              })}
              {!isModal && (
                <Route
                  render={props => (
                    <ErrorBoundary>
                      <PageNotFound {...props} routeName={"PageNotFound"} />
                    </ErrorBoundary>
                  )}
                />
              )}
            </Switch>
            {isModal
              ? this.modalRoutes.map(route => {
                  const Component = getRouteComponent(route.get("name"))
                    .component;
                  return (
                    <Route
                      key={route.get("url")}
                      path={route.get("url")}
                      render={props => (
                        <ErrorBoundary>
                          <Component
                            {...props}
                            {...params}
                            previousLocation={this.previousLocation}
                            routeName={route.get("name")}
                          />
                        </ErrorBoundary>
                      )}
                      exact={route.get("exact")}
                    />
                  );
                })
              : null}
          </Layout>
        </Route>
      </Switch>
    );
  }

  static fetchData(store) {
    return store.dispatch(fetchRoutes());
  }
}

const mapStateToProps = state => ({
  authentication: selectAuth(state),
  goMaps: selectGoMaps(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadGoMaps: () => dispatch(getGoMaps())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RoutesWrapper)
);
