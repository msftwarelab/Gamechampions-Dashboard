import React from "react";
import { connect } from "react-redux";

import {
  getMessages,
  createMessage,
  initGlobalChatHub,
  getHubMessages,
  postHubMessages
} from "./actions";
import {
  selectIsConnectionCreated,
  selectIsNewMessage,
  selectMessages
} from "./reducer";
import { INTERVAL_TIME } from "./constants";
import DynamicForm from "~components/molecules/dynamicForm";
import ChatBox from "~components/molecules/chatBox";
import GameLobbyChatStyle from "~components/custom/gameLobby/gameLobbyChat";
import { selectProfile } from "~containers/myaccount/reducer";
import { FORM_FIELDS } from "~containers/chat/constants";
import { Paragraph } from "~components/atoms";
import { withTranslation } from "react-i18next";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";

class GlobalChat extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onChatSubmit = this.onChatSubmit.bind(this);
    this.onSendHubMessage = this.onSendHubMessage.bind(this);
    this.setChatInterval = this.setChatInterval.bind(this);
    this.initChat = this.initChat.bind(this);
    this.chatListRef = React.createRef();
    this.state = {
      isLoading: true
    };
  }

  onChatSubmit(data, e) {
    const { onCreate, gameId, gameType, profile } = this.props;

    e.target.reset();
    let input = e.target[0];
    if (input) {
      input.focus();
    }
    data.userId = profile ? profile.get("id") : null;
    data.gameId = gameId;
    data.gameType = gameType;
    return onCreate(data);
  }

  onSendHubMessage(data, e) {
    const { profile, gameId, gameType, onPostHubMessages } = this.props;
    if (
      e.target[0] &&
      e.target[0].value !== "" &&
      e.target[0].value.length < 160
    ) {
      e.target.reset();
      let input = e.target[0];
      if (input) {
        input.focus();
      }
      e.target[0].value = "";

      data.userId = profile ? profile.get("id") : null;
      data.gameId = gameId;
      data.gameType = gameType;
      return onPostHubMessages(data);
    }
  }

  setChatInterval() {
    this.interval = setInterval(() => {
      const { onLoadMessages, gameType, profile } = this.props;
      let userId = profile ? profile.get("id") : null;
      if (userId && gameType) {
        onLoadMessages({ userId, gameType }).then(() => {
          this.setState({ isLoading: false });
          if (this.chatListRef.current) {
            this.chatListRef.current.scrollTop = this.chatListRef.current.scrollHeight;
          }
        });
      }
    }, INTERVAL_TIME);
  }

  initChat() {
    const { onLoadMessages, profile, gameType } = this.props;
    let userId = profile ? profile.get("id") : null;

    if (userId && gameType) {
      onLoadMessages({ userId, gameType }).then(() => {
        this.setState({ isLoading: false });
        if (this.chatListRef.current) {
          this.chatListRef.current.scrollTop = this.chatListRef.current.scrollHeight;
        }
      });
    }
  }

  componentDidMount() {
    const {
      profile,
      gameType,
      onInitGlobalChatHub,
      onGetHubMessages,
      isConnectionCreated
    } = this.props;
    this.initChat();
    if (!isConnectionCreated) {
      onInitGlobalChatHub().then(() => {
        onGetHubMessages({
          userId: profile.get("id"),
          gameType: gameType
        }).then(() => {
          this.setState({ isLoading: false });
          if (this.chatListRef.current) {
            this.chatListRef.current.scrollTop = this.chatListRef.current.scrollHeight;
          }
        });
      });
    }
    this.setChatInterval();
  }

  componentDidUpdate(prevProps) {
    const { isNewMessage } = this.props;
    if (isNewMessage && this.chatListRef.current) {
      this.chatListRef.current.scrollTop = this.chatListRef.current.scrollHeight;
    }
    if (this.props.gameType !== prevProps.gameType) {
      this.setState({ isLoading: true });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { action, messages, t, selectedLanguage, isMobile } = this.props;
    return (
      <GameLobbyChatStyle>
        <ChatBox
          isLoading={this.state.isLoading}
          ref={this.chatListRef}
          messages={messages}
          title={
            <Paragraph padding={{ base: "1em 0", md: "0.25em 0" }}>
              {t("GlobalChat")}
            </Paragraph>
          }
          selectedLanguage={selectedLanguage}
          isGlobalChat={true}
          isMobile={isMobile}
        />
        <DynamicForm
          action={action}
          submitButtonLabel="ButtonDynamicFormSend"
          formFields={FORM_FIELDS}
          onSubmit={this.onSendHubMessage}
          className={`public-chat__form ${isMobile ? "global-chat__form" : ""}`}
        />
      </GameLobbyChatStyle>
    );
  }
}

const mapStateToProps = state => ({
  messages: selectMessages(state),
  isNewMessage: selectIsNewMessage(state),
  profile: selectProfile(state),
  selectedLanguage: selectSelectedLanguage(state),
  isConnectionCreated: selectIsConnectionCreated(state)
});

const mapDispatchToProps = dispatch => {
  return {
    onLoadMessages: data => getMessages(data)(dispatch),
    onCreate: data => dispatch(createMessage(data)),
    onInitGlobalChatHub: () => dispatch(initGlobalChatHub()),
    onGetHubMessages: data => dispatch(getHubMessages(data)),
    onPostHubMessages: data => dispatch(postHubMessages(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(GlobalChat));
