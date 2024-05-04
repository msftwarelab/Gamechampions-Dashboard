import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";

import { withAuth, withPage } from "~hocs";
import {
  fetchPromoteAffiliate,
  getAffiliateById,
  promoteAffiliate,
  resetError,
  resetSelectedPromotion
} from "./actions";
import { REDUCER_NAME } from "./constants";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectIsMobile } from "../app/reducer";
import PromoteAffiliateForm from "~components/custom/promotions/promoteAffiliateForm";
import {
  selectIsLoading,
  selectSelectedAffiliate,
  selectError,
  selectAffiliatePromotions
} from "./reducer";
import { laodAllPromotions } from "~containers/promotions/actions";
import { selectPromotions } from "~containers/promotions/reducer";

class PromoteAffiliate extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false
    };
    this.shapePromotionsList = this.shapePromotionsList.bind(this);
  }

  shapePromotionsList(promotions) {
    const { affiliatePromotions } = this.props;
    let affiliatePromotionTypes = [];

    affiliatePromotions.toJS().forEach(promotion => {
      affiliatePromotionTypes.push(promotion.promotion.type);
    });

    let promotionList = [];
    if (promotions) {
      promotions.forEach(promotion => {
        let isExists = false;
        affiliatePromotionTypes.forEach(type => {
          if (type == promotion.type) {
            isExists = true;
          }
        });
        if (!isExists) {
          promotionList.push({ id: promotion.id, title: promotion.title });
        }
      });
    }
    return promotionList;
  }

  componentDidMount() {
    const { onLoadAllPromotions, onSetselectedAffiliate, match } = this.props;
    const { affiliateId } = match.params;
    onLoadAllPromotions();
    onSetselectedAffiliate(affiliateId);
  }

  componentWillUnmount() {
    const { onResetError } = this.props;
    onResetError();
  }

  render() {
    const {
      selectedLanguage,
      history,
      page,
      selectedAffiliate,
      error,
      allPromotions,
      onPromoteAffiliate
    } = this.props;
    let returnUrl = `/${selectedLanguage}/affiliates/${selectedAffiliate &&
      selectedAffiliate.get("id")}/affiliate-promotions`;
    let promotions = this.shapePromotionsList(allPromotions.toJS());

    return (
      <PromoteAffiliateForm
        page={page}
        history={history}
        returnUrl={returnUrl}
        selectedAffiliate={selectedAffiliate}
        onPromoteAffiliate={onPromoteAffiliate}
        promotionsList={promotions}
        error={error}
      ></PromoteAffiliateForm>
    );
  }

  static fetchData(store, { url, language, params }) {
    return store.dispatch(
      fetchPromoteAffiliate({
        pageData: {
          url,
          language
        },
        requestData: {
          affiliateId: parseInt(params.affiliateId)
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  isMobile: selectIsMobile(state),
  selectedAffiliate: selectSelectedAffiliate(state),
  error: selectError(state),
  affiliatePromotions: selectAffiliatePromotions(state),
  allPromotions: selectPromotions(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadAllPromotions: () => dispatch(laodAllPromotions()),
  onPromoteAffiliate: data => dispatch(promoteAffiliate(data)),
  onResetError: () => dispatch(resetError()),
  onResetSelectedPromotion: () => dispatch(resetSelectedPromotion()),
  onSetselectedAffiliate: data => dispatch(getAffiliateById(data))
});

export default withAuth(
  withPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(hoistStatics(withTranslation()(PromoteAffiliate), PromoteAffiliate)),
    getPage,
    REDUCER_NAME
  )
);
