import React from "react";
import { Thumbnail, FlexBox, Paragraph, Link, Icon } from "~components/atoms";
import { ChatCloseButton } from "./chatCloseButton";
import { ChatMinimiseButton } from "./chatMinimiseButton";
import { withTheme } from "styled-components";

const FriendChatHeader = ({
  friendId,
  friendImage,
  friendName,
  onChatClose,
  onChatOpen,
  onChatMinimise,
  isVisible,
  language,
  theme
}) => (
  <>
    <Link
      to={isVisible ? `/${language}/player-details/${friendId}` : null}
      width={
        isVisible
          ? { base: "calc(100% - 2.5em)", md: "calc(100% - 3.5em)" }
          : "calc(100% - 2.5em)"
      }
      onClick={onChatOpen}
      display="flex"
      alignItems="center"
      padding="5px 0"
    >
      <Thumbnail width="30px" height="30px" src={friendImage} />
      <Paragraph color="white" showEllipsis={true} padding="0 5px">
        {friendName}
      </Paragraph>
    </Link>
    <FlexBox padding="5px 5px 3px 0">
      {isVisible && (
        <ChatMinimiseButton onClick={onChatMinimise}>
          <Icon color={theme.colors.white} scale="1.5" icon="minimise" />
        </ChatMinimiseButton>
      )}
      <ChatCloseButton onClick={onChatClose}>
        <Icon color={theme.colors.white} scale="1.5" icon="close" />
      </ChatCloseButton>
    </FlexBox>
  </>
);

export default withTheme(FriendChatHeader);
