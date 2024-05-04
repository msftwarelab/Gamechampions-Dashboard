import React from "react";
import { connect } from "react-redux";

import { withAuth, withPage } from "~hocs";
import {
  fetchUpdatePromotion,
  loadPromotions,
  resetSelectedPromotion,
  setSelectedPromotion,
  updatePromotion
} from "./actions";
import {
  REDUCER_NAME,
  PROMOTION_ACTION_TYPE,
  PROMOTION_COMMISSION_TYPE
} from "./constants";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectIsMobile } from "../app/reducer";
import {
  selectIsLoading,
  selectPromotions,
  selectSelectedPromotion
} from "./reducer";
import UpdatePromotionForm from "~components/custom/promotions/updatePromotionForm";

class UpdatePromotion extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      commissionType: ""
    };
    this.commissionTypeChange = this.commissionTypeChange.bind(this);
    this.createInitialValues = this.createInitialValues.bind(this);
  }

  commissionTypeChange(data) {
    if (data) {
      this.setState({
        commissionType: PROMOTION_COMMISSION_TYPE[parseInt(data)]
      });
    }
  }

  createInitialValues(selectedPromotion) {
    if (selectedPromotion) {
      let initialvalues = {
        title: selectedPromotion.title,
        description: selectedPromotion.description,
        fixedCommission: selectedPromotion.fixedCommission,
        commission: selectedPromotion.commission,
        promotionActionType: Object.keys(PROMOTION_ACTION_TYPE).find(
          key => PROMOTION_ACTION_TYPE[key] === selectedPromotion.type
        ),
        promotionCommissionType: Object.keys(PROMOTION_COMMISSION_TYPE).find(
          key =>
            PROMOTION_COMMISSION_TYPE[key] === selectedPromotion.commissionType
        )
      };
      return initialvalues;
    }
    return {};
  }

  componentDidMount() {
    const {
      selectedPromotion,
      onLoadPromotions,
      onSetSelectedPromotion,
      promtions,
      match
    } = this.props;

    let { promotionId } = match.params;

    if (!promtions) {
      onLoadPromotions();
    }
    if (!selectedPromotion && promtions)
      onSetSelectedPromotion(
        promtions.find(promtion => promtion.get("id") == promotionId)
      );
    this.setState({
      commissionType: selectedPromotion.get("commissionType")
    });
  }

  componentWillUnmount() {
    this.props.onResetSelectedPromotion;
  }

  render() {
    const {
      selectedLanguage,
      history,
      page,
      onUpdatePromotion,
      selectedPromotion
    } = this.props;
    let returnUrl = `/${selectedLanguage}/promotions`;
    let fixed = this.state.commissionType == PROMOTION_COMMISSION_TYPE[2];
    let commission = this.state.commissionType == PROMOTION_COMMISSION_TYPE[1];
    let initialvalues = this.createInitialValues(
      selectedPromotion && selectedPromotion.toJS()
    );
    return (
      <UpdatePromotionForm
        commissionTypeChange={this.commissionTypeChange}
        fixed={fixed}
        commission={commission}
        initialvalues={initialvalues}
        selectedPromotion={selectedPromotion}
        onUpdatePromotion={onUpdatePromotion}
        page={page}
        history={history}
        returnUrl={returnUrl}
      ></UpdatePromotionForm>
    );
  }

  static fetchData(store, { url, language, params }) {
    return store.dispatch(
      fetchUpdatePromotion({
        pageData: {
          url,
          language
        },
        requestData: {
          promotionId: parseInt(params.promotionId)
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  isMobile: selectIsMobile(state),
  selectedPromotion: selectSelectedPromotion(state),
  promtions: selectPromotions(state)
});

const mapDispatchToProps = dispatch => ({
  onUpdatePromotion: data => dispatch(updatePromotion(data)),
  onLoadPromotions: data => dispatch(loadPromotions(data)),
  onSetSelectedPromotion: data => dispatch(setSelectedPromotion(data)),
  onResetSelectedPromotion: data => dispatch(resetSelectedPromotion(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(UpdatePromotion),
    getPage,
    REDUCER_NAME
  )
);
