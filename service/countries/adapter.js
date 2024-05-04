export const toCountries = data => {
  const countriesArray = data ? Object.keys(data) : null;

  if (countriesArray && countriesArray.length) {
    return countriesArray.map(item => {
      return toCountry(item, data[item]);
    });
  }
  return [];
};

export const toCountry = (key, value) => {
  if (key && value) {
    return {
      id: key,
      title: value
    };
  }
};
