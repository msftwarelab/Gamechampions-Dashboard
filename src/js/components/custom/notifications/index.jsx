import React from "react";
import { FlexBox, Span, Icon, Thumbnail } from "~components/atoms";
import { NotificationsList } from "./notificationsList";
import { withTheme } from "~theme";
import { NotificationTitle } from "./notificationTitle";
import { NotificationMessage } from "./notificationMessage";
import { NotificationDefaultImg } from "./notificationDefaultImg";
import { NotificationWrapper } from "./notificationWrapper";
import { useTranslation } from "react-i18next";

const NotificationsDropdown = ({ theme, options, onClickNotification }) => {
  const { t } = useTranslation();
  return (
    <NotificationWrapper>
      <NotificationsList>
        {options &&
          options.map((option, index) => (
            <FlexBox
              key={index}
              alignItems="center"
              padding="0.5em"
              fontSize={theme.fonts.small}
              height="65px"
              cursor="pointer"
              hoverBackgroundColor={theme.colors.disabledColor}
              opacity={option && option.get("isRead") ? "0.3" : undefined}
              onClick={() => onClickNotification(option)}
            >
              {option && option.get("thumbnail") ? (
                <Thumbnail
                  src={option && option.get("thumbnail")}
                  title={`${option && option.get("title")} icon`}
                  alt={"Thumbnail icon"}
                  height="40px"
                  width="40px"
                />
              ) : (
                <NotificationDefaultImg>
                  <Icon
                    viewBox="0 0 24 24"
                    scale="2"
                    color="white"
                    icon="notification"
                    margin="2px 0 0 0"
                  />
                </NotificationDefaultImg>
              )}
              <FlexBox flexDirection="column" padding="0 0 0 10px">
                <NotificationTitle>
                  {option && t(option.get("title"))}
                </NotificationTitle>
                <NotificationMessage>
                  {option && t(option.get("message"))}
                </NotificationMessage>
              </FlexBox>
            </FlexBox>
          ))}
        {(!options || (options && !options.size)) && (
          <FlexBox justifyContent="center" padding="15px">
            <Span color={theme.colors.black} fontWeight={theme.fonts.bold}>
              {t("NoNotificationsFound")}
            </Span>
          </FlexBox>
        )}
      </NotificationsList>
    </NotificationWrapper>
  );
};

export default withTheme(NotificationsDropdown);
