import React from "react";
import { Link } from "react-router-dom";
import { styled, withTheme, media } from "~theme";
import { Heading, FlexBox, Loader, Paragraph, Image } from "~components/atoms";
import ContentWrapper from "./contentWrapper";
import Player from "./player";
import ChampionsPlayer from "./ChampionsPlayer";
import { MATCH_STATUS } from "~containers/matchLobby/constants";
import MatchOutcome from "./matchOutcome";
import TopBanner from "./topBanner";
import { useTranslation } from "react-i18next";

const MatchLobbyBanner = ({
  match,
  challenger,
  challengee,
  matchStatus,
  theme,
  selectedLanguage,
  challengerStars,
  challengeeStars,
  onShowTeams,
  teams,
  matchId
}) => {
  const prize = match && match.get("prize");
  const { t } = useTranslation();

  const IS_CHAMPIONS_MODE = match && match.get("isChampionsMode");
  const MATCH_IS_LIVE =
    matchStatus && matchStatus.get("status") === MATCH_STATUS.LIVE;
  const MATCH_IS_COMPLETED =
    matchStatus && matchStatus.get("status") === MATCH_STATUS.COMPLETED;
  const MATCH_IS_UPCOMING =
    matchStatus && matchStatus.get("status") === MATCH_STATUS.UPCOMING;

  const MATCH_IS_CANCELLED =
    matchStatus && matchStatus.get("status") === MATCH_STATUS.CANCELLED;
  const IS_CHALLENGER = matchStatus && matchStatus.get("isChallenger");
  const IS_NOT_CHALLENGER = matchStatus && !matchStatus.get("isChallenger");
  const CHALLENGER_SCORE = match && match.get("score").get("challenger");
  const CHALLENGEE_SCORE = match && match.get("score").get("challengee");
  const AWAITING_CHALLENGEE_REPORT =
    matchStatus &&
    matchStatus.get("status") === MATCH_STATUS.AWAITING_CHALLENGEE_REPORT;
  const AWAITING_CHALLENGER_REPORT =
    matchStatus &&
    matchStatus.get("status") === MATCH_STATUS.AWAITING_CHALLENGER_REPORT;
  const MATCH_IS_UNDER_REVIEW =
    matchStatus && matchStatus.get("status") === MATCH_STATUS.UNDER_REVIEW;
  const STATUSES = {
    IS_CHAMPIONS_MODE,
    MATCH_IS_LIVE,
    MATCH_IS_COMPLETED,
    MATCH_IS_UPCOMING,
    MATCH_IS_CANCELLED,
    IS_CHALLENGER,
    IS_NOT_CHALLENGER,
    CHALLENGEE_SCORE,
    CHALLENGER_SCORE,
    AWAITING_CHALLENGEE_REPORT,
    AWAITING_CHALLENGER_REPORT,
    MATCH_IS_UNDER_REVIEW
  };

  const isChallengerHost =
    match.get("hosterId") != 0
      ? match.get("hosterId") == challenger.get("id")
        ? true
        : false
      : false;

  const isChallengeeHost =
    match.get("hosterId") != 0
      ? match.get("hosterId") == challengee.get("id")
        ? true
        : false
      : false;

  return (
    <FlexBox
      position="relative"
      width="100%"
      flexDirection={"column"}
      justifyContent="center"
      alignItems="center"
    >
      <BannerBackground />
      <TopBanner match={match} />

      <ContentWrapper>
        <MatchOutcome
          challengee={challengee}
          challenger={challenger}
          match={match}
          statuses={STATUSES}
        />

        <FlexBox display="flex" flexDirection="row" alignItems="center">
          {(MATCH_IS_LIVE ||
            AWAITING_CHALLENGEE_REPORT ||
            AWAITING_CHALLENGER_REPORT ||
            MATCH_IS_COMPLETED ||
            MATCH_IS_UNDER_REVIEW) &&
          IS_CHAMPIONS_MODE &&
          match.get("challengerTeam") ? (
            <ResponsiveLobbyWrapper>
              {teams && (
                <ProfileWrapper>
                  {match && (
                    <ChampionsPlayer
                      prize={prize}
                      match={match}
                      challenger={challenger}
                      challengee={challengee}
                      onShowTeams={onShowTeams}
                      player={challenger}
                      challengeCancelled={MATCH_IS_CANCELLED}
                      challengeAccepted={
                        match && match.get("isInstant")
                          ? MATCH_IS_UPCOMING
                          : true
                      }
                      xp={challengerStars}
                      teams={teams}
                      selectedTeam={match && match.get("challengerTeam")}
                      selectedLanguage={selectedLanguage}
                      isHost={isChallengerHost}
                    />
                  )}

                  {MATCH_IS_COMPLETED &&
                    CHALLENGER_SCORE > CHALLENGEE_SCORE &&
                    IS_CHALLENGER && (
                      <Paragraph
                        fontWeight={theme.fonts.bold}
                        fontSize={theme.fonts.large}
                        color={theme.colors.secondary}
                        textAlign="center"
                      >
                        +${prize}
                      </Paragraph>
                    )}
                </ProfileWrapper>
              )}

              <FlexBox
                width="max-content"
                flexDirection="column"
                alignItems="center"
                margin="-9rem 0 0 0"
              >
                {MATCH_IS_LIVE && (
                  <Paragraph
                    color={theme.colors.silverGrey}
                    fontSize="2.125rem"
                    fontWeight={700}
                    margin="20px auto"
                    width="100%"
                    textAlign="center"
                  >
                    VS
                  </Paragraph>
                )}
                {MATCH_IS_COMPLETED && (
                  <FlexBox
                    flexDirection="column"
                    margin="15px auto"
                    maxWidth="159px"
                    padding="0.6rem"
                    borderRadius="6px"
                    backgroundColor={theme.colors.silverGrey}
                    hoverBackgroundColor={theme.colors.silverGrey}
                  >
                    <Paragraph
                      fontWeight={500}
                      color={theme.colors.primary}
                      fontSize="1.25rem"
                      textAlign="center"
                    >{`${CHALLENGER_SCORE}-${CHALLENGEE_SCORE}`}</Paragraph>
                  </FlexBox>
                )}
              </FlexBox>

              {teams && (
                <ProfileWrapper>
                  <ChampionsPlayer
                    match={match}
                    onShowTeams={onShowTeams}
                    player={challengee}
                    challengeCancelled={MATCH_IS_CANCELLED}
                    challengeAccepted={
                      match && match.get("isInstant") ? true : MATCH_IS_UPCOMING
                    }
                    xp={challengee ? challengeeStars : null}
                    teams={teams}
                    selectedTeam={match && match.get("defenderTeam")}
                    selectedLanguage={selectedLanguage}
                    isHost={isChallengeeHost}
                  />

                  {MATCH_IS_COMPLETED &&
                    CHALLENGEE_SCORE > CHALLENGER_SCORE &&
                    IS_NOT_CHALLENGER && (
                      <Paragraph
                        fontWeight={theme.fonts.bold}
                        fontSize={theme.fonts.large}
                        color={theme.colors.secondary}
                        textAlign="center"
                      >
                        +${prize}
                      </Paragraph>
                    )}
                </ProfileWrapper>
              )}
            </ResponsiveLobbyWrapper>
          ) : (
            <ResponsiveLobbyWrapper>
              <ProfileWrapper>
                <Player
                  prize={prize}
                  player={challenger}
                  challengeCancelled={MATCH_IS_CANCELLED}
                  challengeAccepted={
                    match && match.get("isInstant") ? MATCH_IS_UPCOMING : true
                  }
                  xp={challengerStars}
                  selectedLanguage={selectedLanguage}
                  match={match}
                  isHost={isChallengerHost}
                />

                {MATCH_IS_COMPLETED &&
                  CHALLENGER_SCORE > CHALLENGEE_SCORE &&
                  IS_CHALLENGER && (
                    <Paragraph
                      fontWeight={theme.fonts.bold}
                      fontSize={theme.fonts.large}
                      color={theme.colors.secondary}
                      textAlign="center"
                    >
                      +${prize}
                    </Paragraph>
                  )}
              </ProfileWrapper>

              <FlexBox
                width="max-content"
                flexDirection="column"
                alignItems="center"
                margin="-9rem 0 0 0"
              >
                {MATCH_IS_LIVE && (
                  <Paragraph
                    color={theme.colors.silverGrey}
                    fontSize="2.125rem"
                    fontWeight={700}
                    margin="0 auto"
                    width="100%"
                    textAlign="center"
                  >
                    VS
                  </Paragraph>
                )}
                {MATCH_IS_COMPLETED && (
                  <FlexBox
                    flexDirection="column"
                    margin="15px auto"
                    maxWidth="159px"
                    padding="0.6rem"
                    borderRadius="6px"
                    backgroundColor={theme.colors.silverGrey}
                    hoverBackgroundColor={theme.colors.silverGrey}
                  >
                    <Paragraph
                      fontWeight={500}
                      color={theme.colors.primary}
                      fontSize="1.25rem"
                      textAlign="center"
                    >{`${CHALLENGER_SCORE}-${CHALLENGEE_SCORE}`}</Paragraph>
                  </FlexBox>
                )}
              </FlexBox>

              {challengee ? (
                <ProfileWrapper>
                  <Player
                    prize={prize}
                    player={challengee}
                    challengeCancelled={MATCH_IS_CANCELLED}
                    challengeAccepted={
                      match && match.get("isInstant") ? true : MATCH_IS_UPCOMING
                    }
                    xp={challengee ? challengeeStars : null}
                    selectedLanguage={selectedLanguage}
                    match={match}
                    isHost={isChallengeeHost}
                  />

                  {MATCH_IS_COMPLETED &&
                    CHALLENGEE_SCORE > CHALLENGER_SCORE &&
                    IS_NOT_CHALLENGER && (
                      <FlexBox
                        fontWeight={700}
                        fontSize={theme.fonts.large}
                        color={theme.colors.secondary}
                      >
                        +${prize}
                      </FlexBox>
                    )}
                </ProfileWrapper>
              ) : (
                <ProfileWrapper>
                  {!MATCH_IS_CANCELLED ? (
                    <FlexBox
                      width="90px"
                      height="130px"
                      flexDirection="column"
                      margin="0 auto"
                    >
                      <Loader
                        isLoading={true}
                        height="auto"
                        alignItems="center"
                        scale="100%"
                        margin="15px 0px 8px 0px"
                      />

                      <Heading
                        as="h3"
                        margin="0 0 0 0"
                        color={theme.colors.black}
                        textAlign="center"
                        height="65px"
                      >
                        ???
                      </Heading>
                    </FlexBox>
                  ) : (
                    <></>
                  )}
                </ProfileWrapper>
              )}
            </ResponsiveLobbyWrapper>
          )}
        </FlexBox>
        {!MATCH_IS_UPCOMING &&
          match.get("defenderId") &&
          match.get("challengerId") && (
            <Link to={`/${selectedLanguage}/match-lobby/${matchId}/chat`}>
              <FlexBox
                display={{ base: "flex", md: "none" }}
                backgroundColor={theme.colors.tealBlue}
                hoverBackgroundColor={theme.colors.tealBlue}
                borderRadius="6.25rem"
                justifyContent="space-between"
                alignItems="center"
                margin="0 auto"
                width="15rem"
                padding="0.5rem"
              >
                <Image
                  src="/img/icons/ic_account_circle-24px.svg"
                  width="3rem"
                />
                <Paragraph
                  fontWeight={700}
                  fontSize="1.125rem"
                  margin="0"
                  color={theme.colors.white}
                >
                  {t("OpenChat")}
                </Paragraph>
                <Image src="/img/icons/ic_chat_circle.svg" width="2rem" />
              </FlexBox>
            </Link>
          )}
      </ContentWrapper>
    </FlexBox>
  );
};

export default withTheme(MatchLobbyBanner);

const ProfileWrapper = styled.div`
  height: 270px;
  margin: "0 auto";
`;

// TODO: created just for a temporal purpose - delete it once CoveringImage is back
const BannerBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const ResponsiveLobbyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 768px;
  flex-grow: 1;
  margin: 0 auto;
  justify-content: space-evenly;

  ${media.md`
    flex-direction: row;
    justify-content: space-evenly;
    width: auto;
  `};
`;
