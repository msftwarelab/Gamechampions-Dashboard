import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";
import moment from "moment";
import { withAuth, withPage } from "~hocs";
import { REDUCER_NAME } from "./constants";
import { getUplayGames } from "~containers/boyGameLobby/actions";
import { selectUPlayGames } from "~containers/boyGameLobby/reducer";
import {
  selectSelectedPlayer,
  selectPlayers,
  selectBoyProfile,
  selectIsLoading
} from "./reducer";
import {
  fetchPlayerWithdraw,
  resetSelectedPlayer,
  setSelectedPlayer
} from "./actions";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import TabsWrapper from "~components/custom/gameLobby/tabsBar/tabsWrapper";
import StyledLink from "~components/custom/gameLobby/tabsBar/styledLink";
import DynamicForm from "~components/molecules/dynamicForm";
import { FlexBox, Span, Loader } from "~components/atoms";
import { withTheme } from "~theme";

class PlayerBoyProfile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      gameId: 1
    };
    this.changeGameId = this.changeGameId.bind(this);
  }

  componentDidMount() {
    const {
      onSetPlayer,
      onGetUPlayGames,
      match,
      players,
      selectedLanguage
    } = this.props;
    const { params = {} } = match;
    const { playerId } = params;

    if (players && players.size && playerId) {
      onSetPlayer(players.toJS().find(item => item.id == parseInt(playerId)));
    }
    onGetUPlayGames({ selectedLanguage });
  }

  componentWillUnmount() {
    this.props.onResetSelectedPlayer();
  }

  changeGameId(gameId) {
    this.setState({
      gameId: gameId
    });
  }

  render() {
    const {
      isLoading,
      selectedLanguage,
      theme,
      history,
      page,
      boyProfile,
      selectedPlayer,
      uPlayGames,
      match
    } = this.props;
    const { gameId } = this.state;
    let returnUrl = `/${selectedLanguage}/all-players`;
    return (
      <Modal onClick={() => history.push(returnUrl)}>
        <Card title={page.get("title")} closeUrl={returnUrl}>
          <TabsWrapper>
            {uPlayGames.map(game => {
              return (
                <StyledLink
                  key={game.get("gameId")}
                  onClick={e => {
                    e.preventDefault();
                    this.changeGameId(game.get("gameId"));
                  }}
                  className={gameId == game.get("gameId") ? "active" : ""}
                  to={`/${game.get("gameId")}`}
                  title={game.get("title")}
                  activeStyle={{ borderBottom: "4px solid #3c8495" }}
                >
                  {game.get("title")}
                </StyledLink>
              );
            })}
          </TabsWrapper>
          {isLoading ? (
            <FlexBox justifyContent="center" margin="1em 0 0 0">
              <Loader isLoading={true} />
            </FlexBox>
          ) : boyProfile ? (
            <>
              <FlexBox alignItems="center" gap="2rem" margin="1em 0 0 0">
                <Span fontWeight="bold">
                  {boyProfile.get("title") === "Fortnite"
                    ? `Epic Name: ${boyProfile.get("epicDisplayName")}`
                    : boyProfile.get("title") === "lol"
                    ? `Summoner Name: ${boyProfile.get("summonerName")}`
                    : "Doesn't exist"}
                </Span>
                <Span
                  color={theme.colors.fontColorLight}
                  backgroundColor={
                    boyProfile.get("isVerified") === true
                      ? theme.colors.energyColor
                      : theme.colors.greyDark
                  }
                  fontSize={theme.fonts.small}
                  borderRadius="16px"
                  padding="2px 16px"
                >
                  {boyProfile.get("isVerified") === true
                    ? "Verified"
                    : "Not Unverified"}
                </Span>
              </FlexBox>
              <FlexBox alignItems="center" gap="1rem" margin="1em 0 0 0">
                <Span fontWeight="bold">Verified at</Span>
                <Span color={theme.colors.secondary}>
                  {moment(boyProfile.get("verificationDate")).format(
                    "DD/MM/YYYY H:mm:ss"
                  )}
                </Span>
              </FlexBox>
              <DynamicForm
                mode="edit"
                submitButtonLabel="Unverify"
                returnUrl={returnUrl}
                gameId={this.state.gameId}
                onSubmit={() => {
                  this.setState({ submitting: true });
                  let data = {};
                  data.userId = selectedPlayer.get("id");
                  data.gameId = this.state.gameId;
                }}
                onButtonClick={() => {
                  this.setState({ submitting: true });
                  let data = {};
                  data.userId = selectedPlayer.get("id");
                  data.gameId = this.state.gameId;
                }}
              />
            </>
          ) : (
            <Span margin="1em 0 0 0">Boy Profile Doesn`t Exist</Span>
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
  uPlayGames: selectUPlayGames(state),
  players: selectPlayers(state),
  boyProfile: selectBoyProfile(state),
  isLoading: selectIsLoading(state)
});

const mapDispatchToProps = dispatch => ({
  onResetSelectedPlayer: data => dispatch(resetSelectedPlayer(data)),
  onGetUPlayGames: data => dispatch(getUplayGames(data)),
  onSetPlayer: data => dispatch(setSelectedPlayer(data))
});

export default withAuth(
  withPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(
      hoistStatics(
        withTheme(withTranslation()(PlayerBoyProfile)),
        PlayerBoyProfile
      )
    ),
    getPage,
    REDUCER_NAME
  )
);
