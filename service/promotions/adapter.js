import {
  PROMOTION_COMMISSION_TYPE,
  PROMOTION_ACTION_TYPE
} from "~containers/promotions/constants";
import { toPagination } from "~service/adapter";

export const toPromotions = data => {
  if (data) {
    return {
      pagination: toPagination(data.pagination),
      data: toPromotionsArray(data)
    };
  } else {
    return [];
  }
};

export const toPromotionsArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toPromotion(item);
    });
  } else {
    return [];
  }
};

export const toPromotion = data => {
  if (data) {
    return {
      id: data.id,
      title: data.title,
      commissionType: PROMOTION_COMMISSION_TYPE[data.commissionType],
      type: PROMOTION_ACTION_TYPE[data.type],
      description: data.description,
      commission: data.commission ? data.commission : "",
      fixedCommission: data.fixedCommission ? data.fixedCommission : ""
    };
  }
};

export const toPromotionJson = data => {
  if (data) {
    let {
      id,
      commission,
      description,
      fixedCommission,
      promotionActionType,
      promotionCommissionType,
      title
    } = data;
    return {
      id: id,
      type: parseInt(promotionActionType),
      commissionType: parseInt(promotionCommissionType),
      title: title,
      description: description,
      commission: commission ? commission : "",
      fixedCommission: fixedCommission ? fixedCommission : ""
    };
  }
};
