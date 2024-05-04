import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { fetchChat, createMessage, lastMessageRead } from "./actions";
import { selectMessages, selectIsNewMessage, selectIsLoading } from "./reducer";
import { FORM_FIELDS, INTERVAL_TIME } from "./constants";
import DynamicForm from "~components/molecules/dynamicForm";
import ChatBox from "~components/molecules/chatBox";
import FriendChatHeader from "~components/custom/chat/friendChat/header";
import { ChatWrapper } from "~components/custom/chat/friendChat/chatWrapper";
import { MessageWrapper } from "~components/custom/chat/friendChat/messageWrapper";
import { selectProfile } from "~containers/myaccount/reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";

class Chat extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onChatSubmit = this.onChatSubmit.bind(this);
    this.setChatInterval = this.setChatInterval.bind(this);
    this.initChat = this.initChat.bind(this);
    this.chatListRef = React.createRef();
    this.handleOpenChat = this.handleOpenChat.bind(this);
    this.handleMinimise = this.handleMinimise.bind(this);
    this.state = {
      isVisible: true,
      isNewFriend: false
    };
  }

  onChatSubmit(data, e) {
    const { friendId, onCreate, profile } = this.props;

    if (!data.messageText) {
      return;
    }
    data.userId = profile.get("id");
    data.friendId = friendId;
    e.target.reset();
    e.target[0].value = "";
    let input = e.target[0];
    if (input) {
      input.focus();
    }
    return onCreate(data);
  }

  setChatInterval() {
    const { onLoadChat, friendId, profile } = this.props;
    this.interval = setInterval(() => {
      if (!isNaN(friendId)) {
        onLoadChat({ userId: profile.get("id"), friendId: friendId });
      }
    }, INTERVAL_TIME);
  }

  initChat() {
    const { onLoadChat, friendId, profile } = this.props;
    this.setState({ isNewFriend: true });
    if (friendId && !isNaN(friendId)) {
      onLoadChat({
        userId: profile.get("id"),
        friendId: friendId
      }).then(() => {
        this.setState({ isNewFriend: false });
        if (this.chatListRef.current) {
          this.chatListRef.current.scrollTop = this.chatListRef.current.scrollHeight;
        }
      });
    }
  }

  componentDidMount() {
    this.initChat();
    this.setChatInterval();
  }

  componentDidUpdate(prevProps) {
    const {
      isNewMessage,
      friendId,
      messages,
      onLoadlastMessageRead
    } = this.props;
    const lastMessage = messages && messages.get(-1);

    const prevLastMessage = prevProps.messages && prevProps.messages.get(-1);
    const { isVisible } = this.state;

    if (lastMessage && isVisible && isNewMessage) {
      if (this.chatListRef.current) {
        this.chatListRef.current.scrollTop = this.chatListRef.current.scrollHeight;
      }

      const isFromSender = lastMessage.get("isFromSender");

      if (
        !isFromSender &&
        (!prevLastMessage ||
          (prevLastMessage &&
            prevLastMessage.get("id") !== lastMessage.get("id")))
      ) {
        onLoadlastMessageRead({
          messageId: lastMessage.get("id"),
          userId: lastMessage.get("userId")
        });
      }
    }

    if (prevProps.friendId !== friendId) {
      clearInterval(this.interval);
      this.setState({ isVisible: true });
      this.initChat();
      this.setChatInterval();
    }
  }

  componentWillUnmount() {
    const { profile } = this.props;
    clearInterval(this.interval);

    OneSignal.push(function() {
      OneSignal.sendTag("user", "user_" + profile.get("id"));
    });
  }

  handleMinimise() {
    let chatMinimisedDate = moment(new Date()).format("DD-MM-YYYY HH:mm");
    this.setState({ isVisible: false, chatMinimisedDate });
  }

  handleOpenChat() {
    const { messages, onLoadlastMessageRead } = this.props;

    const lastMessage = messages && messages.get(-1);

    if (lastMessage) {
      onLoadlastMessageRead({
        messageId: lastMessage.get("id"),
        userId: lastMessage.get("userId")
      });
    }

    this.setState({
      isVisible: true
    });
  }

  render() {
    const {
      action,
      messages,
      onChatClose,
      friendName,
      friendImage,
      friendId,
      hasUnreadMessages,
      selectedLanguage,
      isLoading
    } = this.props;

    const { isVisible, isNewFriend } = this.state;
    return (
      <ChatWrapper isVisible={isVisible}>
        <ChatBox
          messages={messages}
          ref={this.chatListRef}
          hasUnreadMessages={hasUnreadMessages}
          isLoading={isLoading}
          isVisible={isVisible}
          friendImage={friendImage}
          friendName={friendName}
          onChatClose={onChatClose}
          title={
            <FriendChatHeader
              friendId={friendId}
              friendImage={friendImage}
              friendName={friendName}
              onChatClose={onChatClose}
              isVisible={isVisible}
              onChatOpen={this.handleOpenChat}
              onChatMinimise={this.handleMinimise}
              language={selectedLanguage}
            />
          }
        />
        <MessageWrapper isVisible={isVisible}>
          {!isNewFriend && isVisible && (
            <DynamicForm
              action={action}
              formFields={FORM_FIELDS}
              submitButtonLabel="ButtonDynamicFormSend"
              onSubmit={this.onChatSubmit}
              className="public-chat__form"
            />
          )}
        </MessageWrapper>
      </ChatWrapper>
    );
  }
}

const mapStateToProps = state => ({
  messages: selectMessages(state),
  isNewMessage: selectIsNewMessage(state),
  profile: selectProfile(state),
  selectedLanguage: selectSelectedLanguage(state),
  isLoading: selectIsLoading(state)
});

const mapDispatchToProps = dispatch => {
  return {
    onLoadChat: data => dispatch(fetchChat(data)),
    onCreate: data => dispatch(createMessage(data)),
    onLoadlastMessageRead: data => dispatch(lastMessageRead(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
