import moment from "moment";
import {
  PROMOTION_ACTION_TYPE,
  PROMOTION_COMMISSION_TYPE
} from "~containers/promotions/constants";
import { toPagination } from "~service/adapter";
import {
  AFFILIATE_SOURCE_QUERY_PARAM,
  AFFILIATE_MEDIUM_QUERY_PARAM
} from "../constants";

export const toAffiliateJson = data => {
  if (data) {
    return {
      affiliateId: data.affiliateId,
      language: data.language
    };
  }
};

export const toAffiliates = data => {
  if (data) {
    return {
      pagination: toPagination(data.pagination),
      data: toAffiliatesArray(data)
    };
  } else {
    return null;
  }
};

export const toAffiliatesArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toAffiliate(item);
    });
  } else {
    return [];
  }
};

export const toAffiliate = data => {
  if (data) {
    return {
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      dateRegistered: data.dateCreated
        ? moment(data.dateCreated).format("YYYY/MM/DD")
        : "",
      lifetimeValue: data.lifetimeValue,
      commission: data.commission,
      isBlocked: data.isBlocked
    };
  }
};

export const toCreateAffiliate = data => {
  if (data) {
    return {
      fullName: data.fullName,
      email: data.email,
      passwordHash: data.password,
      lifetimeValue: data.lifetimeValue
    };
  }
};

export const toUpdateAffiliate = data => {
  if (data) {
    return {
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      passwordHash: data.password,
      lifetimeValue: data.lifetimeValue
    };
  }
};

export const toUrlsArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toUrl(item);
    });
  } else {
    return [];
  }
};

export const toUrl = data => {
  if (data) {
    let affiliateUrlName = data.affiliateFullName
      ? data.affiliateFullName.replace(/\s+/g, "").toLowerCase()
      : "";
    let affiliateSource = `?${AFFILIATE_SOURCE_QUERY_PARAM}=${affiliateUrlName}-${data.affiliateId}`;
    let medium = data.medium
      ? `&${AFFILIATE_MEDIUM_QUERY_PARAM}=${data.medium}`
      : "";
    return {
      id: data.id,
      affiliateId: data.affiliateId,
      affiliateName: data.affiliateFullName ? data.affiliateFullName : "",
      urlShort: `${data.destinationUrl}${affiliateSource}${medium}`,
      destination: data.destinationUrl,
      medium: data.medium,
      isBlocked: data.isBlocked,
      numberOfClicks: data.numberOfClicks
    };
  }
};

export const toLink = data => {
  return {
    id: data.id,
    affiliateId: data.affiliateId,
    affiliateName: data.affiliateFullName,
    urlShort: data.destinationUrl,
    destination: data.shortUrl,
    medium: data.medium,
    isBlocked: data.isBlocked,
    numberOfClicks: data.numberOfClicks
  };
};

export const toCreateAffiliateUrl = data => {
  if (data) {
    return {
      affiliateId: data.affiliateId,
      shortUrl: data.shortenedUrl,
      destinationUrl: data.destinationUrl,
      medium: data.medium
    };
  }
};

export const toUpdateAffiliateUrl = data => {
  if (data) {
    return {
      id: data.id,
      affiliateId: data.affiliateId,
      shortUrl: data.shortenedUrl,
      destinationUrl: data.destinationUrl,
      medium: data.medium
    };
  }
};

export const toAffiliatePlayersArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toAffiliatePlayers(item);
    });
  } else {
    return [];
  }
};

export const toAffiliatePlayers = data => {
  if (data) {
    return {
      id: data.id,
      affiliateId: data.affiliateId,
      playerName: data.playerName,
      dateRegistered: moment(data.dateCreated).format("DD/MM/YYYY"),
      firstActionDate: data.firstActionDate
        ? moment(data.firstActionDate).format("DD/MM/YYYY")
        : "N/A",
      actionCount: data.actionCount,
      totalLifetimeValue:
        "$" + data.totalLifetimeComissionValue
          ? data.totalLifetimeComissionValue.toFixed(2)
          : 0,
      medium: data.medium
    };
  }
};

export const toTrackAffiliateJson = data => {
  if (data) {
    return {
      source: data[AFFILIATE_SOURCE_QUERY_PARAM],
      medium: data[AFFILIATE_MEDIUM_QUERY_PARAM]
    };
  }

  return null;
};

export const toAffiliateCommission = data => {
  if (data) {
    return {
      totalFilteredCommission: data.totalFilteredCommission.toFixed(2),
      totalCommission: data.totalCommission.toFixed(2),
      totalPayout: data.totalPayout.toFixed(2),
      totalDebt: data.totalCommission - data.totalPayout
    };
  }
};

export const toMediaArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toMedia(item);
    });
  } else {
    return [];
  }
};

export const toMedia = data => {
  if (data) {
    return {
      id: data,
      title: data
    };
  }
};

export const toAffiliatePromotionsArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toAffiliatePromotion(item);
    });
  } else {
    return [];
  }
};

export const toAffiliatePromotion = data => {
  if (data) {
    return {
      id: data.id,
      promotion: toPromotion(data.promotion)
    };
  }
};

export const toPromotion = data => {
  if (data) {
    return {
      title: data.title,
      commissionType: PROMOTION_COMMISSION_TYPE[data.commissionType],
      type: PROMOTION_ACTION_TYPE[data.type],
      description: data.description,
      commission: data.commission ? data.commission : "",
      fixedCommission: data.fixedCommission ? data.fixedCommission : ""
    };
  }
};

export const toPromoteAffiliateJson = data => {
  if (data) {
    return {
      affiliateId: parseInt(data.affiliateId),
      affiliatePromotionId: parseInt(data.type)
    };
  }
};
