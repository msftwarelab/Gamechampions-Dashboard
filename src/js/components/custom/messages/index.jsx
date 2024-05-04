import React from "react";
import MainWrapper from "~components/custom/mainWrapper";
import ScrollableTabs from "~components/tabs";
import { withTheme } from "styled-components";
import { FlexBox } from "~components/atoms";
import { useTranslation } from "react-i18next";
import Notifications from "~containers/notifications";
import ChatsBody from "~containers/chatTabBody";
import { toNumOfUnreadMessages } from "~service/chat/adapter";

const Messages = ({
  theme,
  match,
  selectedLanguage,
  unreadNotifications,
  personalMessages
}) => {
  const { t } = useTranslation();
  let notificationTitle = t("NotificationsTabTitle");
  if (unreadNotifications.size)
    notificationTitle += ` (${unreadNotifications.size})`;

  let numOfUnreadMessages = toNumOfUnreadMessages(personalMessages.toJS());
  let chatsTitle = t("ChatsTabTitle");
  if (numOfUnreadMessages > 0) chatsTitle += ` (${numOfUnreadMessages})`;

  const elementArray = [
    {
      id: 0,
      title: chatsTitle,
      url: `/${selectedLanguage}/messages/chats`,
      element: <ChatsBody />
    },
    {
      id: 1,
      title: notificationTitle,
      url: `/${selectedLanguage}/messages/notifications`,
      element: <Notifications />
    }
  ];

  return (
    <MainWrapper>
      <FlexBox
        flexDirection="column"
        backgroundColor={theme.colors.white}
        hoverBackgroundColor={theme.colors.white}
        alignItems={{ base: "center", md: "flex-start" }}
      >
        <ScrollableTabs tabs={elementArray} match={match} />
      </FlexBox>
    </MainWrapper>
  );
};

export default withTheme(Messages);
