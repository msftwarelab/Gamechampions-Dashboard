import React from "react";
import { FlexBox, Span, Wrapper, Icon, Thumbnail } from "~components/atoms";
import { NotificationIcon } from "./notificationIcon";
import { DropDownList } from "./dropDownList";
import { withTheme } from "~theme";
import { NotificationsListTitle } from "./notificationsListTitle";
import { NotificationTitle } from "./notificationTitle";
import { NotificationMessage } from "./notificationMessage";
import { NotificationDefaultImg } from "./notificationDefaultImg";
import CloseButton from "./closeButton";
import { NotificationShowAllButton } from "./notificationShowAllButton";
import { NotificationCounter } from "./notificationsCounter";
import { useTranslation } from "react-i18next";

const NotificationsDropdown = ({
  theme,
  openDropdown,
  options,
  toggling,
  onClickShowAllNotification,
  onClickNotification,
  unreadNotifications
}) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <NotificationIcon onClick={toggling}>
        {unreadNotifications && unreadNotifications.size > 0 && (
          <NotificationCounter>{unreadNotifications.size}</NotificationCounter>
        )}
        <Icon
          viewBox="0 0 24 24"
          color={theme.colors.white}
          icon="notification"
          margin="2px 0 0 0"
        />
      </NotificationIcon>
      {openDropdown && (
        <Wrapper>
          <DropDownList>
            <NotificationsListTitle>
              <Span
                color={theme.colors.black}
                fontWeight="bold"
                fontSize="20px"
              >
                {t("NotificationsMainTitle")}
              </Span>
              <CloseButton onClick={toggling}></CloseButton>
            </NotificationsListTitle>
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
                  opacity={option.get("isRead") ? "0.3" : undefined}
                  onClick={() => onClickNotification(option)}
                >
                  {option.get("thumbnail") ? (
                    <Thumbnail
                      src={option.get("thumbnail")}
                      title={`${option.get("title")} icon`}
                      alt={"Thumbnail icon"}
                      height="40px"
                      width="40px"
                    />
                  ) : (
                    <NotificationDefaultImg>
                      <Icon
                        viewBox="0 0 24 24"
                        scale="2"
                        color={theme.colors.white}
                        icon="notification"
                        margin="2px 0 0 0"
                      />
                    </NotificationDefaultImg>
                  )}
                  <FlexBox flexDirection="column" padding="0 0 0 10px">
                    <NotificationTitle>
                      {t(option.get("title"))}
                    </NotificationTitle>
                    <NotificationMessage>
                      {t(option.get("message"))}
                    </NotificationMessage>
                  </FlexBox>
                </FlexBox>
              ))}
            {options && options.size ? (
              <NotificationShowAllButton onClick={onClickShowAllNotification}>
                <Span fontWeight="900">{t("NotificationShowAllButton")}</Span>
              </NotificationShowAllButton>
            ) : (
              <FlexBox justifyContent="center" padding="15px">
                <Span color={theme.colors.black} fontWeight="900">
                  {t("NoNotificationsFound")}
                </Span>
              </FlexBox>
            )}
          </DropDownList>
        </Wrapper>
      )}
    </Wrapper>
  );
};

export default withTheme(NotificationsDropdown);
