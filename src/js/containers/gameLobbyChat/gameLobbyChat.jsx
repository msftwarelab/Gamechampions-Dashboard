import React from "react";
import { connect } from "react-redux";

import { getMessages, createMessage } from "./actions";
import { selectMessages, selectIsNewMessage } from "./reducer";
import { INTERVAL_TIME } from "./constants";
import DynamicForm from "~components/molecules/dynamicForm";
import ChatBox from "~components/molecules/chatBox";
import GameLobbyChatStyle from "~components/custom/gameLobby/gameLobbyChat";
import { selectProfile } from "~containers/myaccount/reducer";
import { FORM_FIELDS } from "~containers/chat/constants";
import { Paragraph } from "~components/atoms";

class GameLobbyChat extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onChatSubmit = this.onChatSubmit.bind(this);
    this.setChatInterval = this.setChatInterval.bind(this);
    this.initChat = this.initChat.bind(this);
    this.chatListRef = React.createRef();
  }

  onChatSubmit(data, e) {
    const { onCreate, gameId, profile } = this.props;

    e.target.reset();
    data.gameId = gameId;
    data.userId = profile ? profile.get("id") : null;
    return onCreate(data);
  }

  setChatInterval() {
    const { onLoadMessages, gameId, profile } = this.props;
    let userId = profile ? profile.get("id") : null;

    this.interval = setInterval(() => {
      onLoadMessages({ gameId, userId });
    }, INTERVAL_TIME);
  }

  initChat() {
    const { onLoadMessages, gameId, profile } = this.props;
    let userId = profile ? profile.get("id") : null;

    onLoadMessages({ gameId, userId }).then(() => {
      if (this.chatListRef.current) {
        this.chatListRef.current.scrollTop = this.chatListRef.current.scrollHeight;
      }
    });
  }

  componentDidMount() {
    this.initChat();
    this.setChatInterval();
  }

  componentDidUpdate() {
    const { isNewMessage } = this.props;

    if (isNewMessage && this.chatListRef.current) {
      this.chatListRef.current.scrollTop = this.chatListRef.current.scrollHeight;
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { action, messages, title } = this.props;

    return (
      <GameLobbyChatStyle>
        <ChatBox
          ref={this.chatListRef}
          messages={messages}
          title={
            <Paragraph
              padding={{ base: "1em 0", md: "0.25em 0" }}
            >{`${title} Chat`}</Paragraph>
          }
        />
        <DynamicForm
          action={action}
          submitButtonLabel="ButtonDynamicFormSend"
          formFields={FORM_FIELDS}
          onSubmit={this.onChatSubmit}
          className="public-chat__form"
        />
      </GameLobbyChatStyle>
    );
  }
}

const mapStateToProps = state => ({
  messages: selectMessages(state),
  isNewMessage: selectIsNewMessage(state),
  profile: selectProfile(state)
});

const mapDispatchToProps = dispatch => {
  return {
    onLoadMessages: data => dispatch(getMessages(data)),
    onCreate: data => dispatch(createMessage(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameLobbyChat);
