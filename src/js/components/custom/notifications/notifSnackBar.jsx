import React from "react";

import { withTheme } from "~theme";
import { NotificationsSnackBar } from "./notificationsSnackBar";
import { FlexBox, Image } from "~components/atoms";
import { SnackBarAction } from "./snackBarAction";
import { TIMOUT_INTERVAL } from "~containers/notifications/constants";
import { withTranslation } from "react-i18next";

class NotifSnackBar extends React.Component {
  componentDidMount() {
    const { dismissNotification, notification } = this.props;
    const challengeSoundUrl = "/img/audio/challenge.mp3";
    const challengeAudio = new Audio(challengeSoundUrl);
    if (
      notification.get("message") === "MatchStartedMessage" ||
      notification.get("message") === "ChallengeAcceptedMessage"
    ) {
      challengeAudio.play();
    }
    this.timer = setTimeout(() => {
      dismissNotification();
    }, TIMOUT_INTERVAL);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  shouldComponentUpdate(nextProps) {
    const { notification } = this.props;

    return nextProps.notification.get("id") !== notification.get("id");
  }

  render() {
    const {
      dismissNotification,
      onClickNotification,
      notification,
      t
    } = this.props;

    return (
      <NotificationsSnackBar>
        <FlexBox justifyContent="center" alignItems="center">
          <Image src="/img/icons/bell_icon.svg" />
          <FlexBox
            fontSize="14px"
            width="80%"
            justifyContent="center"
            onClick={() => onClickNotification(notification)}
          >
            {notification && t(notification.get("message"))}
          </FlexBox>
        </FlexBox>
        <SnackBarAction onClick={dismissNotification}>
          {t("NotificationDismissAction")}
        </SnackBarAction>
      </NotificationsSnackBar>
    );
  }
}

export default withTheme(withTranslation()(NotifSnackBar));
