import React from "react";
import { connect } from "react-redux";

import { withAuth, withPage } from "~hocs";
import { REDUCER_NAME, UPDATE_AFFILIATE_FORM_FIELDS } from "./constants";
import { selectAffiliates, selectSelectedAffiliate } from "./reducer";
import {
  fetchUpdateAffiliate,
  resetSelectedAffiliate,
  setSelectedAffiliate,
  updateAffiliate
} from "./actions";
import UpdateAffiliateForm from "~components/custom/affiliates/updateAffiliateForm";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";

class UpdateAffiliate extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { onSetAffiliate, match, affiliates } = this.props;
    const { params = {} } = match;
    const { affiliateId } = params;

    if (affiliates && affiliates.size && affiliateId) {
      onSetAffiliate(
        affiliates.toJS().find(item => item.id == parseInt(affiliateId))
      );
    }
  }

  componentWillUnmount() {
    this.props.onResetSelectedAffiliate();
  }

  onSubmit(e) {
    const { match, onUpdateAffiliate, history, selectedLanguage } = this.props;
    let data = { ...e };
    data.id = match.params.affiliateId;
    let returnUrl = `/${selectedLanguage}/affiliates`;

    return onUpdateAffiliate(data).then(() => {
      history.push(returnUrl + "?success=true&action=edit&object=profile");
    });
  }

  render() {
    const { selectedAffiliate, selectedLanguage, history } = this.props;

    let initialValues = {};

    if (selectedAffiliate && selectedAffiliate.size) {
      initialValues = selectedAffiliate.toJS();
    }

    return (
      <Modal onClick={() => history.push(`/${selectedLanguage}/affiliates`)}>
        <Card
          closeUrl={`/${selectedLanguage}/affiliates`}
          className="player-details-form"
        >
          <UpdateAffiliateForm
            initialValues={initialValues}
            formFields={UPDATE_AFFILIATE_FORM_FIELDS}
            returnUrl={`/${selectedLanguage}/affiliates`}
            onSubmit={this.onSubmit}
          />
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, language, params }) {
    const { affiliateId } = params;
    return store.dispatch(
      fetchUpdateAffiliate({
        pageData: {
          url,
          language
        },
        requestData: {
          id: affiliateId
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  selectedLanguage: selectSelectedLanguage(state),
  selectedAffiliate: selectSelectedAffiliate(state),
  affiliates: selectAffiliates(state)
});

const mapDispatchToProps = dispatch => ({
  onResetSelectedAffiliate: () => dispatch(resetSelectedAffiliate()),
  onSetAffiliate: data => dispatch(setSelectedAffiliate(data)),
  onUpdateAffiliate: data => dispatch(updateAffiliate(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(UpdateAffiliate),
    getPage,
    REDUCER_NAME
  )
);
