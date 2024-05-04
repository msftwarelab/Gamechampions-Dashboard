import React from "react";
import { styled, withTheme, media } from "~theme";
import MatchLobbyBanner from "./matchLobbyBanner";
import { Button, FlexBox, Paragraph, Icon, Loader } from "~components/atoms";
import Card from "~components/card/card";
import MatchLobbyContent from "./matchLobbyContent";
import {
  MATCH_ACTION,
  MATCH_STATUS,
  MATCHTYPE
} from "~containers/matchLobby/constants";
import { useTranslation } from "react-i18next";
import ChallengeButton from "~components/custom/playerDetails/personalDetails/challengeButton";
import PhotoProofUpload from "./photoProof";
import moment from "moment";
import Footer from "~components/custom/footer";

const MatchLobby = ({
  match,
  currency,
  matchStatus,
  matchId,
  theme,
  selectedLanguage,
  handleAcceptChallenge,
  handleRefuseChallenge,
  handleCancelChallenge,
  handleStartMatch,
  challengerStars,
  challengeeStars,
  actionLoading,
  teams,
  onShowTeams,
  showTeams,
  error,
  tournament,
  tournamentPointsTable,
  games,
  reportResultRemainingTime,
  autoValidationRemainingTime,
  rivalMatchRemainingTime,
  dashboardFooter,
  history
}) => {
  const { t } = useTranslation();
  const potentialPoints = matchStatus?.get("isChallenger")
    ? match?.get("challengerPointPotentials")
    : match?.get("defenderPointPotentials");

  return (
    <MainWrapper className="match__lobby__wrapper">
      <FlexBox gap="3rem">
        <Card className="match__lobby__card">
          {match && (
            <BannerStyle>
              <MatchLobbyBanner
                onShowTeams={onShowTeams}
                match={match}
                matchId={matchId}
                gameTitle={match?.get("gameTitle")}
                challenger={match?.get("challenger")}
                challengerStars={challengerStars}
                challengeeStars={challengeeStars}
                challengee={match?.get("challengee")}
                score={match?.get("score")}
                scoreAdvantage={match?.get("scoreAdvantage")}
                imageUrl={match?.get("bannerImageUrl")}
                matchStatus={matchStatus}
                selectedLanguage={selectedLanguage}
                teams={teams}
                showTeams={showTeams}
                betAmount={match?.get("betAmount")}
                games={games}
              />
            </BannerStyle>
          )}
          <FlexBox
            flexDirection={{ base: "column", md: "row" }}
            width={{ base: "100%", md: "auto" }}
            alignItems="center"
            justifyContent="center"
            padding={{ base: "0.5rem 1rem", md: ".375rem 0" }}
            backgroundColor={theme.colors.white}
            textAlign="center"
          >
            {((match &&
              !match?.get("isInstant") &&
              matchStatus &&
              matchStatus?.get("status") === MATCH_STATUS.CANCELLED &&
              matchStatus?.get("isChallenger")) ||
              (match &&
                match?.get("matchType") === MATCHTYPE.RIVAL &&
                matchStatus &&
                matchStatus?.get("status") === MATCH_STATUS.CANCELLED &&
                !matchStatus?.get("isChallenger"))) && (
              <Paragraph
                margin="2rem 0"
                color={theme.colors.fontColor}
                fontStyle="italic"
              >
                {t("MatchLobbyPublicMatchRefused", {
                  challengee: match?.get("challengee")?.get("userName")
                })}
              </Paragraph>
            )}
            {match &&
              match?.get("isInstant") &&
              !match?.get("challengee") &&
              matchStatus &&
              matchStatus?.get("status") === MATCH_STATUS.UPCOMING &&
              matchStatus?.get("isChallenger") && (
                <FlexBox flexDirection="column" width="100%">
                  <FlexBox
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Paragraph
                      margin="2rem 0"
                      color={theme.colors.greyDark}
                      fontWeight={700}
                      fontSize="30px"
                    >
                      {t("MatchLobbyWaitingForAChallengee")}
                    </Paragraph>
                    <FlexBox
                      onClick={() => {
                        if (
                          actionLoading != null &&
                          actionLoading != MATCH_ACTION.CANCEL_CHALLENGE
                        )
                          return;
                        handleCancelChallenge(MATCH_ACTION.CANCEL_CHALLENGE);
                      }}
                      margin={{ base: "1em", md: "1em 0.5em" }}
                      padding={{ base: "0.5em 1em", md: "1em 1.66em" }}
                      width={{ base: "7em", md: "8em" }}
                      color={theme.colors.white}
                      backgroundColor={theme.colors.steelGrey}
                      hoverBackgroundColor={theme.colors.steelGrey}
                      borderRadius="1em"
                      cursor="pointer"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {actionLoading != null &&
                      actionLoading == MATCH_ACTION.CANCEL_CHALLENGE ? (
                        <Loader isLoading={true} scale="1.5rem" />
                      ) : (
                        <>
                          <Icon
                            scale="1.5"
                            icon="closeCircle"
                            color={theme.colors.white}
                            margin=".125rem .5rem 0 0"
                          />
                          {t("ButtonDynamicFormCancel")}
                        </>
                      )}
                    </FlexBox>
                  </FlexBox>
                </FlexBox>
              )}
            <FlexBox flexDirection="column">
              {rivalMatchRemainingTime > 0 &&
              matchStatus?.get("status") === MATCH_STATUS.WAITING &&
              match?.get("matchType") === MATCHTYPE.RIVAL ? (
                <FlexBox
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Paragraph color={theme.colors.greyLight} fontWeight={700}>
                    <FlexBox justifyContent="center" alignItems="center">
                      <img
                        src="/img/timer.png"
                        style={{ padding: "0px 10px 0px 0px !important" }}
                      />
                      <Paragraph
                        margin="0 0 0 4px"
                        fontSize={{ base: "0.9rem", md: "1rem" }}
                      >
                        {t("MatchLobbyRivalMatchWaiting")}
                      </Paragraph>
                      <Paragraph
                        color={theme.colors.greyLight}
                        fontWeight={700}
                        padding="10px 0px 10px 5px"
                        fontSize={{ base: "0.9rem", md: "1rem" }}
                      >
                        {moment
                          .utc(rivalMatchRemainingTime * 1000)
                          .format("m:ss")}
                      </Paragraph>
                    </FlexBox>
                  </Paragraph>
                </FlexBox>
              ) : (
                <></>
              )}
              {match &&
                !match?.get("isInstant") &&
                match?.get("challengee") &&
                matchStatus &&
                matchStatus?.get("status") === MATCH_STATUS.UPCOMING &&
                matchStatus?.get("isChallenger") && (
                  <FlexBox flexDirection="column" width="100%">
                    <FlexBox
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                    >
                      <FlexBox
                        onClick={() => {
                          if (
                            actionLoading != null &&
                            actionLoading != MATCH_ACTION.CANCEL_CHALLENGE
                          )
                            return;
                          handleCancelChallenge(MATCH_ACTION.CANCEL_CHALLENGE);
                        }}
                        margin={{ base: "1em", md: "1em 0.5em" }}
                        padding={{ base: "0.5em 1em", md: "1em 1.66em" }}
                        width={{ base: "7em", md: "8em" }}
                        color={theme.colors.white}
                        backgroundColor={theme.colors.steelGrey}
                        hoverBackgroundColor={theme.colors.steelGrey}
                        borderRadius="1em"
                        cursor="pointer"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {actionLoading != null &&
                        actionLoading == MATCH_ACTION.CANCEL_CHALLENGE ? (
                          <Loader isLoading={true} scale="1.5rem" />
                        ) : (
                          <>
                            <Icon
                              scale="1.5"
                              icon="closeCircle"
                              color={theme.colors.white}
                              margin=".125rem .5rem 0 0"
                            />
                            {t("ButtonDynamicFormCancel")}
                          </>
                        )}
                      </FlexBox>
                    </FlexBox>
                  </FlexBox>
                )}
              {((match &&
                !match?.get("isInstant") &&
                matchStatus &&
                matchStatus?.get("status") === MATCH_STATUS.UPCOMING &&
                !matchStatus?.get("isChallenger")) ||
                (match &&
                  matchStatus &&
                  matchStatus?.get("status") === MATCH_STATUS.WAITING &&
                  match?.get("matchType") === MATCHTYPE.RIVAL &&
                  matchStatus?.get("isChallenger"))) && (
                <FlexBox flexDirection="column" width="100%">
                  <FlexBox
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Button
                      isLoading={
                        !error &&
                        actionLoading != null &&
                        actionLoading == MATCH_ACTION.ACCEPT_CHALLENGE
                      }
                      isDisabled={
                        actionLoading != null &&
                        actionLoading != MATCH_ACTION.ACCEPT_CHALLENGE
                      }
                      onClick={() =>
                        match?.get("matchType") === MATCHTYPE.INCOGNITO
                          ? handleAcceptChallenge(MATCH_ACTION.ACCEPT_CHALLENGE)
                          : handleStartMatch(MATCH_ACTION.START_MATCH)
                      }
                      margin="1em 0.5em"
                      padding={{ base: "1.33em 1.66em", md: "1em 1.66em" }}
                      width={{ base: "100%", md: "auto" }}
                    >
                      {t("MatchLobbyAcceptChallenge")}
                    </Button>
                    <Button
                      isLoading={
                        actionLoading != null &&
                        actionLoading == MATCH_ACTION.REFUSE_CHALLENGE
                      }
                      isDisabled={
                        actionLoading != null &&
                        actionLoading != MATCH_ACTION.REFUSE_CHALLENGE
                      }
                      onClick={() =>
                        handleRefuseChallenge(MATCH_ACTION.REFUSE_CHALLENGE)
                      }
                      margin={{ base: "1em", md: "1em 0.5em" }}
                      padding={{ base: "1.33em 1.66em", md: "1em 1.66em" }}
                      width={{ base: "100%", md: "auto" }}
                      color={theme.colors.indianRed}
                      backgroundColor={theme.colors.white}
                      visitedColor={theme.colors.indianRed}
                      hoverColor={theme.colors.white}
                      hoverBackgroundColor={theme.colors.primary}
                      border="0"
                      boxShadow="none"
                      font-size="40px "
                    >
                      {t("MatchLobbyRefuseChallenge")}
                    </Button>
                  </FlexBox>
                </FlexBox>
              )}
              {((match &&
                !match?.get("isInstant") &&
                matchStatus &&
                matchStatus?.get("status") === MATCH_STATUS.UPCOMING &&
                matchStatus?.get("isChallenger")) ||
                (match &&
                  matchStatus &&
                  matchStatus?.get("status") === MATCH_STATUS.WAITING &&
                  match?.get("matchType") === MATCHTYPE.RIVAL &&
                  !matchStatus?.get("isChallenger"))) && (
                <Paragraph
                  margin="2rem auto"
                  color={theme.colors.greyLight}
                  fontWeight={700}
                >
                  {t("MatchLobbyWaitingForOpponent")}
                </Paragraph>
              )}
            </FlexBox>
            {matchStatus &&
              matchStatus?.get("status") === MATCH_STATUS.WAITING &&
              !error &&
              match &&
              match?.get("matchType") === MATCHTYPE.INCOGNITO && (
                <Button
                  isLoading={
                    actionLoading != null &&
                    actionLoading == MATCH_ACTION.START_MATCH
                  }
                  isDisabled={
                    actionLoading != null &&
                    actionLoading != MATCH_ACTION.START_MATCH
                  }
                  onClick={() => handleStartMatch(MATCH_ACTION.START_MATCH)}
                  margin="1em 0.5em"
                  padding={{ base: "1.33em 1.66em", md: "1em 1.66em" }}
                  width={{ base: "100%", md: "auto" }}
                >
                  {t("MatchLobbyStartMatch")}
                </Button>
              )}
            <FlexBox
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              {autoValidationRemainingTime > 0 &&
              (matchStatus?.get("status") ===
                MATCH_STATUS.AWAITING_CHALLENGER_REPORT ||
                matchStatus?.get("status") ===
                  MATCH_STATUS.AWAITING_CHALLENGEE_REPORT) ? (
                <FlexBox
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Paragraph color={theme.colors.greyLight} fontWeight={700}>
                    {matchStatus?.get("status") ===
                    MATCH_STATUS.AWAITING_CHALLENGER_REPORT
                      ? match?.get("challengee")?.get("userName")
                      : match?.get("challenger")?.get("userName")}
                    &nbsp; reported &nbsp;
                    {match?.get("score")?.get("challenger")} -{" "}
                    {match?.get("score")?.get("challengee")}
                    <FlexBox justifyContent="center" alignItems="center">
                      <img
                        src="/img/timer.png"
                        style={{ padding: "0px 10px 0px 0px !important" }}
                      />
                      <Paragraph
                        color={theme.colors.greyLight}
                        fontWeight={700}
                        padding="10px 0px 10px 10px"
                      >
                        {moment
                          .utc(autoValidationRemainingTime * 1000)
                          .format("m:ss")}
                      </Paragraph>
                    </FlexBox>
                  </Paragraph>
                </FlexBox>
              ) : (
                <></>
              )}
              {matchStatus &&
                (matchStatus?.get("status") === MATCH_STATUS.LIVE ||
                  (matchStatus?.get("status") ===
                    MATCH_STATUS.AWAITING_CHALLENGEE_REPORT &&
                    !matchStatus?.get("isChallenger")) ||
                  (matchStatus?.get("status") ===
                    MATCH_STATUS.AWAITING_CHALLENGER_REPORT &&
                    matchStatus?.get("isChallenger"))) &&
                !!reportResultRemainingTime &&
                (reportResultRemainingTime > 0 ? (
                  <Paragraph
                    margin="2rem auto"
                    color={theme.colors.greyLight}
                    fontWeight={700}
                  >
                    {t("MatchLobbyTimeToReportResult")}&nbsp;
                    {moment
                      .utc(reportResultRemainingTime * 1000)
                      .format("m:ss")}
                  </Paragraph>
                ) : (
                  <FlexBox
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Button
                      to={`/${selectedLanguage}/match-lobby/${matchId}/report-results`}
                      margin="1em 0.5em"
                      padding={{ base: "1.33em 1.66em", md: "1em 1.66em" }}
                      width={{ base: "100%", md: "auto" }}
                    >
                      {t("MatchLobbyReportResult")}
                    </Button>
                  </FlexBox>
                ))}
              {matchStatus &&
                match &&
                matchStatus?.get("status") === MATCH_STATUS.UNDER_REVIEW && (
                  <PhotoProofUpload
                    match={match}
                    history={history}
                    selectedLanguage={selectedLanguage}
                  />
                )}
            </FlexBox>
            {(matchStatus &&
              match &&
              matchStatus?.get("status") === MATCH_STATUS.COMPLETED &&
              matchStatus?.get("isChallenger") &&
              match && (
                <ChallengeButton
                  to={`/${selectedLanguage}/player-details/${match &&
                    match?.get("challengee")?.get("id")}/send-challenge`}
                >
                  {t("Rematch")}
                </ChallengeButton>
              )) ||
              (matchStatus &&
                matchStatus?.get("status") === MATCH_STATUS.COMPLETED &&
                !matchStatus?.get("isChallenger") &&
                match && (
                  <ChallengeButton
                    to={`/${selectedLanguage}/player-details/${match
                      ?.get("challenger")
                      ?.get("id")}/send-challenge`}
                  >
                    {t("Rematch")}
                  </ChallengeButton>
                ))}
          </FlexBox>

          {matchStatus &&
            match &&
            potentialPoints &&
            (matchStatus?.get("status") === MATCH_STATUS.LIVE ||
              matchStatus?.get("status") === MATCH_STATUS.UNDER_REVIEW ||
              matchStatus?.get("status") === MATCH_STATUS.COMPLETED ||
              matchStatus?.get("status") ===
                MATCH_STATUS.AWAITING_CHALLENGER_REPORT ||
              matchStatus?.get("status") ===
                MATCH_STATUS.AWAITING_CHALLENGEE_REPORT) && (
              <PointsWrapper>
                <PointsTextWrapper>
                  {t("TournamentLeaderboardPointsLabel")}
                </PointsTextWrapper>
                <FlexBox
                  justifyContent="center"
                  alignItems="center"
                  margin="1.5rem 0 0 0"
                >
                  <PotentialPointsWrapper
                    bgColor="#1d81f6"
                    textColor={theme.colors.white}
                  >
                    +{potentialPoints?.get("potentialWinTournamentPoints")}
                  </PotentialPointsWrapper>
                  <Paragraph>{t("MatchInfoTournamnetWin")}</Paragraph>
                </FlexBox>
                <FlexBox
                  justifyContent="center"
                  alignItems="center"
                  margin="1.5rem 0 0 0"
                >
                  <PotentialPointsWrapper bgColor="#F0F0F0" textColor="#929292">
                    {potentialPoints?.get("potentialDrawTournamentPoints")}
                  </PotentialPointsWrapper>
                  <Paragraph>{t("MatchInfoTournamnetDraw")}</Paragraph>
                </FlexBox>
                <FlexBox
                  justifyContent="center"
                  alignItems="center"
                  margin="1.5rem 0 0 0"
                >
                  <PotentialPointsWrapper
                    bgColor="#FF0000"
                    textColor={theme.colors.white}
                  >
                    {potentialPoints?.get("potentialLossTournamentPoints")}
                  </PotentialPointsWrapper>
                  <Paragraph>{t("MatchInfoTournamnetLoss")}</Paragraph>
                </FlexBox>
              </PointsWrapper>
            )}
        </Card>
        <DisplayNoneWhenNotDesktopWrapper>
          {match && (
            <MatchLobbyContent
              showTeams={showTeams}
              match={match}
              matchId={matchId}
              currency={currency}
              matchStatus={matchStatus}
              selectedLanguage={selectedLanguage}
              tournament={tournament}
              tournamentPointsTable={tournamentPointsTable}
            />
          )}
        </DisplayNoneWhenNotDesktopWrapper>
      </FlexBox>
      <Paragraph
        className="match__id__text"
        color={theme.colors.greyLight}
        fontSize={theme.fonts.fontSizeNormal}
        margin="0 auto"
        width="fit-content"
      >
        Match id: {matchId}
      </Paragraph>
      <Footer
        dashboardFooter={dashboardFooter}
        selectedLanguage={selectedLanguage}
      />
    </MainWrapper>
  );
};
export default withTheme(MatchLobby);

const MainWrapper = styled.section`
  height: auto;
  gap: 3rem;
  padding: 1em 0.5em 0.5em;
  overflow-y: auto;
  transition: color 0.3s;
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  ${media.md`
    margin: 0 0.25rem;
    padding: 4rem 1.25rem;
    // its required to set this color due to scroll bar 
    color: ${({ theme }) => theme.colors.blackTransparent};
    height: auto;
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
  `};
`;

const BannerStyle = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 1rem;
  height: 35rem;
`;

const DisplayNoneWhenNotDesktopWrapper = styled.div`
  height: 46rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const PointsWrapper = styled.div`
  display: flex;
  justify-content: center;
  color: black;
  gap: 2rem;
  border-top: 1px solid #d0d0d0;
  padding: 0 0 1.4rem 0;
  @media (max-width: 454px) {
    gap: 0.7rem;
  }
`;

const PotentialPointsWrapper = styled.div`
  display: flex;
  background-color: ${({ bgColor }) => bgColor};
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.625rem;
  color: ${({ textColor }) => textColor};
  justify-content: center;
  align-items: center;
  margin-right: 0.3rem;
`;

const PointsTextWrapper = styled.div`
  display: flex;
  position: absolute;
  padding: 1rem;
  height: 1.4rem;
  left: -1.6rem;
  margin-top: 1.6rem;
  border-radius: 1rem 0 0 0;
  background-color: #f0f0f0;
  color: #00143c;
  font-size: 0.875rem;
  transform: rotate(-90deg);
  text-transform: uppercase;
  text-align: center;
  align-items: center;
  justify-content: center;
`;
