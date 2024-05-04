import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";

import { withAuth, withPage } from "~hocs";
import { REDUCER_NAME, getPlayerCreditEnergyFormFields } from "./constants";
import {
  selectSelectedPlayer,
  selectIsLoading,
  selectActiveTournaments
} from "./reducer";
import {
  fetchPlayerWithdraw,
  getActiveTournaments,
  resetSelectedPlayer,
  submitPlayerCreditEnergy
} from "./actions";
import PlayerCreditForm from "~components/custom/players/playerCreditForm";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import { Loader, Span } from "~components/atoms";

class PlayerCreditEnergy extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      availableFreeMatches: null,
      selectedTournamentId: -1
    };

    this.onSelecteActiveTournament = this.onSelecteActiveTournament.bind(this);
  }

  componentDidMount() {
    const {
      selectedLanguage,
      selectedPlayer,
      onLoadActiveTournaments
    } = this.props;

    onLoadActiveTournaments({
      language: selectedLanguage,
      playerId: selectedPlayer.get("id")
    });
  }

  componentWillUnmount() {
    this.props.onResetSelectedPlayer();
  }

  onSelecteActiveTournament(selectedTournamentId) {
    const { selectedActiveTournaments } = this.props;
    const tournamentId = parseInt(selectedTournamentId);

    this.setState({ selectedTournamentId: tournamentId });

    if (selectedActiveTournaments && selectedActiveTournaments.toJS().length) {
      const selectedTournament = selectedActiveTournaments
        .toJS()
        .find(t => t.tournamentId === parseInt(tournamentId));
      this.setState({
        availableFreeMatches: selectedTournament
          ? selectedTournament.availableFreeMatches
          : null
      });
    }
  }

  render() {
    const {
      selectedPlayer,
      selectedLanguage,
      isLoading,
      page,
      match,
      history,
      onPlayerCreditEnergySubmit,
      selectedActiveTournaments,
      t
    } = this.props;

    const { availableFreeMatches } = this.state;

    return (
      <Modal onClick={() => history.push(`/${selectedLanguage}/all-players`)}>
        <Card
          html={page.get("html")}
          htmlProps={{
            margin: "1rem 0"
          }}
          title={page.get("title")}
          closeUrl={`/${selectedLanguage}/all-players`}
          className="withdrawal-form"
        >
          {availableFreeMatches !== null && (
            <Span>Available Energy Balance: {availableFreeMatches}</Span>
          )}
          {selectedActiveTournaments.toJS().length ? (
            <PlayerCreditForm
              error={this.state.error}
              isLoading={isLoading}
              action={match.url}
              formFields={getPlayerCreditEnergyFormFields({
                activeTournamentsOptions: selectedActiveTournaments.toJS(),
                onSelecteActiveTournament: e =>
                  this.onSelecteActiveTournament(e)
              })}
              returnUrl={`/${selectedLanguage}`}
              onSubmit={(e = {}) => {
                onPlayerCreditEnergySubmit({
                  freeMatchesAmount: e.freeMatchesAmount,
                  tournamentId: this.state.selectedTournamentId,
                  playerId: selectedPlayer.get("id")
                })
                  .then(() => {
                    history.push(
                      `/${selectedLanguage}/all-players?success=true&action=save&object=Credit`
                    );
                  })
                  .catch(() => {
                    this.setState({ error: t("PlayerEnergyCreditError") });
                  });
              }}
              onCancel={e => {
                e.preventDefault();
                history.push(`/${selectedLanguage}/all-players`);
              }}
            />
          ) : (
            <Loader />
          )}
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, language, params }) {
    const { playerId } = params;
    return store.dispatch(
      fetchPlayerWithdraw({
        pageData: {
          url,
          language
        },
        requestData: {
          id: playerId
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  selectedPlayer: selectSelectedPlayer(state),
  selectedActiveTournaments: selectActiveTournaments(state)
});

const mapDispatchToProps = dispatch => ({
  onResetSelectedPlayer: data => dispatch(resetSelectedPlayer(data)),
  onLoadActiveTournaments: data => dispatch(getActiveTournaments(data)),
  onPlayerCreditEnergySubmit: data => dispatch(submitPlayerCreditEnergy(data))
});

export default withAuth(
  withPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(hoistStatics(withTranslation()(PlayerCreditEnergy), PlayerCreditEnergy)),
    getPage,
    REDUCER_NAME
  )
);
