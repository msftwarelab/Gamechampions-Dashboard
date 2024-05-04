import React from "react";
import { styled, withTheme } from "~theme";
import { withTranslation } from "react-i18next";
import { FlexBox, Link, Paragraph, Span, Thumbnail } from "~components/atoms";
import ChatText from "../chatText";
import DateTime from "../dateTime";
import PlayerName from "../playerName";
import { STORAGE_URL } from "~service/constants";

const ChatItem = ({ selectedLanguage, item, theme, isGlobalChat, t }) => {
  const params =
    (item.get("jsonParams") && item.get("jsonParams").toJS()) || {};
  const isTranslatable = item.get("isTranslatable") && params.GameId;
  const link = isTranslatable
    ? `/${selectedLanguage}/game-lobby/${params.GameId}/matchmaking`
    : `/${selectedLanguage}/player-details/${item.get("senderId")}`;
  return (
    <ChatItemStyle
      key={item.get("id")}
      isFromSender={item.get("isFromSender") && !isGlobalChat}
      isGlobalChat={isGlobalChat}
    >
      {isGlobalChat ? (
        <FlexBox
          backgroundColor="#F0F0F0"
          hoverBackgroundColor="#F0F0F0"
          borderRadius="15px"
          alignItems="center"
          gap="1rem"
          padding="0.3rem"
        >
          <Link to={link}>
            <Thumbnail
              src={item?.get("player")?.get("thumbnailUrl")}
              alt="player thumbnail"
              title="player thumbnail"
              height={{ base: "2rem", md: "3rem" }}
              width={{ base: "2rem", md: "3rem" }}
              margin="0 0.25em 0 0"
            />
          </Link>
          <FlexBox flexDirection="column" width="87%">
            <Link to={link}>
              <FlexBox
                color={theme.colors.darkSlateGray}
                fontSize={{ base: "0.8rem", md: "1rem" }}
                fontWeight="700"
              >
                {item?.get("player")?.get("userName")}
              </FlexBox>
            </Link>
            <Paragraph
              color={theme.colors.darkSlateGray}
              fontSize={{ base: "0.8rem", md: "1rem" }}
              fontWeight="400"
              className="global-chat__list"
            >
              {item?.get("messageText")}
            </Paragraph>
          </FlexBox>
        </FlexBox>
      ) : (
        <FlexBox alignItems="flex-end">
          {item.getIn(["player", "thumbnailUrl"]) && (
            <Link to={link}>
              <Thumbnail
                src={
                  isTranslatable
                    ? `${STORAGE_URL}images/GlobalChatThumbnail.png`
                    : item.getIn(["player", "thumbnailUrl"])
                }
                alt="player thumbnail"
                title="player thumbnail"
                height="30px"
                width="30px"
                margin="0 0.25em 0 0"
              />
            </Link>
          )}
          <FlexBox flexDirection="column">
            {!isTranslatable && (
              <PlayerName isFromSender={item.get("isFromSender")}>
                <Link to={link} color={theme.colors.black}>
                  {item.getIn(["player", "userName"])}
                </Link>
              </PlayerName>
            )}
            <ChatText isFromSender={item.get("isFromSender")}>
              {isTranslatable ? (
                <Link
                  color={
                    item.get("isFromSender")
                      ? theme.colors.white
                      : theme.colors.black
                  }
                  to={link}
                >
                  <FlexBox>{t(item.get("messageText"), params)}</FlexBox>
                  <Span textDecoration="underline">{t("ViewChallenge")}</Span>
                </Link>
              ) : (
                item.get("messageText")
              )}
              <DateTime isFromSender={item.get("isFromSender")}>
                {item.get("date")}
              </DateTime>
            </ChatText>
          </FlexBox>
        </FlexBox>
      )}
    </ChatItemStyle>
  );
};

export default withTheme(withTranslation()(ChatItem));

const ChatItemStyle = styled.li`
  margin-bottom: 1em;
  width: ${({ isGlobalChat }) => (isGlobalChat ? "100%" : "fit-content")};
  font-size: 0.8em;
  ${({ isFromSender }) =>
    isFromSender
      ? `
    margin-right: 0;
    margin-left: auto;
    text-align: right;
    max-width: 72%;
  `
      : `
    margin-right: auto;
    margin-left: 0;
    text-align: left;
    max-width: 86%;
  `}
`;
