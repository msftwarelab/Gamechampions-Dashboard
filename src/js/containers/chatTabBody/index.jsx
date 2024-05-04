import React, { useEffect } from "react";
import { connect } from "react-redux";
import ChatTabBodyComponent from "~components/custom/chatTabBody";
import {
  fetchPersonalMessages,
  setIsChatPopupOpen,
  setChatPopupData
} from "~containers/chat/actions";
import { selectPersonalMessages } from "~containers/chat/reducer";
import { setFriend } from "~containers/friends/actions";

const ChatsBody = ({
  onSetFriend,
  onLoadChats,
  personalMessages,
  onSetChatPopupData,
  onSetIsChatPopupOpen
}) => {
  useEffect(() => {
    onLoadChats();
  }, []);

  const handleOpen = ({
    friendId,
    friendImage,
    friendName,
    hasUnreadMessages
  }) => {
    onSetFriend({ id: friendId });
    onSetChatPopupData({
      friendId,
      friendImage,
      friendName,
      hasUnreadMessages
    });
    onSetIsChatPopupOpen(true);
  };

  return (
    <ChatTabBodyComponent
      chats={personalMessages.toJS()}
      handleOpen={handleOpen}
    />
  );
};

const mapStateToProps = state => ({
  personalMessages: selectPersonalMessages(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadChats: () => dispatch(fetchPersonalMessages()),
  onSetFriend: data => dispatch(setFriend(data)),
  onSetChatPopupData: data => dispatch(setChatPopupData(data)),
  onSetIsChatPopupOpen: data => dispatch(setIsChatPopupOpen(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatsBody);
