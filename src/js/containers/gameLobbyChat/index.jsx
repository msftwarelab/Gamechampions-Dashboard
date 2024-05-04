import React from "react";
import { connect } from "react-redux";
import { withAuth, withPage } from "~hocs";
import { getPage } from "~containers/page/actions";
import Modal from "~components/modal/modal";
import { REDUCER_NAME, GAMES } from "./constants";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { getGame } from "~containers/gameLobby/actions";
import { selectGame } from "~containers/gameLobby/reducer";
import GlobalChat from "~containers/globalChat/globalChat";
import { FlexBox, Image, Icon } from "~components/atoms";
import { withTheme, styled } from "~theme";
import { selectIsMobile } from "~containers/app/reducer";

class GameLobbyChatWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      games: GAMES,
      gameType: 1
    };
    this.onSelectGame = this.onSelectGame.bind(this);
  }

  onSelectGame(id, gameType) {
    const updatedGames = this.state.games.map(game => ({
      ...game,
      selected: game.id === id
    }));
    this.setState({ games: updatedGames, gameType: gameType });
  }

  render() {
    const { history, theme, isMobile, selectedLanguage } = this.props;
    const { games, gameType } = this.state;
    const returnUrl = this.props.location.state
      ? this.props.location.state.returnUrl
      : `/${selectedLanguage}/arena`;
    const duration = isMobile ? 0 : 500;

    return (
      <Modal
        onClick={() => {
          if (!isMobile) {
            const section = document.querySelector(".global-chat__section");
            section.classList.remove("visible");
          }
          setTimeout(() => {
            history.push(returnUrl);
          }, duration);
        }}
        modalClassName="global-chat"
        className={isMobile ? "" : "global-chat__section visible"}
        isGlobalChat={true && !isMobile}
      >
        <FlexBox
          padding={{
            base: "3rem 0.5rem 0.5rem 0.5rem",
            md: "3rem 1rem 1rem 1rem"
          }}
          justifyContent="space-evenly"
          backgroundColor={theme.colors.primary}
          hoverBackgroundColor={theme.colors.primary}
        >
          {games.map((game, index) => {
            return (
              <FlexBox
                width={{ base: "3.25rem", md: "4.75rem" }}
                height={{ base: "3.25rem", md: "4.75rem" }}
                borderRadius="0.625rem"
                borderColor={theme.colors.secondaryLightSecond}
                borderStyle="solid"
                borderWidth={game.selected ? "2px" : "0px"}
                fontSize={{ base: "0.7rem", md: "0.9rem" }}
                padding={{ base: "1rem", md: "2rem" }}
                flexDirection="column"
                alignItems="center"
                cursor="pointer"
                justifyContent="center"
                color={theme.colors.white}
                backgroundColor={
                  game.selected
                    ? "rgba(22, 255, 0, 0.3)"
                    : theme.colors.primaryLightSecond
                }
                hoverBackgroundColor={
                  game.selected
                    ? "rgba(22, 255, 0, 0.3)"
                    : theme.colors.primaryLightSecond
                }
                key={index}
                onClick={() => this.onSelectGame(game.id, game.gameType)}
              >
                <Image
                  src={game.icon}
                  width={{ base: "1.5rem", md: "2.175rem" }}
                />
                {game.title}
              </FlexBox>
            );
          })}
          <GlobalChatClosebutton
            onClick={() => {
              if (!isMobile) {
                const section = document.querySelector(".global-chat__section");
                section.classList.remove("visible");
              }
              setTimeout(() => {
                history.push(returnUrl);
              }, duration);
            }}
          >
            <Icon color={theme.colors.white} scale="1.5" icon="close" />
          </GlobalChatClosebutton>
        </FlexBox>
        <GlobalChat gameType={gameType} isMobile={isMobile} />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  game: selectGame(state),
  selectedLanguage: selectSelectedLanguage(state),
  isMobile: selectIsMobile(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadGame: data => dispatch(getGame(data))
});

export default withAuth(
  withPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(withTheme(GameLobbyChatWrapper)),
    getPage,
    REDUCER_NAME
  )
);

const GlobalChatClosebutton = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;
