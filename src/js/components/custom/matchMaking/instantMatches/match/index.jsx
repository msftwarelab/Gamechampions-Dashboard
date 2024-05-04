import React, { useEffect, useState } from "react";
import { media, styled, withTheme } from "~theme";
import { FlexBox, Thumbnail, Image, Link } from "~components/atoms";
import { useTranslation } from "react-i18next";
import InputButton from "~components/buttons/inputButton";
import { MATCH_STATUS, MATCHTYPE } from "~containers/matchLobby/constants";
import XpPoints from "~components/custom/matches/match/xpPoints";
import Paragraph from "~components/atoms/paragraph";

const Match = ({
  match,
  game,
  theme,
  handlePlayNow,
  isSubmit,
  isButtonClick,
  profile,
  userId,
  selectedLanguage
}) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const handleResize = () => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  // Determine the scale based on the window width
  const xpPointsScale = windowWidth < 768 ? "1.5" : "2.2";
  const { t } = useTranslation();
  const matchType = match.get("matchType");
  const color =
    matchType == MATCHTYPE.INCOGNITO
      ? theme.colors.darkGrey
      : theme.colors.white;
  const prizeColor = matchType == MATCHTYPE.INCOGNITO ? "#00B100" : "#00FF00";
  const bgColor1 =
    matchType == MATCHTYPE.INCOGNITO ? theme.colors.white : "#00143C";
  const bgColor2 = matchType == MATCHTYPE.INCOGNITO ? "#EBEBEB" : "#182551";
  const borderColor = matchType == MATCHTYPE.INCOGNITO ? "#d6d6d6" : "#00143C";
  const thumbnail =
    matchType == MATCHTYPE.INCOGNITO
      ? "/img/incognito.svg"
      : match.get("challenger")
      ? match.get("challenger").get("thumbnailUrl")
      : match.get("defenderTeam").get("thumbnailUrl");
  const userName =
    matchType == MATCHTYPE.INCOGNITO
      ? "INCOGNITO"
      : match.get("challenger").get("userName");

  return (
    <MatchStyle>
      <MatchCardStyle color={color} borderColor={borderColor}>
        <FlexBox
          flex="1"
          padding="1.1rem 0.5em"
          borderColor={borderColor}
          borderWidth="0 0 4px 0"
          borderStyle="solid"
          gap={{ base: "0", md: "1rem" }}
          backgroundColor={bgColor1}
          hoverBackgroundColor={bgColor1}
        >
          <Thumbnail
            src={`${
              game?.get("thumbnailUrl")
                ? game?.get("thumbnailUrl")
                : "/img/G_logo.png"
            }`}
            title={game?.get("title")}
            alt={game?.get("title")}
            margin="0.5em 0.5em"
            width="4rem"
            height="4rem"
            borderRadius="0.875rem"
          ></Thumbnail>
          <FlexBox flexDirection="column" padding="0.4rem" flex="1">
            <FlexBox
              width="100%"
              fontWeight={theme.fonts.semiBold}
              justifyContent="space-between"
              alignItems="center"
              fontSize={{ base: "0.875rem", md: "1rem" }}
            >
              <FlexBox
                flexWrap="wrap"
                justifyContent="flex-end"
                flexDirection="column"
              >
                <FlexBox
                  color={color}
                  backgroundColor={bgColor1}
                  padding="0.3em"
                  borderRadius="7px"
                  hoverBackgroundColor={bgColor1}
                >
                  {`${match.get("gameTitle")}`} - {`${match.get("platform")}`}
                </FlexBox>
                <FlexBox
                  backgroundColor={theme.colors.tealBlue}
                  hoverBackgroundColor={theme.colors.tealBlue}
                  color={theme.colors.white}
                  alignItems="center"
                  justifyContent="center"
                  padding="0.1rem"
                  borderRadius="0.3125rem"
                >{`${match.get("format")}`}</FlexBox>
              </FlexBox>
            </FlexBox>
          </FlexBox>
          <FlexBox
            flexDirection="column"
            margin={{ base: "0.8rem 0.5rem 0 0", md: "0.8rem 2rem 0 0" }}
            gap="0.3rem"
            justifyContent="center"
            alignItems="center"
          >
            <FlexBox
              color={prizeColor}
              fontSize={{ base: "1.8rem", md: "2.2rem" }}
              fontWeight="700"
            >
              ${match.get("prize")}
            </FlexBox>
            <FlexBox
              color="#B8B8B8"
              fontSize={{ base: "0.875rem", md: "1.1rem" }}
              fontWeight="400"
            >
              {t("Prize").slice(0, -1)}
            </FlexBox>
          </FlexBox>
        </FlexBox>
        <FlexBox
          justifyContent="center"
          gap={{ base: "0", md: "1rem" }}
          alignItems="center"
          backgroundColor={bgColor2}
          hoverBackgroundColor={bgColor2}
          padding={
            match.get("state") !== MATCH_STATUS.LIVE ? "0.3rem" : "0.8rem"
          }
        >
          {match.get("state") !== MATCH_STATUS.LIVE &&
            match.get("state") !== MATCH_STATUS.AWAITING_CHALLENGEE_REPORT &&
            match.get("state") !== MATCH_STATUS.AWAITING_CHALLENGER_REPORT &&
            match.get("state") !== MATCH_STATUS.UNDER_REVIEW && (
              <>
                <Link
                  to={
                    matchType == MATCHTYPE.INCOGNITO
                      ? "#"
                      : {
                          pathname: `/${selectedLanguage}/player-details/${match
                            ?.get("challenger")
                            ?.get("id")}`,
                          state: {
                            returnUrl: `/${selectedLanguage}/game-lobby/${game?.get(
                              "id"
                            )}/matchmaking`
                          }
                        }
                  }
                  color={color}
                >
                  <Thumbnail
                    src={thumbnail}
                    title="incognito"
                    alt="incognito"
                    margin="0.5em 0.5em"
                    width="4rem"
                    height="4rem"
                  ></Thumbnail>
                </Link>
                <FlexBox
                  flexDirection="column"
                  padding={
                    matchType == MATCHTYPE.INCOGNITO
                      ? "1rem 0.4rem"
                      : "0.8rem 0.4rem"
                  }
                  flex="1"
                  justifyContent="center"
                >
                  <FlexBox
                    width="100%"
                    fontWeight={theme.fonts.semiBold}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FlexBox
                      flexWrap="wrap"
                      justifyContent="flex-end"
                      flexDirection="column"
                    >
                      <Link
                        to={
                          matchType == MATCHTYPE.INCOGNITO
                            ? "#"
                            : {
                                pathname: `/${selectedLanguage}/player-details/${match
                                  ?.get("challenger")
                                  ?.get("id")}`,
                                state: {
                                  returnUrl: `/${selectedLanguage}/game-lobby/${game?.get(
                                    "id"
                                  )}/matchmaking`
                                }
                              }
                        }
                        color={color}
                      >
                        <FlexBox
                          color={color}
                          padding="0.3em"
                          borderRadius="7px"
                          fontSize={theme.fonts.fontSizeNormal}
                        >
                          {userName}
                        </FlexBox>
                      </Link>
                      <FlexBox
                        alignItems="center"
                        justifyContent="center"
                        padding="0.1rem"
                        borderRadius="0.3125rem"
                      >
                        {matchType == MATCHTYPE.INCOGNITO ? (
                          <FlexBox display={{ base: "None", md: "block" }}>
                            {t("IncognitoText")}
                          </FlexBox>
                        ) : (
                          <XpPoints
                            points={
                              match.get("challenger") &&
                              match.get("challenger").get("stars")
                            }
                            margin="0"
                            scale={xpPointsScale}
                          />
                        )}
                      </FlexBox>
                    </FlexBox>
                  </FlexBox>
                </FlexBox>
              </>
            )}
          {match.get("state") == MATCH_STATUS.LIVE && (
            <>
              <FlexBox gap="2rem" width="75%" flex="auto">
                <FlexBox
                  width="3rem"
                  backgroundColor="#FEE74E"
                  hoverBackgroundColor="#FEE74E"
                  borderRadius="0 0 0 1rem"
                  margin="-0.8rem"
                >
                  <LiveStyle>
                    <LiveBullet className="blink">&bull;</LiveBullet>
                    {t("LiveTabTitle")}
                  </LiveStyle>
                </FlexBox>
                <FlexBox flexDirection="column" gap="0.5rem">
                  <Link
                    to={{
                      pathname: `/${selectedLanguage}/player-details/${match?.get(
                        "defenderId"
                      )}`,
                      state: {
                        returnUrl: `/${selectedLanguage}/game-lobby/${game?.get(
                          "id"
                        )}/matchmaking`
                      }
                    }}
                    color={color}
                  >
                    <FlexBox alignItems="center" gap="0.5rem">
                      <Thumbnail
                        src={
                          match?.get("defender")?.get("thumbnailUrl")
                            ? match?.get("defender")?.get("thumbnailUrl")
                            : "/img/icons/ic_account_circle-24px.svg"
                        }
                        width="2.3rem"
                        height="2.3rem"
                      />
                      <Paragraph fontSize="1.2rem">
                        {match.get("defenderUsername")}
                      </Paragraph>
                    </FlexBox>
                  </Link>
                  <Link
                    to={{
                      pathname: `/${selectedLanguage}/player-details/${match
                        ?.get("challenger")
                        ?.get("id")}`,
                      state: {
                        returnUrl: `/${selectedLanguage}/game-lobby/${game?.get(
                          "id"
                        )}/matchmaking`
                      }
                    }}
                    color={color}
                  >
                    <FlexBox alignItems="center" gap="0.5rem">
                      <Thumbnail
                        src={match.get("challenger").get("thumbnailUrl")}
                        width="2.3rem"
                        height="2.3rem"
                      />
                      <Paragraph fontSize="1.2rem">
                        {match.get("challenger").get("userName")}
                      </Paragraph>
                    </FlexBox>
                  </Link>
                </FlexBox>
              </FlexBox>
            </>
          )}
          {match.get("challenger").get("id") != userId &&
            match.get("state") !== MATCH_STATUS.LIVE &&
            match.get("state") !== MATCH_STATUS.AWAITING_CHALLENGEE_REPORT &&
            match.get("state") !== MATCH_STATUS.AWAITING_CHALLENGER_REPORT &&
            match.get("state") !== MATCH_STATUS.UNDER_REVIEW && (
              <FlexBox
                flexDirection="column"
                margin={{
                  base: "0.4rem 0 0 0",
                  md: "1.8rem 1.5rem 0 0"
                }}
                gap="0.2rem"
                justifyContent="center"
                alignItems="center"
              >
                <InputButton
                  type="submit"
                  loading={isButtonClick}
                  value={`${t("AcceptChallenge")}`}
                  className={"newPlayNowBtn"}
                  disabled={
                    isSubmit ||
                    match.get("state") == MATCH_STATUS.LIVE ||
                    match.get("state") ==
                      MATCH_STATUS.AWAITING_CHALLENGEE_REPORT ||
                    match.get("state") ==
                      MATCH_STATUS.AWAITING_CHALLENGER_REPORT ||
                    match.get("state") == MATCH_STATUS.COMPLETED ||
                    match.get("state") == MATCH_STATUS.UNDER_REVIEW
                  }
                  onButtonClick={() => handlePlayNow(match.get("id"))}
                />
                <FlexBox
                  color="#B8B8B8"
                  fontSize={{ base: "0.875rem", md: "1.1rem" }}
                  fontWeight="400"
                >
                  {t("Bet")}: ${match.get("betAmount")}
                </FlexBox>
              </FlexBox>
            )}
        </FlexBox>
      </MatchCardStyle>
    </MatchStyle>
  );
};

export default withTheme(Match);

const MatchStyle = styled.li`
  display: flex;
  flex: 1;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.fontColor};
  padding: 0.5rem;
  width: 100%;
  ${media.md`
    flex: unset;
    width : 50%;
`};
`;

const MatchCardStyle = styled.div`
  display: flex;
  flex: 1;
  overflow-x: hidden;
  flex-direction: column;
  color: ${({ color }) => color};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  border: 4px solid ${({ borderColor }) => borderColor};
`;

const LiveStyle = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  color: black;
  transform: rotate(-90deg);
  transform-origin: 73% 38%;
`;

const LiveBullet = styled.div`
  font-size: 2em;
`;
