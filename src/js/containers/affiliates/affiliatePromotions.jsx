import React from "react";
import { connect } from "react-redux";

import { withAuth, withPage } from "~hocs";
import {
  deleteAffiliatePromotion,
  fetchAffiliatePromotions,
  getAffiliateById,
  loadAffiliatePromotions,
  setSelectedPromotion
} from "./actions";
import { REDUCER_NAME } from "./constants";
import {
  selectAffiliatePromotions,
  selectedAffiliatePromotion,
  selectIsLoading,
  selectPagination,
  selectSelectedAffiliate
} from "./reducer";
import AffiliatePromotionsTable from "~components/custom/affiliates/affiliatePromotionsTable";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectAuth, selectIsMobile } from "../app/reducer";

class AffiliatePromotions extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      search: null
    };

    this.shapePromotions = this.shapePromotions.bind(this);
  }

  shapePromotions(promotions) {
    let promotionList = [];
    if (promotions) {
      promotions.forEach(promotion => {
        let promo = promotion.promotion;
        promotionList.push({
          id: promotion.id,
          title: promo.title,
          commissionType: promo.commissionType,
          type: promo.type,
          commission: promo.commission,
          fixedCommission: promo.fixedCommission
        });
      });
    }
    return promotionList;
  }

  componentDidMount() {
    const { onLoadPromotions, onSetselectedAffiliate, match } = this.props;
    const { affiliateId } = match.params;

    onLoadPromotions({
      affiliateId: affiliateId
    });
    onSetselectedAffiliate(affiliateId);
  }

  render() {
    const {
      selectedLanguage,
      isLoading,
      isMobile,
      selectedPromotion,
      onPromotionDelete,
      promotions,
      onSetSelectedPromotion,
      history,
      page,
      selectedAffiliate
    } = this.props;

    let shapedPromotions = this.shapePromotions(promotions.toJS());
    let returnUrl = `/${selectedLanguage}/affiliates`;
    return (
      <AffiliatePromotionsTable
        isLoading={isLoading}
        promotions={shapedPromotions}
        selectedLanguage={selectedLanguage}
        isMobile={isMobile}
        selectedAffiliate={selectedAffiliate}
        selectedPromotion={selectedPromotion}
        onPromotionDelete={onPromotionDelete}
        onSetSelectedPromotion={onSetSelectedPromotion}
        history={history}
        returnUrl={returnUrl}
        page={page}
      />
    );
  }

  static fetchData(store, { url, language, params }) {
    return store.dispatch(
      fetchAffiliatePromotions({
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
  authentication: selectAuth(state),
  pagination: selectPagination(state),
  isMobile: selectIsMobile(state),
  promotions: selectAffiliatePromotions(state),
  selectedAffiliate: selectSelectedAffiliate(state),
  selectedPromotion: selectedAffiliatePromotion(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadPromotions: data => dispatch(loadAffiliatePromotions(data)),
  onSetSelectedPromotion: data => dispatch(setSelectedPromotion(data)),
  onPromotionDelete: data => dispatch(deleteAffiliatePromotion(data)),
  onSetselectedAffiliate: data => dispatch(getAffiliateById(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(AffiliatePromotions),
    getPage,
    REDUCER_NAME
  )
);
