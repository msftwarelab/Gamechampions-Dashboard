import groupBy from "lodash/groupBy";

export const toDayCountArray = data => {
  if (data && data.length) {
    const arr = data.map(item => {
      return toDayCount(item);
    });

    const groupedData = groupBy(arr, "day");
    const labels = [];
    const values = [];

    Object.keys(groupedData).forEach(key => {
      labels.push(key);
      values.push(groupedData[key].length);
    });

    return {
      labels,
      values
    };
  } else {
    return [];
  }
};

export const toDaySumArray = data => {
  if (data && data.length) {
    const arr = data.map(item => {
      return toDayCount(item);
    });

    const groupedData = groupBy(arr, "day");
    const labels = [];
    const values = [];

    Object.keys(groupedData).forEach(key => {
      labels.push(key);
      values.push(groupedData[key].reduce((a, b) => a + b.count, 0));
    });

    return {
      labels,
      values: values.map(item => item.toFixed(2))
    };
  } else {
    return [];
  }
};

export const toDayCount = data => {
  if (data) {
    return {
      day: data.day,
      count: data.count
    };
  }
};

export const toPlayWinArray = data => {
  if (data && data.length) {
    const arr = data.map(item => {
      return toPlayWin(item);
    });

    const labels = arr.map(item => item.fullname);
    const values = arr.map(item => item.wins);

    return {
      labels,
      values
    };
  } else {
    return [];
  }
};

export const toPlayWin = data => {
  if (data) {
    return {
      id: data.id,
      email: data.email,
      fullname: data.fullname,
      wins: data.wins
    };
  }
};
