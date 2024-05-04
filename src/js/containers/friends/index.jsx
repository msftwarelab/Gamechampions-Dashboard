import React from "react";

import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import Friends from "./friends";
import { fetchFriends } from "./actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { connect } from "react-redux";
import { ONLINE_PLAYERS_PAGE_SIZE_VALUE } from "./constants";

class FriendsWrapper extends React.PureComponent {
  render() {
    const { history, selectedLanguage } = this.props;

    return (
      <Modal
        className="friends__modal"
        onClick={() => history.push(`/${selectedLanguage}`)}
      >
        <Card className="friends" padding="0" closeUrl={`/${selectedLanguage}`}>
          <Friends />
        </Card>
      </Modal>
    );
  }

  static fetchData(store) {
    return store.dispatch(
      fetchFriends({ page: 1, pageSize: ONLINE_PLAYERS_PAGE_SIZE_VALUE })
    );
  }
}

const mapStateToProps = state => ({
  selectedLanguage: selectSelectedLanguage(state)
});

export default connect(mapStateToProps)(FriendsWrapper);
