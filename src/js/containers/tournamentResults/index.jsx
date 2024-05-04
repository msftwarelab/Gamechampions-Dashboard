import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { selectIsMobile } from "~containers/app/reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import {
  selectTournamentRanking,
  selectTournamentsList
} from "~containers/tournaments/reducer";
import TournamentPaywallComponent from "~components/custom/tournaments/paywall";
import TournamentInfoComponent from "~components/custom/tournaments/tournamentInfo";
import { submitChallenge } from "~containers/createChallenge/actions";
import { selectProfile } from "~containers/myaccount/reducer";
import { selectGames } from "~containers/games/reducer";
import { getMatches, getTournamentsResults } from "~containers/matches/actions";
import { selectTournamentHistoricalMatches } from "~containers/matches/reducer";
import { getGames } from "~containers/games/actions";
import { getInstantMatches } from "~containers/matchMaking/actions";
import { selectGame as selectMatchMakingGame } from "~containers/matchMaking/reducer";
import { selectTournament } from "~containers/createChallenge/reducer";
import {
  initGlobalChatHub,
  postHubMessages
} from "~containers/globalChat/actions";
import { selectIsConnectionCreated } from "~containers/globalChat/reducer";
import { RETURN_URL } from "./constants";
import {
  getTournamentRanking,
  getTournamentsList,
  purchaseFreeMatches,
  resetTournamentRanking
} from "~containers/tournaments/actions";
import { toast } from "react-toastify";
import ErrorToastNotification from "~components/custom/toastNotification/errorToastNotification";
import { useTranslation } from "react-i18next";

const TournamentResults = ({
  profile,
  games,
  matchMakingGame,
  isConnectionCreated,
  selectedLanguage,
  isMobile,
  history,
  match,
  ranking,
  tournament,
  tournamentsList,
  tournamentResults,
  onSubmitChallenge,
  onLoadGames,
  onLoadMatches,
  onLoadInstantMatches,
  onInitGlobalChatHub,
  onPostHubMessages,
  onPurchaseFreeMatches,
  onLoadTournamentsList,
  onLoadTournamentRanking,
  onResetTournamentRanking,
  onLoadTournamentResults
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [showTransactionResult, setShowTransactionResult] = useState(false);
  const [isSuccessfullTransaction, setIsSuccessfullTransaction] = useState(
    null
  );
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [showEnergyPackPaywall, setShowEnergyPackPaywall] = useState(false);

  const gameId = match.params.gameId;
  const tournamentId = match.params.tournamentId;
  const { t } = useTranslation();

  useEffect(() => {
    onLoadTournamentsList({ gameId, language: selectedLanguage });

    return () => {
      onResetTournamentRanking();
    };
  }, []);

  const returnUrl = `${RETURN_URL}${selectedLanguage}/match-lobby`;

  const handleLoadRanking = () => {
    onLoadTournamentRanking({ id: profile.get("id"), gameId, tournamentId });
  };

  const updateMatches = () => {
    const promises = [];

    if (matchMakingGame && matchMakingGame.get("id")) {
      promises.push(
        onLoadInstantMatches({ gameId: matchMakingGame.get("id") })
      );
    }

    if (games.size > 0) {
      promises.push(
        onLoadMatches({ userId: profile.get("id"), games: games.toJS() })
      );
    } else {
      promises.push(
        onLoadGames().then((response = {}) => {
          const { data = [] } = response;
          return onLoadMatches({ userId: profile.get("id"), games: data });
        })
      );
    }

    return Promise.all(promises);
  };

  const handleSubmitChallenge = () => {
    const data = {
      gameId: gameId,
      rule: "Free Match",
      format: "Free Match",
      prize: 0,
      isIntant: true,
      isChampionsMode: true,
      isTournamentMode: true,
      challengerId: profile.get("id"),
      //"DefenderId": 22315,
      summary: "<p>FREE MATCH</p>",
      thumbnailUrl: "/media/3551/trophy.png",
      tournamentId: tournamentId
    };

    setShowTransactionResult(true);
    setShowTransactionResult(true);
    setSubmitting(true);

    onSubmitChallenge(data)
      .then(data => {
        updateMatches().then(() => {
          // setSubmitting(false);

          let tournamentPrize =
            tournament &&
            tournament
              .get("prizes")
              .map(x => parseInt(x))
              .reduce((a, b) => a + b, 0);
          let messagedata = {
            messageText: "PublicChallengeHasBeenCreated",
            isFromSender: true,
            isTranslatable: true,
            isLink: true,
            gameId: data.gameId,
            isTournamentMode: data.isTournamentMode,
            prize: data.prize > 0 ? data.prize : tournamentPrize,
            userId: profile.get("id")
          };
          if (!isConnectionCreated) {
            onInitGlobalChatHub().then(() => {
              onPostHubMessages(messagedata);
            });
          } else {
            onPostHubMessages(messagedata);
          }

          return history.push(
            `${returnUrl}/${data?.id}?success=true&action=create&object=Challenge`
          );
        });
      })
      .catch(error => {
        setSubmitting(false);
        if (
          error.status === 400 &&
          error.data === "PlayerFreeMatchesExceeded"
        ) {
          setShowEnergyPackPaywall(true);
          setShowTransactionResult(false);
          setIsSuccessfullTransaction(null);
        } else if (error.data === "PlayerHasALiveMatch") {
          toast(<ErrorToastNotification message={t(error.data)} />, {
            className: "toast-custom",
            hideProgressBar: true,
            closeButton: false
          });
        } else if (error.data === "ChallengerHasALiveMatch") {
          toast(<ErrorToastNotification message={t(error.data)} />, {
            className: "toast-custom",
            hideProgressBar: true,
            closeButton: false
          });
        } else if (error.data === "ChallengeExist") {
          toast(<ErrorToastNotification message={t(error.data)} />, {
            className: "toast-custom",
            hideProgressBar: true,
            closeButton: false
          });
        } else if (error.data === "PlayerTagsMissing") {
          toast(
            <ErrorToastNotification
              message={t("RequestPlayerTags")}
              action={{
                text: t("AddGamerTag"),
                handler: () =>
                  history.push(`/${selectedLanguage}/my-account/gamer-tags`)
              }}
            />,
            {
              className: "toast-custom",
              autoClose: false,
              closeButton: false
            }
          );
        } else {
          toast(<ErrorToastNotification message={t("GenericError")} />, {
            className: "toast-custom",
            hideProgressBar: true,
            closeButton: false
          });
        }
        setSubmitting(false);
      });
  };

  const handleSetSelectedTournament = tournament => {
    setSelectedTournament(tournament);
  };

  const handlePurchaseFreeMatches = energyPackage => {
    if (selectedTournament) {
      const data = {
        playerId: profile.toJS().id,
        tournamentId,
        energyPackage: {
          numberOfMatches: energyPackage.numberOfMatches,
          fee: energyPackage.fee
        }
      };

      setSubmitting(true);

      onPurchaseFreeMatches(data)
        .then(() => {
          setSubmitting(false);
          setIsSuccessfullTransaction(true);
          setShowTransactionResult(true);
        })
        .catch(err => {
          setSubmitting(false);
          if (err.data === "InsufficientFunds") {
            toast(
              <ErrorToastNotification
                message={t("LowBalanceMessage")}
                action={{
                  text: t("AddFunds"),
                  handler: () =>
                    history.push(`/${selectedLanguage}/deposit/choose-amount`)
                }}
              />,
              {
                className: "toast-custom",
                hideProgressBar: true,
                closeButton: false
              }
            );
          } else {
            setIsSuccessfullTransaction(false);
            setShowTransactionResult(true);
          }
        });
    }
  };

  return !showEnergyPackPaywall ? (
    <TournamentInfoComponent
      selectedLanguage={selectedLanguage}
      isMobile={isMobile}
      history={history}
      match={match}
      tournamentsList={tournamentsList}
      tournamentResults={tournamentResults}
      onSubmitChallenge={handleSubmitChallenge}
      submitting={submitting}
      ranking={ranking}
      profile={profile}
      onLoadTournamentResults={onLoadTournamentResults}
      onLoadTournamentRanking={handleLoadRanking}
      onSetSelectedTournament={handleSetSelectedTournament}
    />
  ) : (
    <TournamentPaywallComponent
      selectedLanguage={selectedLanguage}
      history={history}
      match={match}
      tournament={selectedTournament}
      onEnergyRecharge={handlePurchaseFreeMatches}
      showTransactionResult={showTransactionResult}
      isSuccessfullTransaction={isSuccessfullTransaction}
      submitting={submitting}
      onSubmitChallenge={handleSubmitChallenge}
    />
  );
};

const mapStateToProps = state => ({
  profile: selectProfile(state),
  tournament: selectTournament(state),
  selectedLanguage: selectSelectedLanguage(state),
  isMobile: selectIsMobile(state),
  tournamentsList: selectTournamentsList(state),
  matchMakingGame: selectMatchMakingGame(state),
  games: selectGames(state),
  ranking: selectTournamentRanking(state),
  isConnectionCreated: selectIsConnectionCreated(state),
  tournamentResults: selectTournamentHistoricalMatches(state)
});

const mapDispatchToProps = dispatch => ({
  onSubmitChallenge: data => dispatch(submitChallenge(data)),
  onLoadMatches: data => dispatch(getMatches(data)),
  onLoadGames: data => dispatch(getGames(data)),
  onLoadInstantMatches: data => dispatch(getInstantMatches(data)),
  onLoadTournamentRanking: data => dispatch(getTournamentRanking(data)),
  onResetTournamentRanking: () => dispatch(resetTournamentRanking()),
  onLoadTournamentsList: data => dispatch(getTournamentsList(data)),
  onLoadTournamentResults: data => dispatch(getTournamentsResults(data)),
  onInitGlobalChatHub: () => dispatch(initGlobalChatHub()),
  onPostHubMessages: data => dispatch(postHubMessages(data)),
  onPurchaseFreeMatches: data => dispatch(purchaseFreeMatches(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(TournamentResults);
