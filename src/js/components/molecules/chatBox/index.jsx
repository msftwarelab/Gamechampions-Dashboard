import React from "react";
import { styled, withTheme } from "~theme";
import { FlexBox, Loader, Image, Icon, Thumbnail } from "~components/atoms";
import ListStyle from "./listStyle";
import ChatItem from "./chatItem";
import { ChatCloseButton } from "~components/custom/chat/friendChat/header/chatCloseButton";

const ChatBox = React.forwardRef((props, ref) => {
  const {
    messages,
    opponent,
    theme,
    hasUnreadMessages,
    isLoading,
    isVisible,
    onChatClose,
    friendImage,
    friendName,
    selectedLanguage,
    isGlobalChat = false,
    isMobile
  } = props;
  return (
    <ChatBoxStyle isGlobalChat={isGlobalChat} isMobile={isMobile}>
      {!isGlobalChat && (
        <FlexBox
          color={theme.colors.white}
          backgroundColor={
            hasUnreadMessages && (isLoading || !isVisible)
              ? theme.colors.secondary
              : theme.colors.tertiary
          }
          hoverBackgroundColor={
            hasUnreadMessages && (isLoading || !isVisible)
              ? theme.colors.secondary
              : theme.colors.tertiary
          }
          margin="0"
          padding="0.5rem 1rem"
          fontSize={theme.fonts.fontSizeNormal}
          fontWeight={theme.fonts.semiBold}
          textTransform="uppercase"
          alignItems="center"
          justifyContent="space-between"
        >
          <FlexBox alignItems="center">
            <Thumbnail
              src={
                opponent
                  ? opponent.get("thumbnailUrl")
                  : friendImage
                  ? friendImage
                  : ""
              }
              width="2.25rem"
              margin="0 0.4rem"
            ></Thumbnail>
            {opponent ? opponent.get("userName") : friendName ? friendName : ""}
          </FlexBox>

          <ChatCloseButton onClick={onChatClose}>
            <Icon color={theme.colors.white} scale="1.5" icon="close" />
          </ChatCloseButton>
        </FlexBox>
      )}

      {isLoading ? (
        <Loader
          isLoading={true}
          height="100%"
          alignItems="center"
          scale="5rem"
        />
      ) : (
        <ListStyle ref={ref}>
          {messages &&
            messages.size > 0 &&
            messages.map((message, idx) => (
              <ChatItem
                isGlobalChat={isGlobalChat}
                item={message}
                selectedLanguage={selectedLanguage}
                key={idx}
                isFromSender={message?.get("isFromSender")}
              />
            ))}
        </ListStyle>
      )}
    </ChatBoxStyle>
  );
});

ChatBox.displayName = "ChatBox";

export default withTheme(ChatBox);

const ChatBoxStyle = styled.div`
  color: ${({ theme }) => theme.colors.white};
  height: ${({ isGlobalChat, isMobile }) =>
    isGlobalChat && isMobile ? "80%" : "100%"};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
