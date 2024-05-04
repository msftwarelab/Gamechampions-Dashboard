import React from "react";
import { connect } from "react-redux";

import { withAuth, withPage } from "~hocs";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";
import {
  REDUCER_NAME,
  FORM_FIELDS_PROFILE,
  CURRENTPAGE_QUERY_STRING_PARAM
} from "./constants";
import {
  selectSelectedPlayer,
  selectPlayers,
  selectIsLoading
} from "./reducer";
import { selectGames } from "../games/reducer";
import {
  fetchPlayerWithdraw,
  resetSelectedPlayer,
  setSelectedPlayer,
  updateAdminPlayer,
  getPlayerById,
  uploadPlayerDocuments,
  deletePlayerDocument,
  validatePlayerDocument
} from "./actions";
import PlayerDetailsForm from "~components/custom/players/playerDetailsForm";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import { selectCountries } from "../app/reducer";
import { Loader } from "~components/atoms";
import { getParameterByName } from "../../util/util";

class PlayerWithdraw extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { onSetPlayer, match, players, loadPlayerById } = this.props;
    const { params = {} } = match;
    const { playerId } = params;

    if (players && players.size && playerId) {
      const playerToLoad = players
        ?.toJS()
        .find(item => item.id == parseInt(playerId));
      if (playerToLoad) {
        onSetPlayer(playerToLoad);
      } else {
        loadPlayerById(playerId);
      }
    } else if (playerId) {
      loadPlayerById(playerId);
    }
  }

  componentWillUnmount() {
    this.props.onResetSelectedPlayer();
  }

  render() {
    const {
      selectedPlayer,
      selectedLanguage,
      history,
      countries,
      onUpdatePlayer,
      t,
      isLoading,
      onSetPlayer,
      onDeletePlayerDocument,
      onValidatePlayerDocument
    } = this.props;

    let initialValues = {};
    let initialCountries = countries.toJS ? countries?.toJS() : countries;

    if (selectedPlayer && countries && selectedPlayer.size && countries.size) {
      initialValues = selectedPlayer?.toJS();

      const isBlocked = initialValues.isBlocked
        ? t("AdminPlayerIsBlocked")
        : t("AdminPlayerIsEnabled");
      initialValues.isBlocked = isBlocked;

      const barringEndDate =
        initialValues.barringEndDate == "01/01/0001"
          ? t("AdminPlayersNotApplied")
          : initialValues.barringEndDate;
      initialValues.barringEndDate = barringEndDate;

      initialValues.fName = selectedPlayer?.toJS()?.fullName;
      initialValues.userAddress = selectedPlayer?.toJS()?.address;
      initialValues.userCity = selectedPlayer?.toJS()?.city;
      initialValues.userCountry = selectedPlayer?.toJS()?.country;
      initialValues.documents = JSON.stringify(initialValues.documents);
    }

    let playerValues = selectedPlayer?.toJS();
    if (playerValues) {
      playerValues.fName = selectedPlayer?.toJS()?.fullName;
      playerValues.userAddress = selectedPlayer?.toJS()?.address;
      playerValues.userCity = selectedPlayer?.toJS()?.city;
      playerValues.userCountry = selectedPlayer?.toJS()?.country;
    }

    const formFields = FORM_FIELDS_PROFILE({
      selectedPlayer: playerValues,
      onSetPlayer,
      onDeletePlayerDocument,
      onValidatePlayerDocument,
      history,
      selectedLanguage,
      returnUrl: `/${selectedLanguage}/all-players`,
      ...(selectedPlayer && selectedPlayer?.toJS())
    });

    formFields.forEach(x => {
      if (
        x.name === "country" ||
        x.name === "bankCountry" ||
        x.name === "userCountry"
      ) {
        x.options = initialCountries;
      }
    });

    const currentPage = getParameterByName(
      CURRENTPAGE_QUERY_STRING_PARAM,
      location?.search
    );

    return (
      <Modal onClick={() => history.push(`/${selectedLanguage}/all-players`)}>
        <Card
          closeUrl={
            !currentPage
              ? `/${selectedLanguage}/all-players`
              : `/${selectedLanguage}/${currentPage}`
          }
          className="player-details-form"
        >
          {isLoading ? (
            <Loader />
          ) : (
            <PlayerDetailsForm
              initialValues={initialValues}
              formFields={formFields}
              returnUrl={`/${selectedLanguage}/all-players`}
              onUpdatePlayer={onUpdatePlayer}
              history={history}
            />
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
  selectedLanguage: selectSelectedLanguage(state),
  selectedPlayer: selectSelectedPlayer(state),
  players: selectPlayers(state),
  countries: selectCountries(state),
  games: selectGames(state),
  isLoading: selectIsLoading(state)
});

const mapDispatchToProps = dispatch => ({
  onResetSelectedPlayer: data => dispatch(resetSelectedPlayer(data)),
  onSetPlayer: data => dispatch(setSelectedPlayer(data)),
  onUpdatePlayer: data => dispatch(updateAdminPlayer(data)),
  loadPlayerById: IdPlayer => dispatch(getPlayerById({ id: IdPlayer })),
  onUploadPlayerDocuments: data => dispatch(uploadPlayerDocuments(data)),
  onDeletePlayerDocument: data => dispatch(deletePlayerDocument(data)),
  onValidatePlayerDocument: data => dispatch(validatePlayerDocument(data))
});

export default withAuth(
  withPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(hoistStatics(withTranslation()(PlayerWithdraw), PlayerWithdraw)),
    getPage,
    REDUCER_NAME
  )
);
