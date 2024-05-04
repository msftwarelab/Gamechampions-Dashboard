import React from "react";
import { connect } from "react-redux";
import {
  getNotifications,
  updateNotificationAsRead,
  fetchNotifications
} from "./actions";
import { selectNotifications } from "./reducer";
import { withRouter } from "react-router-dom";
import { NOTIFICATION_TYPE, PAGE, PAGE_SIZE_GET_ALL } from "./constants";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import NotificationsComponent from "~components/custom/notifications";

class Notifications extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClickNotification = this.onClickNotification.bind(this);
  }

  componentDidMount() {
    const { onLoadNotifications, selectedLanguage } = this.props;

    onLoadNotifications({
      page: PAGE,
      pageSize: PAGE_SIZE_GET_ALL,
      language: selectedLanguage
    });
  }

  onClickNotification(notification) {
    const { history, onUpdateNotification, selectedLanguage } = this.props;
    var type = notification && notification.get("type");
    onUpdateNotification(notification.toJS());
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
    const { notifications } = this.props;
    return (
      <NotificationsComponent
        options={notifications}
        onClickNotification={this.onClickNotification}
      />
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(
      fetchNotifications({
        pageData: {
          url,
          language,
          page: PAGE,
          pageSize: PAGE_SIZE_GET_ALL
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  notifications: selectNotifications(state),
  selectedLanguage: selectSelectedLanguage(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadNotifications: data => dispatch(getNotifications(data)),
  onUpdateNotification: data => dispatch(updateNotificationAsRead(data))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Notifications)
);
