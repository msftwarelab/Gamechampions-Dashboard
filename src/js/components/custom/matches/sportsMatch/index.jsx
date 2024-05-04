import React from "react";
import { styled, media, withTheme } from "~theme";
import { Paragraph, FlexBox, Icon } from "~components/atoms";
import Thumbnail from "../match/thumbnail";
import { useTranslation } from "react-i18next";
import { MatchState } from "~service/constants";
import { stringStripHtml } from "~util/util";
import moment from "moment";

const SportsMatch = ({ sportsMatch, theme, selectedLanguage, history }) => {
  const { t } = useTranslation();
  const image = sportsMatch.get("thumbnail");
  const title = sportsMatch.get("title");
  const summary = sportsMatch.get("summary");
  const matchStatusBgColor =
    sportsMatch.get("state") == MatchState[1]
      ? theme.colors.turquoiseLightLighten
      : sportsMatch.get("state") == MatchState[2]
      ? theme.colors.turquoiseFilled
      : sportsMatch.get("state") == MatchState[3] ||
        sportsMatch.get("state") == MatchState[4] ||
        sportsMatch.get("state") == MatchState[6] ||
        sportsMatch.get("state") == MatchState[7]
      ? theme.colors.peelOrangeLighten
      : sportsMatch.get("state") == MatchState[8]
      ? theme.colors.smokeWhite
      : sportsMatch.get("state") == MatchState[5] &&
        sportsMatch.get("isWon") === true
      ? theme.colors.secondaryLighten
      : theme.colors.smokeWhite;
  const matchStatusTextColor =
    sportsMatch.get("state") == MatchState[1]
      ? theme.colors.teal
      : sportsMatch.get("state") == MatchState[2]
      ? theme.colors.white
      : sportsMatch.get("state") == MatchState[3] ||
        sportsMatch.get("state") == MatchState[4] ||
        sportsMatch.get("state") == MatchState[6] ||
        sportsMatch.get("state") == MatchState[7]
      ? theme.colors.peelOrange
      : sportsMatch.get("state") == MatchState[8]
      ? theme.colors.darkSlateGray
      : sportsMatch.get("state") == MatchState[5] &&
        sportsMatch.get("isWon") === true
      ? theme.colors.forestGreen
      : theme.colors.darkSlateGray;
  const matchStatusText =
    sportsMatch.get("state") == MatchState[1]
      ? t("MyMatchStatusUpNext")
      : sportsMatch.get("state") == MatchState[2]
      ? t("MyMatchStatusLive")
      : sportsMatch.get("state") == MatchState[3] ||
        sportsMatch.get("state") == MatchState[4] ||
        sportsMatch.get("state") == MatchState[6] ||
        sportsMatch.get("state") == MatchState[7]
      ? t("MyMatchStatusPending")
      : sportsMatch.get("state") == MatchState[8]
      ? t("MyMatchStatusCancelled")
      : sportsMatch.get("state") == MatchState[5] &&
        sportsMatch.get("isWon") === true
      ? t("MyMatchStatusWon")
      : t("MyMatchStatusLost");

  const matchStatus = (
    <FlexBox
      alignItems="center"
      backgroundColor={matchStatusBgColor}
      hoverBackgroundColor={matchStatusBgColor}
      borderRadius="50px"
      padding="13px 16px"
      height="50px"
      width="90px"
      gap="8px"
      justifyContent="center"
    >
      {sportsMatch.get("state") == MatchState[2] ? (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="6" cy="6" r="6" fill="white" />
        </svg>
      ) : (
        <></>
      )}
      <Paragraph fontSize={theme.fonts.small} color={matchStatusTextColor}>
        {matchStatusText}
      </Paragraph>
    </FlexBox>
  );

  return (
    <FlexBox
      justifyContent="space-between"
      padding="14px"
      borderRadius="16px"
      margin="0 0 24px"
      backgroundColor={theme.colors.white}
      hoverBackgroundColor={theme.colors.white}
      color={theme.colors.fontColor}
      cursor="pointer"
      onClick={() => {
        history.push(
          `/${selectedLanguage}/match-lobby/${sportsMatch.get("id")}`
        );
      }}
    >
      <Thumbnail
        src={image.get("src")}
        srcSet={image.get("srcset")}
        alt={image.get("alt")}
        title={image.get("title")}
      />
      <Wrapper>
        <FlexBox
          flexDirection="column"
          gap="8px"
          width={{ base: "unset", md: "16rem", lg: "24rem" }}
        >
          <Paragraph
            fontSize={theme.fonts.fontSizeNormal}
            color={theme.colors.darkSlateGray}
          >
            {title}
          </Paragraph>
          <Paragraph
            fontSize={theme.fonts.small}
            color={theme.colors.darkenColorDark}
            display={{ base: "none", md: "block" }}
          >
            {stringStripHtml(summary ? summary : "")}
          </Paragraph>
        </FlexBox>
        <FlexBox gap="0.25rem" alignItems="center">
          <Icon
            viewBox="1 1 22 22"
            scale="1.25"
            color={theme.colors.secondary}
            icon="prizeBag"
            cursor="default"
          />
          <Paragraph
            fontSize={theme.fonts.small}
            color={theme.colors.secondary}
          >{`${new Intl.NumberFormat("en-us", {
            style: "currency",
            currency: "USD"
          }).format(sportsMatch.get("prize"))}`}</Paragraph>
        </FlexBox>
        <FlexBox gap="0.25rem" alignItems="center" width="7.5rem">
          <Icon
            viewBox="0 0 20 20"
            scale="1.25"
            color={theme.colors.darkSlateGray}
            icon="clock"
            cursor="default"
          />
          <Paragraph
            fontSize={theme.fonts.xSmall}
            color={theme.colors.darkSlateGray}
          >
            {moment.utc(sportsMatch.get("startTime")).fromNow()}
          </Paragraph>
        </FlexBox>
        <FlexBox display={{ base: "none", md: "flex" }} alignItems="center">
          {matchStatus}
        </FlexBox>
      </Wrapper>
      <FlexBox display={{ base: "flex", md: "none" }} alignItems="center">
        {matchStatus}
      </FlexBox>
    </FlexBox>
  );
};

export default withTheme(SportsMatch);

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: unset;
  margin-left: 14px;
  ${media.md`
    flex-direction: row;
    justify-content: space-between;
  `};
`;
