import React from "react";
import { connect } from "react-redux";
import {
  updateNotificationAsRead,
  getNotifications,
  getNotificationsAsUnread
} from "./actions";
import NotificationsDropdown from "~components/custom/notifications/notificationsPopup";
import { selectUnreadNotifications, selectPopupNotifications } from "./reducer";
import { withRouter } from "react-router-dom";
import { NOTIFICATION_TYPE, PAGE, PAGE_SIZE, INTERVAL } from "./constants";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectAuth } from "~containers/app/reducer";

class NotificationsPopup extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      openDropdown: false
    };

    this.toggling = this.toggling.bind(this);
    this.onClickShowAllNotification = this.onClickShowAllNotification.bind(
      this
    );
    this.onClickNotification = this.onClickNotification.bind(this);
  }

  toggling() {
    const { openDropdown } = this.state;
    const { onLoadNotifications, selectedLanguage } = this.props;
    if (openDropdown === false) {
      onLoadNotifications({
        page: PAGE,
        pageSize: PAGE_SIZE,
        language: selectedLanguage
      });
    }
    this.setState({ openDropdown: !openDropdown });
  }

  setNotificationsInterval() {
    const { onLoadUnreadNotifications } = this.props;

    this.interval = setInterval(() => {
      const { authentication } = this.props;
      const { token } = authentication.toJS();
      if (token) {
        onLoadUnreadNotifications();
      }
    }, INTERVAL);
  }

  componentDidMount() {
    this.setNotificationsInterval();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps) {
    const { authentication: prevAuthentication } = prevProps;
    const { token: prevToken } = prevAuthentication.toJS();

    const { authentication, onLoadUnreadNotifications } = this.props;
    const { token } = authentication.toJS();

    if (prevToken != token && token) {
      onLoadUnreadNotifications();
    }
  }

  onClickShowAllNotification() {
    const { history, selectedLanguage } = this.props;
    this.setState({ openDropdown: false });
    history.push(`/${selectedLanguage}/notifications`);
  }

  onClickNotification(notification) {
    const { history, onUpdateNotification, selectedLanguage } = this.props;
    const isRead = notification && notification.get("isRead");
    var type = notification && notification.get("type");
    this.setState({ openDropdown: false });
    if (!isRead) onUpdateNotification(notification.toJS());
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
    const { openDropdown } = this.state;
    const { notifications, unreadNotifications } = this.props;
    return (
      <NotificationsDropdown
        openDropdown={openDropdown}
        options={notifications}
        toggling={this.toggling}
        onClickShowAllNotification={this.onClickShowAllNotification}
        onClickNotification={this.onClickNotification}
        unreadNotifications={unreadNotifications}
      />
    );
  }
}

const mapStateToProps = state => ({
  notifications: selectPopupNotifications(state),
  selectedLanguage: selectSelectedLanguage(state),
  unreadNotifications: selectUnreadNotifications(state),
  authentication: selectAuth(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadNotifications: data => dispatch(getNotifications(data)),
  onLoadUnreadNotifications: () => dispatch(getNotificationsAsUnread()),
  onUpdateNotification: data => dispatch(updateNotificationAsRead(data))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NotificationsPopup)
);
