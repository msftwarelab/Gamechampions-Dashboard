import React from "react";
import { connect } from "react-redux";
import Modal from "../../components/modal/modal";
import { getPage } from "../page/actions";
import { withPage } from "~hocs";
import Card from "~components/card/card";
import DynamicForm from "~components/molecules/dynamicForm";
import { getFormFields, REDUCER_NAME } from "./constants";
import {
  getMatchDetails,
  fetchMatchDetails,
  submitScoreAdvantage
} from "./actions";
import {
  selectChallengee,
  selectChallenger,
  selectRecommendedScoreAdvantage,
  selectPlatform
} from "./reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import {
  selectChallengerStars,
  selectChallengeeStars
} from "~containers/matchLobby/reducer";
import { STORAGE_URL } from "~service/constants";

class SetScoreAdvantage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      challengerScoreAdvantage: 0,
      challengeeScoreAdvantage: 0,
      returnUrl: `/match-lobby/${props.match.params.matchId}`
    };
  }

  componentDidMount() {
    const { match, onLoadMatchDetails } = this.props;
    onLoadMatchDetails({ matchId: match.params.matchId });
  }

  render() {
    const {
      page,
      match,
      history,
      challengee,
      challenger,
      matchPlatform,
      recommendedScoreAdvantage,
      selectedLanguage,
      challengerStars,
      challengeeStars
    } = this.props;
    const returnUrl = `/${selectedLanguage}` + this.state.returnUrl;
    return (
      <Modal onClick={() => history.push(returnUrl)}>
        <Card
          title={page.get("title")}
          html={page.get("html")}
          buttons={page.buttons}
          className="create-challenge-form"
          closeUrl={returnUrl}
        >
          {challenger && recommendedScoreAdvantage && (
            <DynamicForm
              action={match.url}
              formFields={getFormFields({
                challengee: challengee
                  ? { ...challengee.toJS(), stars: challengeeStars }
                  : {
                      thumbnailUrl: `${STORAGE_URL}images/incognito.png`,
                      name: "Upcoming"
                    },
                challenger: {
                  ...challenger.toJS(),
                  stars: challengerStars
                },
                matchPlatform: matchPlatform,
                recommendedScoreAdvantage: recommendedScoreAdvantage.toJS(),
                onChallengerScoreChange: value => {
                  this.setState({ challengerScoreAdvantage: value });
                },
                onChallengeeScoreChange: value => {
                  this.setState({ challengeeScoreAdvantage: value });
                }
              })}
              submitButtonLabel="ButtonDynamicFormContinue"
              returnUrl={returnUrl}
              onSubmit={e => {
                const data = { ...e };
                data.challengerScoreAdvantage = this.state.challengerScoreAdvantage;
                data.challengeeScoreAdvantage = this.state.challengeeScoreAdvantage;
                data.matchId = match.params.matchId;
                return submitScoreAdvantage(data)
                  .then(() => {
                    history.push(
                      `${returnUrl}?success=true&action=view&object=Score`
                    );
                  })
                  .catch(() =>
                    history.push(
                      `${returnUrl}?success=false&action=view&object=Score`
                    )
                  );
              }}
            />
          )}
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
          matchId: parseInt(params.matchId)
        }
      })
    );
  }
}
const mapStateToProps = state => ({
  challengee: selectChallengee(state),
  challenger: selectChallenger(state),
  matchPlatform: selectPlatform(state),
  recommendedScoreAdvantage: selectRecommendedScoreAdvantage(state),
  selectedLanguage: selectSelectedLanguage(state),
  challengerStars: selectChallengerStars(state),
  challengeeStars: selectChallengeeStars(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadMatchDetails: data => dispatch(getMatchDetails(data))
});
export default withPage(
  connect(mapStateToProps, mapDispatchToProps)(SetScoreAdvantage),
  getPage,
  REDUCER_NAME
);
