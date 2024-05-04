import React from "react";
import ChatTabBodyItem from "./chatTabBodyItem";
import { FlexBox, Span } from "~components/atoms";
import { withTheme } from "styled-components";
import { useTranslation } from "react-i18next";

const ChatTabBody = ({ chats, theme, handleOpen }) => {
  const { t } = useTranslation();
  if (chats.length < 1)
    return (
      <FlexBox justifyContent="center" padding="15px" position="relative">
        <Span color={theme.colors.black} fontWeight={theme.fonts.bold}>
          {t("NoChatsFound")}
        </Span>
      </FlexBox>
    );

  return (
    <>
      {chats.map(
        ({ id, userName, imageUrl, lastMessage, newMessages }, index) => (
          <ChatTabBodyItem
            key={index}
            id={id}
            userName={userName}
            imageUrl={imageUrl}
            lastMessage={lastMessage}
            newMessages={newMessages}
            handleOpen={handleOpen}
          />
        )
      )}
    </>
  );
};

export default withTheme(ChatTabBody);
