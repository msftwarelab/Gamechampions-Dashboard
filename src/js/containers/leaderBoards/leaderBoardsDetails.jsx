import React from "react";
import { connect } from "react-redux";

import { withAuth, withPage } from "~hocs";
import { getPage } from "~containers/page/actions";
import { fetchLeaderBoards, getLeaderBoards } from "./actions";
import { REDUCER_NAME, FORM_FIELDS } from "./constants";
import { selectLeaderBoards } from "./reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import DynamicForm from "~components/molecules/dynamicForm";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";

class LeaderBoardsDetails extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      returnUrl: `/game-lobby/${props.match.params.gameId}/leaderboards/`
    };
  }

  componentDidMount() {
    const { leaderBoards, onLoadLeaderBoards, match } = this.props;

    const gameId = parseInt(match.params.gameId);

    if (!(leaderBoards && leaderBoards.size)) {
      onLoadLeaderBoards({ gameId });
    }
  }

  render() {
    const { page, leaderBoards, history, match, selectedLanguage } = this.props;

    const playerDetails = leaderBoards.find(
      n => n.get("id") === parseInt(match.params.playerId)
    );

    const country = playerDetails && playerDetails.get("country");
    const formValues = playerDetails && playerDetails.toJS();
    if (formValues) {
      formValues["country"] = country;
    }

    const returnUrl = `/${selectedLanguage}` + this.state.returnUrl;

    return (
      <Modal onClick={() => history.push(returnUrl)} wide={true}>
        <Card
          title={page.get("title")}
          html={page.get("html")}
          closeUrl={returnUrl}
        >
          <DynamicForm
            mode="view"
            initialValues={formValues}
            formFields={FORM_FIELDS}
            returnUrl={returnUrl}
          />
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, params }) {
    return store.dispatch(
      fetchLeaderBoards({
        pageData: {
          url
        },
        requestData: {
          gameId: parseInt(params.gameId)
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  leaderBoards: selectLeaderBoards(state),
  selectedLanguage: selectSelectedLanguage(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadLeaderBoards: data => dispatch(getLeaderBoards(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(LeaderBoardsDetails),
    getPage,
    REDUCER_NAME
  )
);
