import React from "react";
import { connect } from "react-redux";
import { withAuth, withPage } from "~hocs";
import { getPage } from "~containers/page/actions";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import { DISCORD_CHANNEL, DISCORD_SERVER_ID, REDUCER_NAME } from "./constants";
import { fetchGlobalChat } from "./actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { getGame } from "~containers/gameLobby/actions";
import { selectGame } from "~containers/gameLobby/reducer";
import WidgetBot from "@widgetbot/react-embed";

class GameLobbyChatWrapper extends React.PureComponent {
  constructor(props) {
    super(props);

    this.getChannelIdByLanguage = this.getChannelIdByLanguage.bind(this);
  }

  getChannelIdByLanguage() {
    const { selectedLanguage } = this.props;

    switch (selectedLanguage) {
      case "en":
        return DISCORD_CHANNEL.EN;
      case "es":
        return DISCORD_CHANNEL.ES;
      case "de":
        return DISCORD_CHANNEL.DE;
      case "fr":
        return DISCORD_CHANNEL.FR;
      case "pt":
        return DISCORD_CHANNEL.PT;
      case "it":
        return DISCORD_CHANNEL.IT;
    }
  }

  render() {
    const { history, selectedLanguage } = this.props;
    const returnUrl = `/${selectedLanguage}`;

    return (
      <Modal onClick={() => history.push(returnUrl)}>
        <Card
          className="public-chat"
          padding="3.5rem 0 0 0"
          closeUrl={returnUrl}
        >
          <WidgetBot
            width="100%"
            height="100%"
            style={{
              borderRadius: 0
            }}
            server={DISCORD_SERVER_ID}
            channel={this.getChannelIdByLanguage()}
          />
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(
      fetchGlobalChat({
        pageData: { url, language }
      })
    );
  }
}

const mapStateToProps = state => ({
  game: selectGame(state),
  selectedLanguage: selectSelectedLanguage(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadGame: data => dispatch(getGame(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(GameLobbyChatWrapper),
    getPage,
    REDUCER_NAME
  )
);
