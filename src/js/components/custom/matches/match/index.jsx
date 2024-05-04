import React from "react";
import { styled, media, withTheme } from "~theme";
import {
  ResponsiveWrapper,
  Paragraph,
  Heading,
  FlexBox,
  Button
} from "~components/atoms";
import ContentWrapper from "./contentWrapper";
import FirstWrapper from "./firstWrapper";
import Thumbnail from "./thumbnail";
import TextWrapper from "./textWrapper";
import SecondWrapper from "./secondWrapper";
import ButtonWrapper from "./buttonWrapper";
import LobbyButton from "./lobbyButton";
import XpPoints from "./xpPoints";
import { toPriceString } from "~service/adapter";
import { useTranslation } from "react-i18next";
import { MatchState } from "~service/constants";
import { MarginStyle } from "~components/styles";
import { BorderWidthStyle } from "~components/styles/core/borderWidth";

const Match = ({
  margin,
  borderWidth,
  match,
  currency,
  showCloseButton,
  theme,
  selectedLanguage,
  handleCancelChallenge,
  profile
}) => {
  const { t } = useTranslation();
  const image = match.get("thumbnail");
  const opponentUserName =
    match.get("opponent") && match.get("opponent").get("userName");
  const opponentStars =
    match.get("opponent") && match.get("opponent").get("stars");
  const isRefuseable = match && match.get("state") == MatchState[1];
  const isChallenger =
    match && profile && match.get("challengerId") == profile.get("id");

  return (
    <MatchStyle margin={margin || "0"} borderWidth={borderWidth || "0"}>
      <ContentWrapper>
        <ResponsiveWrapper>
          <FirstWrapper>
            {image && (
              <Thumbnail
                src={image.get("src")}
                srcSet={image.get("srcset")}
                alt={image.get("alt")}
                title={image.get("title")}
              />
            )}
            <TextWrapper>
              <Heading
                as="h2"
                margin="0"
                fontSize={theme.fonts.fontSizeNormal}
                textTransform="uppercase"
              >
                {match.get("title")}
              </Heading>
              <Paragraph
                fontSize={theme.fonts.small}
                fontWeight={theme.fonts.semiBold}
              >
                {match.get("prize") > 0
                  ? `${toPriceString(match.get("prize"), currency)} Match`
                  : `${t("InstantMatchesTournamentMatchTitle")}`}
              </Paragraph>
            </TextWrapper>
          </FirstWrapper>
          <SecondWrapper>
            {opponentUserName && (
              <FlexBox
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Paragraph fontSize={theme.fonts.small}>
                  Opponent: {opponentUserName}
                </Paragraph>
                <XpPoints points={opponentStars} />
              </FlexBox>
            )}
            <Paragraph fontSize={theme.fonts.small} color="rgba(0, 0, 0, 0.54)">
              Format: {match.get("format")}
            </Paragraph>
          </SecondWrapper>
        </ResponsiveWrapper>
        <Paragraph
          color="rgba(0, 0, 0, 0.34)"
          fontSize={theme.fonts.xSmall}
          fontStyle="italic"
          textAlign={{ base: "center", md: "unset" }}
          padding={{ base: "0.375em", md: 0 }}
        >
          {t(match.get("message"))}
        </Paragraph>
      </ContentWrapper>
      <ButtonWrapper>
        <LobbyButton to={`/${selectedLanguage}/match-lobby/${match.get("id")}`}>
          Go to Lobby
        </LobbyButton>
        {showCloseButton && isRefuseable && (
          <Button
            to="#"
            onClick={() =>
              handleCancelChallenge({
                matchId: match.get("id")
              })
            }
            margin={{ base: "0.5em", md: "0.5em" }}
            padding={{ base: "12px 24px", md: "12px 24px" }}
            width={{ base: "100%", md: "auto" }}
            color={theme.colors.tertiary}
            backgroundColor={theme.colors.white}
            visitedColor={theme.colors.tertiary}
            hoverColor={theme.colors.white}
            hoverBackgroundColor={theme.colors.primary}
            border="1px solid"
            borderColor={theme.colors.tertiary}
          >
            {isChallenger
              ? t("MyMatchesCancelMatch")
              : t("MatchLobbyRefuseChallenge")}
          </Button>
        )}
      </ButtonWrapper>
    </MatchStyle>
  );
};

export default withTheme(Match);

const MatchStyle = styled.li`
  ${MarginStyle};
  ${BorderWidthStyle};

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5em;
  border-radius: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.platinumGray};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.fontColor};

  ${media.md`
    flex-direction: row;
    justify-content: space-between;
    width: auto;
    padding: 1em;
  `};
`;
