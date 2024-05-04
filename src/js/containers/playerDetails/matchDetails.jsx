import React from "react";
import { connect } from "react-redux";

import { withAuth, withPage } from "~hocs";
import { getPage } from "~containers/page/actions";
import { fetchPlayerDetails, getPlayerMatches } from "./actions";
import { REDUCER_NAME, FORM_FIELDS } from "./constants";
import { selectMatches, selectPersonalDetails } from "./reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import DynamicForm from "~components/molecules/dynamicForm";
import Thumbnail from "~components/atoms/thumbnail";
import { FlexBox } from "~components/atoms";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";

class MatchDetails extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      returnUrl: `/player-details/${props.match.params.playerId}/`
    };
  }

  componentDidMount() {
    const { matches, onLoadMatches } = this.props;
    if (!(matches && matches.size)) {
      onLoadMatches({ playerId: parseInt(this.props.match.params.playerId) });
    }
  }

  render() {
    const {
      page,
      matches,
      personalDetails,
      history,
      match,
      selectedLanguage
    } = this.props;

    const returnUrl = `/${selectedLanguage}` + this.state.returnUrl;
    const image = personalDetails.get("thumbnail");
    const matchDetails = matches.find(
      n => n.get("id") === parseInt(match.params.matchId)
    );

    return (
      <Modal onClick={() => history.push(returnUrl)} wide={true}>
        <Card
          title={page.get("title")}
          html={page.get("html")}
          buttons={page.get("buttons")}
          closeUrl={returnUrl}
        >
          {image && (
            <FlexBox justifyContent="center" width="100%" padding="0 0 2em 0">
              <Thumbnail
                src={image.get("src")}
                srcSet={image.get("srcset")}
                alt={image.get("alt")}
                title={image.get("title")}
                height="125px"
                width="125px"
              />
            </FlexBox>
          )}
          <DynamicForm
            mode="view"
            initialValues={matchDetails.toJS()}
            formFields={FORM_FIELDS}
            returnUrl={returnUrl}
          />
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, params, language }) {
    return store.dispatch(
      fetchPlayerDetails({
        pageData: {
          url,
          language
        },
        requestData: {
          playerId: parseInt(params.playerId)
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  matches: selectMatches(state),
  personalDetails: selectPersonalDetails(state),
  selectedLanguage: selectSelectedLanguage(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadMatches: data => dispatch(getPlayerMatches(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(MatchDetails),
    getPage,
    REDUCER_NAME
  )
);
