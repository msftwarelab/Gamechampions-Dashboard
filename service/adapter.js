export const toPercentage = (current, previous, digits) => {
  return Math.abs(((current - previous) / previous) * 100).toFixed(digits);
};

export const toPriceString = (data, currency) => {
  const currencySymbol = currency || "$";
  if (data || data == 0) {
    let float = parseFloat(data);
    let isNegative = float < 0;
    let amount = parseFloat(Math.abs(float)).toFixed(2);
    let returnString = `${currencySymbol}${amount}`;
    if (isNegative) {
      returnString = `-${returnString}`;
    }
    return returnString;
  }
};

export const toView = data => {
  if (data) {
    return data.template ? data.template.toLowerCase() : "";
  }
};

export const toMeta = data => {
  if (data) {
    return {
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      creator: data.creator,
      date: data.date
    };
  }
};

export const toImage = data => {
  if (data) {
    return {
      title: data.title,
      src: data.imageUrl,
      alt: data.alternateText,
      width: data.width,
      height: data.height
    };
  }
};

export const toVideo = data => {
  if (data) {
    return {
      title: data.title,
      src: data.videoUrl
    };
  }
};

export const toImageArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toImage(item);
    });
  }
  return [];
};

export const toResponsiveImage = images => {
  if (images && images.length > 0) {
    const defaultImage = images[0];
    let responsiveImageData = {
      title: defaultImage.title,
      src: defaultImage.imageUrl,
      alt: defaultImage.alternateText,
      srcset: defaultImage.imageUrl + " " + defaultImage.width + "w"
    };
    // If there any images left over, append their contents to the srcset
    for (let i = 1; i < images.length; i++) {
      responsiveImageData.srcset = `${responsiveImageData.srcset}, ${images[i].imageUrl} ${images[i].width}w`;
    }
    return responsiveImageData;
  }
};

export const toBannerArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toBanner(item);
    });
  }
  return [];
};

export const toBanner = data => {
  if (data) {
    let banner = {
      title: data.title,
      summary: data.summary,
      link: toLink(data.link),
      textColor: data.textColor,
      image: toResponsiveImage(data.images)
    };

    if (data.videoWebM) {
      banner.videoWebM = toVideo(data.videoWebM);
      banner.useVideo = true;
    }
    if (data.videoMp4) {
      banner.videoMp4 = toVideo(data.videoMp4);
      banner.useVideo = true;
    }

    return banner;
  }
};

export const toPagination = data => {
  if (data) {
    return {
      pageCount: parseInt(data.pageCount),
      itemCount: parseInt(data.itemCount)
    };
  }
};

export const toLink = data => {
  if (data) {
    return {
      title: data.title,
      url: data.url,
      isNewWindow: data.isNewWindow,
      isInternal: data.isInternal
    };
  }
};

export const toLinkArray = data => {
  if (data) {
    return data.map(item => {
      return toLink(item);
    });
  }
  return [];
};
