export const toLanguagesArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toLanguage(item);
    });
  } else {
    return [];
  }
};

export const toLanguage = data => {
  if (data) {
    return {
      id: data.id,
      title: data.language,
      flagPath: data.flagPath
    };
  }
};
