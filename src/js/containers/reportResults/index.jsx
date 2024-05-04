import React from "react";
import { connect } from "react-redux";

import Modal from "../../components/modal/modal";
import { getPage } from "../page/actions";
import { withPage } from "~hocs";
import Card from "~components/card/card";
import DynamicForm from "~components/molecules/dynamicForm";
import { REDUCER_NAME, getFormFields } from "./constants";
import { submitResults, submitAdminResults } from "./actions";
import {
  selectChallengee,
  selectChallenger,
  selectScoreAdvantage,
  selectPlatform,
  selectChallengerTeam,
  selectDefenderTeam
} from "~containers/setScoreAdvantage/reducer";
import {
  getMatchDetails,
  fetchMatchDetails
} from "~containers/setScoreAdvantage/actions";
import { getMatch } from "~containers/matchLobby/actions";
import { selectProfile } from "~containers/myaccount/reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import {
  selectChallengerStars,
  selectChallengeeStars
} from "~containers/matchLobby/reducer";
import { getReturnUrl } from "../../util/util";
import { ROLES } from "~service/constants";
import { getPlayerMatches } from "~containers/players/actions";
import { selectMatch } from "~containers/matchLobby/reducer";

class ReportResults extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      finalScore: {
        challengerFinalScore: null,
        challengeeFinalScore: null
      }
    };
  }

  componentDidMount() {
    const { match, onLoadMatchDetails, onLoadMatch } = this.props;

    const matchId = match.params.matchId;
    onLoadMatch({ matchId });
    onLoadMatchDetails({ matchId });
  }

  render() {
    const {
      page,
      match,
      history,
      challengee,
      challenger,
      defenderTeam,
      challengerTeam,
      scoreAdvantage,
      profile,
      selectedLanguage,
      matchPlatform,
      challengerStars,
      challengeeStars,
      location = {},
      previousLocation = {},
      onSubmitAdmin,
      onSubmitPlayer,
      matchData
    } = this.props;
    const matchId = match.params.matchId;
    const userId = profile && profile.get("id");
    const isAdmin = profile && profile.get("role") === ROLES.ADMIN;

    const returnUrl = getReturnUrl({
      location,
      previousLocation,
      selectedLanguage
    });

    const {
      challengeeFinalScore,
      challengerFinalScore
    } = this.state.finalScore;

    return (
      <Modal onClick={() => history.push(returnUrl)}>
        <Card
          titleProps={{ margin: "30px auto" }}
          title={page.get("title")}
          html={page.get("html")}
          buttons={page.buttons}
          className="create-challenge-form"
          closeUrl={returnUrl}
        >
          <DynamicForm
            action={match.url}
            formFields={getFormFields({
              challengee: {
                ...challengee?.toJS(),
                team: defenderTeam && defenderTeam.get("thumbnailUrl"),
                stars: challengeeStars
              },
              challenger: {
                ...challenger?.toJS(),
                team: challengerTeam && challengerTeam.get("thumbnailUrl"),
                stars: challengerStars
              },
              matchPlatform: matchPlatform,
              recommendedScoreAdvantage: scoreAdvantage?.toJS(),
              finalScore: {
                challengeeFinalScore: challengeeFinalScore
                  ? challengeeFinalScore
                  : scoreAdvantage?.get("challengee"),
                challengerFinalScore: challengerFinalScore
                  ? challengerFinalScore
                  : scoreAdvantage?.get("challenger")
              },
              matchData: (matchData && matchData?.toJS()) || {},
              isAdmin: isAdmin,
              onChallengerScoreChange: value => {
                this.setState(prevValue => ({
                  finalScore: {
                    ...prevValue.finalScore,
                    challengerFinalScore: value
                  }
                }));
              },
              onChallengeeScoreChange: value => {
                this.setState(prevValue => ({
                  finalScore: {
                    ...prevValue.finalScore,
                    challengeeFinalScore: value
                  }
                }));
              }
            })}
            submitButtonLabel="DONE"
            onSubmit={() => {
              window.dataLayer.push({
                Event: "playerGameConfirmed",
                userId: profile.get("id"),
                userCountry: profile.get("country") || "MT",
                GameName: "Fortnite"
              });
              const data = {
                challengeeFinalScore: challengeeFinalScore
                  ? challengeeFinalScore
                  : scoreAdvantage.get("challengee"),
                challengerFinalScore: challengerFinalScore
                  ? challengerFinalScore
                  : scoreAdvantage.get("challenger"),
                matchId,
                userId
              };
              if (isAdmin) {
                delete data.userId;
                return onSubmitAdmin(data)
                  .then(() =>
                    history.push(
                      `${returnUrl}&success=true&action=send&object=Result`
                    )
                  )
                  .catch(() =>
                    history.push(
                      `${returnUrl}&success=false&action=send&object=Result`
                    )
                  );
              } else {
                return onSubmitPlayer(data)
                  .then(() =>
                    history.push(
                      `${returnUrl}?success=true&action=send&object=Result`
                    )
                  )
                  .catch(() =>
                    history.push(
                      `${returnUrl}?success=false&action=send&object=Result`
                    )
                  );
              }
            }}
          />
        </Card>
      </Modal>
    );
  }
  static fetchData(store, { url, params }) {
    return store.dispatch(
      fetchMatchDetails({
        pageData: {
          url
        },
        requestData: {
          matchId: params.matchId
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  challengee: selectChallengee(state),
  challenger: selectChallenger(state),
  defenderTeam: selectDefenderTeam(state),
  challengerTeam: selectChallengerTeam(state),
  matchPlatform: selectPlatform(state),
  scoreAdvantage: selectScoreAdvantage(state),
  selectedLanguage: selectSelectedLanguage(state),
  challengerStars: selectChallengerStars(state),
  challengeeStars: selectChallengeeStars(state),
  matchData: selectMatch(state),
  profile: selectProfile(state) // TODO: just for testing, remove later
});

const mapDispatchToProps = dispatch => ({
  onLoadMatch: data => dispatch(getMatch(data)),
  onLoadMatchDetails: data => dispatch(getMatchDetails(data)),
  onLoadMatches: data => dispatch(getPlayerMatches(data)),
  onSubmitAdmin: data => dispatch(submitAdminResults(data)),
  onSubmitPlayer: data => dispatch(submitResults(data))
});

export default withPage(
  connect(mapStateToProps, mapDispatchToProps)(ReportResults),
  getPage,
  REDUCER_NAME
);
