import { toPagination } from "~service/adapter";
export const toBonusCampaign = data => {
  if (data) {
    return {
      pagination: toPagination(data.pagination),
      data: ToBonusValues(data)
    };
  } else {
    return null;
  }
};
export const ToBonusValues = data => {
  if (data) {
    return ToBonusValueArray(data);
  } else {
    return null;
  }
};

export const ToBonusValueArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return ToBonusValue(item);
    });
  } else {
    return [];
  }
};

export const ToBonusValue = data => {
  if (data) {
    return {
      title: data.title,
      id: data.id,
      type: data.type,
      from: data.depositFrom,
      to: data.depositTo,
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
      value: data.percentageBonus,
      isPublic: data.isPublic,
      promoCode: data.promoCode,
      betMultiplierRequirements: data.betMultiplierRequirements,
      expirationInDays: data.expirationInDays
    };
  }
};

export const toBonusCampaignJson = data => {
  return {
    id: data.id,
    title: data.title,
    isPublic: data.isPublic,
    type: data.type,
    dateFrom: data.dateFrom,
    dateTo: data.dateTo,
    depositFrom: data.depositFrom,
    depositTo: data.depositTo,
    percentageBonus: data.percentageBonus,
    promoCode: data.promoCode,
    betMultiplierRequirements: data.betMultiplierRequirements,
    expirationInDays: data.expirationInDays
  };
};

export const ToDirectBonusValues = data => {
  if (data) {
    return ToDirectBonusValueArray(data);
  } else {
    return null;
  }
};

export const ToDirectBonusValueArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return ToDirectBonusValue(item);
    });
  } else {
    return [];
  }
};

export const ToDirectBonusValue = data => {
  if (data) {
    return {
      title: data.title,
      id: data.id,
      type: data.type
    };
  }
};

export const ToWelcomeBonusStatus = data => {
  if (data) {
    return data.hasPlayerReceivedWelcomeBonus !== undefined
      ? data.hasPlayerReceivedWelcomeBonus
      : null;
  } else {
    return null;
  }
};
