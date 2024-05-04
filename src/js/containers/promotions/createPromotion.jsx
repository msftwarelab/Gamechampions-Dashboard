import React from "react";
import { connect } from "react-redux";
import { withAuth, withPage } from "~hocs";

import CreatePromotionForm from "~components/custom/promotions/createPromotionForm";
import { createPromotion, fetchCreatePromotion } from "./actions";
import { REDUCER_NAME, PROMOTION_COMMISSION_TYPE } from "./constants";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectIsMobile } from "../app/reducer";
import { selectIsLoading } from "./reducer";

class CreatePromotion extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      commissionType: ""
    };
    this.commissionTypeChange = this.commissionTypeChange.bind(this);
  }

  commissionTypeChange(data) {
    if (data) {
      this.setState({
        commissionType: PROMOTION_COMMISSION_TYPE[parseInt(data)]
      });
    }
  }

  render() {
    const { selectedLanguage, history, page, onCreatePromotion } = this.props;
    let returnUrl = `/${selectedLanguage}/promotions`;
    let fixed = this.state.commissionType == PROMOTION_COMMISSION_TYPE[2];
    let commission = this.state.commissionType == PROMOTION_COMMISSION_TYPE[1];
    return (
      <CreatePromotionForm
        onCreatePromotion={onCreatePromotion}
        fixed={fixed}
        commission={commission}
        commissionTypeChange={this.commissionTypeChange}
        page={page}
        history={history}
        returnUrl={returnUrl}
      ></CreatePromotionForm>
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(
      fetchCreatePromotion({
        pageData: {
          url,
          language
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  isMobile: selectIsMobile(state)
});

const mapDispatchToProps = dispatch => ({
  onCreatePromotion: data => dispatch(createPromotion(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(CreatePromotion),
    getPage,
    REDUCER_NAME
  )
);
