export const toBoyGamesArray = data => {
  if (data && data.length) {
    return data.map(toBoyGameItem);
  }
  return [];
};

const toBoyGameItem = data => {
  if (data) {
    return {
      gameId: data.gameId,
      title: data.title,
      thumbnail: toThumbnail(data.thumbnail),
      maximumBetAmount: data.maximumBetAmount,
      isEnabled: data.isEnabled,
      iconUrl: data.icon.imageUrl,
      bannerColor: `#${data.bannerColor}`,
      banners: toBannersArray(data.banners),
      bannerImages: data.bannerImages,
      champions: data.champions,
      regions: data.regions
    };
  }
};

const toBannersArray = data => {
  if (data && data.length) {
    return data.map(toBannerItem);
  }
  return [];
};

const toBannerItem = data => {
  if (data) {
    return {
      title: data.title,
      summary: data.summary,
      textColor: data.textColor,
      ctaText: data.ctaText,
      id: data.id,
      images: toImagesArray(data.images)
    };
  }
};

const toImagesArray = data => {
  if (data && data.length) {
    return data.map(toThumbnail);
  }
  return [];
};

export const toQuickLinksArray = data => {
  if (data && data.length) {
    return data.map(toQuickLinkItem);
  }
  return [];
};

const toQuickLinkItem = data => {
  if (data) {
    return {
      header: data.header,
      summary: data.summary,
      link: toLinkItem(data.link)
    };
  }
};

const toLinkItem = data => {
  if (data) {
    return {
      id: data.id,
      link: data.url,
      isNewWindow: data.isNewWindow,
      internal: data.internal,
      edit: data.edit,
      isInternal: data.isInternal,
      internalName: data.internalName,
      internalIcon: data.internalIcon,
      type: data.type,
      title: data.title
    };
  }
};

const toThumbnail = data => {
  if (data) {
    return {
      title: data.title,
      imageUrl: data.imageUrl,
      alternateText: data.alternateText,
      width: data.width,
      height: data.height,
      id: data.id
    };
  }
};
