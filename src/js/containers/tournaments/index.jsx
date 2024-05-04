import React from "react";
import { connect } from "react-redux";
import hoistStatics from "hoist-non-react-statics";
import { withTranslation } from "react-i18next";
import { selectIsMobile } from "../app/reducer";

import { withAuth, withPage } from "~hocs";
import {
  fetchTournaments,
  resetTournamentRanking,
  resetError,
  getTournament,
  resetTournament,
  getTournamentTopHundred,
  getTournamentsList
} from "./actions";
import { REDUCER_NAME, ACTIVE_COMPONENT } from "./constants";
import {
  selectError,
  selectIsLoading,
  selectTournamentRanking,
  selectTournament,
  selectTournamentsList
} from "./reducer";
import TournamentsComponent from "~components/custom/tournaments";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectProfile } from "~containers/myaccount/reducer";
import { getDashboardFooter } from "~containers/boyGameLobby/actions";
import { selectDashboardFooter } from "~containers/boyGameLobby/reducer";

class Tournaments extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: null
    };

    this.setActive = this.setActive.bind(this);
  }

  setActive(status) {
    const { onLoadTopHundredRanking, match } = this.props;
    let gameId = parseInt(match.params.gameId);
    this.setState({ active: status });
    if (status == ACTIVE_COMPONENT.TOP_HUNDRED) {
      onLoadTopHundredRanking({ gameId: gameId });
    }
  }

  componentDidMount() {
    const {
      onLoadTournament,
      match,
      selectedLanguage,
      onLoadTournamentsList,
      onGetDashboardFooter
    } = this.props;
    const gameId = parseInt(match.params.gameId);
    onLoadTournament({ gameId: gameId, language: selectedLanguage });
    this.setState({ active: ACTIVE_COMPONENT.CURRENT });
    onLoadTournamentsList({ gameId, language: selectedLanguage });
    onGetDashboardFooter({ selectedLanguage });
  }

  componentWillUnmount() {
    const {
      onResetTournamentRanking,
      onResetError,
      onResetTournament
    } = this.props;
    onResetTournament();
    onResetTournamentRanking();
    onResetError();
  }

  render() {
    const {
      match,
      selectedLanguage,
      profile,
      isLoading,
      ranking,
      error,
      isMobile,
      tournament,
      tournamentsList,
      dashboardFooter
    } = this.props;

    return (
      <TournamentsComponent
        selectedLanguage={selectedLanguage}
        gameId={parseInt(match.params.gameId)}
        error={error}
        isLoading={isLoading}
        ranking={ranking}
        user={profile}
        isMobile={isMobile}
        tournament={tournament}
        active={this.state.active}
        setActive={this.setActive}
        tournamentsList={tournamentsList}
        dashboardFooter={dashboardFooter}
      />
    );
  }

  static fetchData(store, { url, params, authentication, language }) {
    return store.dispatch(
      fetchTournaments({
        pageData: {
          url,
          language
        },
        requestData: {
          id: authentication ? authentication.profileId : null,
          gameId: parseInt(params.gameId)
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  profile: selectProfile(state),
  ranking: selectTournamentRanking(state),
  dashboardFooter: selectDashboardFooter(state),
  error: selectError(state),
  isMobile: selectIsMobile(state),
  tournament: selectTournament(state),
  tournamentsList: selectTournamentsList(state)
});

const mapDispatchToProps = dispatch => ({
  onResetTournamentRanking: () => dispatch(resetTournamentRanking()),
  onLoadTournament: data => dispatch(getTournament(data)),
  onResetError: () => dispatch(resetError()),
  onResetTournament: () => dispatch(resetTournament()),
  onLoadTopHundredRanking: data => dispatch(getTournamentTopHundred(data)),
  onGetDashboardFooter: data => dispatch(getDashboardFooter(data)),
  onLoadTournamentsList: data => dispatch(getTournamentsList(data))
});

export default withAuth(
  withPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(hoistStatics(withTranslation()(Tournaments), Tournaments)),
    getPage,
    REDUCER_NAME
  )
);
