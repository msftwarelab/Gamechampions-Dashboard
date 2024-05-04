import React from "react";
import { connect } from "react-redux";

import AddToHomeScreen from "../a2hs/a2hs";
import PushNotificationToggle from "../../components/push/push";
import { withAuth, withPage } from "~hocs";
import * as CONSTANTS from "./constants";
import { fetchSettings, setPushEnabled, getSettings } from "./actions";
import { selectIsPushEnabled } from "./reducer";
import hoistStatics from "hoist-non-react-statics";
import { withTranslation } from "react-i18next";

class Settings extends React.PureComponent {
  // returns the JSX that will be rendered for this component
  render() {
    const { settings, onSetPushEnabled, t } = this.props;
    return (
      <div className="content">
        <section className="card">
          <ul className="setting__list">
            {process.env.ALLOW_PUSH_NOTIFICATON && (
              <li className="setting__list__item">
                <PushNotificationToggle
                  title="Push Notifications"
                  html="Enable push notifications"
                  isPushEnabled={settings.isPushEnabled}
                  onSetPushEnabled={onSetPushEnabled}
                />
              </li>
            )}
            <li className="setting__list__item">
              <AddToHomeScreen className="setting__list__item__title">
                {t("SettingsAddToHomeScreen")}
              </AddToHomeScreen>
            </li>
            <li className="setting__list__item">
              <a
                href={process.env.AUTHOR_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="setting__list__item__title"
              >
                {`${t("SettingsAbout")} ${process.env.AUTHOR_NAME}`}
              </a>
            </li>
          </ul>
        </section>
      </div>
    );
  }

  static fetchData(store, { url, language }) {
    store.dispatch(fetchSettings({ url, language }));
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => ({
  isPushEnabled: selectIsPushEnabled(state)
});

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => ({
  onSetPushEnabled: data => dispatch(setPushEnabled(data))
});

export default withAuth(
  withPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(hoistStatics(withTranslation()(Settings), Settings)),
    getSettings,
    CONSTANTS.REDUCER_NAME
  )
);
