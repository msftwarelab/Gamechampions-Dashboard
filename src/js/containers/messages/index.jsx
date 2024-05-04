import React from "react";
import { connect } from "react-redux";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import MessagesComponent from "~components/custom/messages";
import { withAuth, withPage } from "~hocs";
import { getPage } from "~containers/page/actions";
import { selectUnreadNotifications } from "~containers/notifications/reducer";
import { selectPersonalMessages } from "~containers/chat/reducer";

class Messages extends React.PureComponent {
  render() {
    const {
      match,
      selectedLanguage,
      unreadNotifications,
      personalMessages
    } = this.props;
    return (
      <MessagesComponent
        match={match}
        selectedLanguage={selectedLanguage}
        unreadNotifications={unreadNotifications}
        personalMessages={personalMessages}
      />
    );
  }
}

const mapStateToProps = state => ({
  personalMessages: selectPersonalMessages(state),
  selectedLanguage: selectSelectedLanguage(state),
  unreadNotifications: selectUnreadNotifications(state)
});

export default withAuth(withPage(connect(mapStateToProps)(Messages), getPage));
