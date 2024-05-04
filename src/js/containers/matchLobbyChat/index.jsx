import React from "react";

import { withAuth, withPage } from "~hocs";
import { getPage } from "~containers/page/actions";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import MatchLobbyChatComponent from "./matchLobbyChat";
import { REDUCER_NAME } from "./constants";
import { fetchMatchLobbyChat } from "./actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { connect } from "react-redux";

class MatchLobbyChat extends React.PureComponent {
  render() {
    const { history, match, selectedLanguage } = this.props;
    const returnUrl = `/${selectedLanguage}/match-lobby/${match.params.matchId}`;

    return (
      <Modal onClick={() => history.push(returnUrl)}>
        <Card className="public-chat" padding="0" closeUrl={returnUrl}>
          <MatchLobbyChatComponent matchId={parseInt(match.params.matchId)} />
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(
      fetchMatchLobbyChat({
        pageData: { url, language }
      })
    );
  }
}

const mapStateToProps = state => ({
  selectedLanguage: selectSelectedLanguage(state)
});

export default withAuth(
  withPage(connect(mapStateToProps)(MatchLobbyChat), getPage, REDUCER_NAME)
);
