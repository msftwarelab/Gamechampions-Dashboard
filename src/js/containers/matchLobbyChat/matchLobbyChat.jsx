import React from "react";
import { connect } from "react-redux";

import { getMessages, createMessage } from "./actions";
import { selectMessages, selectIsNewMessage } from "./reducer";
import { INTERVAL_TIME } from "./constants";
import DynamicForm from "~components/molecules/dynamicForm";
import ChatBox from "~components/molecules/chatBox";
import MatchLobbyChatStyle from "~components/custom/matchLobby/matchLobbyContent/matchLobbyChat";
import { selectProfile } from "~containers/myaccount/reducer";
import { FORM_FIELDS } from "~containers/chat/constants";
import { Paragraph } from "~components/atoms";
import { selectMatch } from "~containers/matchLobby/reducer";
import { lastMessageRead } from "~containers/chat/actions";

class MatchLobbyChat extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onChatSubmit = this.onChatSubmit.bind(this);
    this.setChatInterval = this.setChatInterval.bind(this);
    this.initChat = this.initChat.bind(this);
    this.chatListRef = React.createRef();
  }

  onChatSubmit(data, e) {
    const { onCreate, profile, matchData } = this.props;
    if (matchData && matchData.get("challengee")) {
      data.userId = profile ? profile.get("id") : null;
      data.friendId =
        matchData && matchData.get("challenger").get("id") == data.userId
          ? matchData.get("challengee").get("id")
          : matchData.get("challenger").get("id");

      e.target.reset();
      e.target[0].value = "";
      let input = e.target[0];
      if (input) {
        input.focus();
      }
      return onCreate(data).then(() => {
        if (this.chatListRef.current) {
          this.chatListRef.current.scrollTop = this.chatListRef.current.scrollHeight;
        }
      });
    }
  }

  setChatInterval() {
    const {
      onLoadMessages,
      profile,
      matchData,
      onLoadlastMessageRead
    } = this.props;
    if (matchData && matchData.get("challengee")) {
      let userId = profile && profile.get("id");
      let friendId =
        matchData && matchData.get("challenger").get("id") == userId
          ? matchData.get("challengee").get("id")
          : matchData.get("challenger").get("id");
      onLoadMessages({ friendId, userId }).then(response => {
        let lastUnreadMessage =
          response && response.find(x => !x.isRead && !x.isFromSender);
        if (lastUnreadMessage) {
          onLoadlastMessageRead({
            messageId: lastUnreadMessage.id,
            userId: lastUnreadMessage.userId
          });
          if (this.chatListRef.current) {
            this.chatListRef.current.scrollTop = this.chatListRef.current.scrollHeight;
          }
        }
      });
    }
  }

  initChat() {
    const { onLoadMessages, profile, matchData } = this.props;
    let userId = profile ? profile.get("id") : null;
    if (matchData && matchData.get("challengee")) {
      let friendId =
        matchData && matchData.get("challenger").get("id") == userId
          ? matchData.get("challengee").get("id")
          : matchData.get("challenger").get("id");
      onLoadMessages({ friendId, userId }).then(() => {
        if (this.chatListRef.current) {
          this.chatListRef.current.scrollTop = this.chatListRef.current.scrollHeight;
        }
      });
    }
  }

  componentDidMount() {
    this.initChat();

    this.interval = setInterval(() => {
      this.setChatInterval();
    }, INTERVAL_TIME);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { messages, matchData, profile } = this.props;
    const opponent =
      profile.get("id") == matchData.get("challengerId")
        ? matchData.get("challengee")
        : matchData.get("challenger");
    return (
      <MatchLobbyChatStyle>
        <ChatBox
          ref={this.chatListRef}
          messages={messages}
          opponent={opponent}
          title={
            <Paragraph
              padding={{ base: "1em 0", md: "0.25em 0" }}
            >{`Chat`}</Paragraph>
          }
        />
        <DynamicForm
          submitButtonLabel="ButtonDynamicFormSend"
          formFields={FORM_FIELDS}
          onSubmit={this.onChatSubmit}
          className="public-chat__form"
        />
      </MatchLobbyChatStyle>
    );
  }
}

const mapStateToProps = state => ({
  messages: selectMessages(state),
  isNewMessage: selectIsNewMessage(state),
  profile: selectProfile(state),
  matchData: selectMatch(state)
});

const mapDispatchToProps = dispatch => {
  return {
    onLoadMessages: data => dispatch(getMessages(data)),
    onCreate: data => dispatch(createMessage(data)),
    onLoadlastMessageRead: data => dispatch(lastMessageRead(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchLobbyChat);
