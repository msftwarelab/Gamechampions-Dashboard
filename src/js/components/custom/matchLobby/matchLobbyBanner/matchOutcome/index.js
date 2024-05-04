import React from "react";
import { withTheme } from "~theme";
import { useTranslation } from "react-i18next";
import Paragraph from "~components/atoms/paragraph";
import { FlexBox } from "~components/atoms";
import { MATCHTYPE } from "~containers/matchLobby/constants";

const OutcomeDetails = withTheme(({ text, props, theme }) => {
  const { t } = useTranslation();

  return (
    <Paragraph
      color={theme.colors.lobbyGrey}
      fontWeight={700}
      textAlign="center"
      fontSize="0.875rem"
    >
      {t(text, props)}
    </Paragraph>
  );
});

const MatchOutcome = ({ challengee, challenger, match, statuses, theme }) => {
  const prize = match && match.get("prize");
  const {
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
  } = statuses;

  const rivalMatchOutcomes = MATCH_IS_CANCELLED
    ? "MatchCancelled"
    : "MatchPosted";

  return (
    <div>
      {(match &&
        !match.get("isInstant") &&
        challengee &&
        IS_CHAMPIONS_MODE &&
        (MATCH_IS_UPCOMING || MATCH_IS_CANCELLED) && (
          <OutcomeDetails
            text="ChampionMatchDetails"
            props={{
              gameTitle: match.get("gameTitle"),
              prize: match && match.get("prize")
            }}
          />
        )) ||
        (!IS_CHAMPIONS_MODE &&
          challengee &&
          (MATCH_IS_UPCOMING || MATCH_IS_CANCELLED) && (
            <OutcomeDetails
              text="DefaultMatchDetails"
              props={{
                gameTitle: match.get("gameTitle"),
                platform: match.get("platform"),
                prize: prize
              }}
            />
          )) || (
          <FlexBox
            backgroundColor={theme.colors.lobbyBackgroundGrey}
            hoverBackgroundColor={theme.colors.lobbyBackgroundGrey}
            width="95%"
            height="auto"
            margin="1rem auto"
            borderRadius="16px"
            padding="10px"
            alignItems="center"
          >
            {IS_CHAMPIONS_MODE && IS_CHALLENGER && MATCH_IS_LIVE && challengee && (
              <OutcomeDetails
                text="MatchStartChampionChallenger"
                props={{
                  platformId: challengee?.get("platformId")
                }}
              />
            )}

            {IS_CHAMPIONS_MODE && IS_NOT_CHALLENGER && MATCH_IS_LIVE && (
              <OutcomeDetails
                text="MatchStartChampionChallengee"
                props={{
                  platformId: challengee?.get("platformId")
                }}
              />
            )}

            {!IS_CHAMPIONS_MODE && IS_NOT_CHALLENGER && MATCH_IS_LIVE && (
              <OutcomeDetails
                text="MatchStartDefaultChallengee"
                props={{
                  platformId: challenger.get("platformId")
                }}
              />
            )}

            {!IS_CHAMPIONS_MODE &&
              challengee &&
              IS_CHALLENGER &&
              MATCH_IS_LIVE && (
                <OutcomeDetails
                  text="MatchStartDefaultChallenger"
                  props={{
                    platformId: challengee?.get("platformId")
                  }}
                />
              )}
            {!challengee && match?.get("matchType") !== MATCHTYPE.RIVAL && (
              <OutcomeDetails
                text={rivalMatchOutcomes}
                props={{
                  platformId: challenger.get("platformId")
                }}
              />
            )}

            {match?.get("matchType") === MATCHTYPE.RIVAL &&
              !MATCH_IS_COMPLETED &&
              !MATCH_IS_LIVE &&
              !AWAITING_CHALLENGEE_REPORT &&
              !AWAITING_CHALLENGEE_REPORT &&
              !MATCH_IS_UNDER_REVIEW &&
              !AWAITING_CHALLENGER_REPORT && (
                <OutcomeDetails
                  text={
                    MATCH_IS_CANCELLED
                      ? "MatchCancelled"
                      : IS_CHALLENGER && !MATCH_IS_UPCOMING
                      ? "MatchAccept"
                      : "MatchPosted"
                  }
                  props={{
                    platformId: challenger.get("platformId")
                  }}
                />
              )}

            {((AWAITING_CHALLENGEE_REPORT && IS_CHALLENGER) ||
              (AWAITING_CHALLENGER_REPORT && IS_NOT_CHALLENGER)) && (
              <OutcomeDetails
                text="MatchLobbyWaitingOpponentResult"
                props={{}}
              />
            )}

            {((AWAITING_CHALLENGER_REPORT && IS_CHALLENGER) ||
              (AWAITING_CHALLENGEE_REPORT && IS_NOT_CHALLENGER)) && (
              <OutcomeDetails
                text="MatchLobbyOpponentSubmittedResult"
                props={{}}
              />
            )}

            {MATCH_IS_UNDER_REVIEW && (
              <OutcomeDetails text="MatchLobbyUnderReview" props={{}} />
            )}

            {(MATCH_IS_COMPLETED &&
              CHALLENGER_SCORE > CHALLENGEE_SCORE &&
              ((IS_CHALLENGER && (
                <OutcomeDetails
                  text="WinnerMessage"
                  props={{ winnerName: challenger.get("userName") }}
                />
              )) ||
                (IS_NOT_CHALLENGER && (
                  <OutcomeDetails
                    text="LoserMessage"
                    props={{ loserName: challengee.get("userName") }}
                  />
                )))) ||
              (MATCH_IS_COMPLETED &&
                CHALLENGEE_SCORE > CHALLENGER_SCORE &&
                ((IS_CHALLENGER && (
                  <OutcomeDetails
                    text="LoserMessage"
                    props={{ loserName: challenger.get("userName") }}
                  />
                )) ||
                  (IS_NOT_CHALLENGER && (
                    <OutcomeDetails
                      text="WinnerMessage"
                      props={{ winnerName: challengee.get("userName") }}
                    />
                  )))) ||
              (MATCH_IS_COMPLETED && CHALLENGEE_SCORE == CHALLENGER_SCORE && (
                <OutcomeDetails text="DrawMessage" props={{}} />
              ))}
          </FlexBox>
        )}
    </div>
  );
};

export default withTheme(MatchOutcome);
