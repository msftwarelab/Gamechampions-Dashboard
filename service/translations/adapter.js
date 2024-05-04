export const toTranslation = data => {
  if (data) {
    return {
      translation: toTranslationItems(data)
    };
  }
  return {};
};

const toTranslationItems = data => {
  if (data) {
    return data.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
  }
  return {};
};
