import React from "react";
import { connect } from "react-redux";
import {
  updateNotificationAsRead,
  resetNewNotification,
  setNewNotificationActive,
  removeOldNotification
} from "./actions";
import NotifSnackBar from "~components/custom/notifications/notifSnackBar";
import {
  selectNewNotificationActive,
  selectNewNotificationArray
} from "./reducer";
import { withRouter } from "react-router-dom";
import { NOTIFICATION_TYPE } from "./constants";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectAuth } from "~containers/app/reducer";

class NotificationsSnackBar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.dismissNotification = this.dismissNotification.bind(this);
    this.onClickNotification = this.onClickNotification.bind(this);
  }

  dismissNotification() {
    const { onResetNewNotification, onRemoveOldNotification } = this.props;
    onRemoveOldNotification();
    onResetNewNotification();
  }

  componentDidUpdate() {
    const {
      newNotificationActive,
      newNotificationArray,
      onSetActiveNewNotification
    } = this.props;

    if (
      newNotificationArray &&
      newNotificationArray.size > 0 &&
      newNotificationActive === null
    ) {
      onSetActiveNewNotification(newNotificationArray.get(0));
    }
  }
  onClickNotification(notification) {
    const { history, onUpdateNotification, selectedLanguage } = this.props;
    var type = notification && notification.get("type");
    onUpdateNotification(notification.toJS());
    this.dismissNotification();
    switch (type) {
      case NOTIFICATION_TYPE.MATCH:
        history.push(
          `/${selectedLanguage}/match-lobby/${notification.get("actionId")}`
        );
        break;
      case NOTIFICATION_TYPE.PLAYER:
        history.push(
          `/${selectedLanguage}/player-details/${notification.get("actionId")}`
        );
        break;
      default:
    }
  }

  render() {
    const { newNotificationActive } = this.props;
    return newNotificationActive ? (
      <NotifSnackBar
        notification={newNotificationActive}
        onClickNotification={this.onClickNotification}
        dismissNotification={this.dismissNotification}
      />
    ) : null;
  }
}

const mapStateToProps = state => ({
  authentication: selectAuth(state),
  selectedLanguage: selectSelectedLanguage(state),
  newNotificationActive: selectNewNotificationActive(state),
  newNotificationArray: selectNewNotificationArray(state)
});

const mapDispatchToProps = dispatch => ({
  onUpdateNotification: data => dispatch(updateNotificationAsRead(data)),
  onResetNewNotification: () => dispatch(resetNewNotification()),
  onSetActiveNewNotification: data => dispatch(setNewNotificationActive(data)),
  onRemoveOldNotification: () => dispatch(removeOldNotification())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NotificationsSnackBar)
);
