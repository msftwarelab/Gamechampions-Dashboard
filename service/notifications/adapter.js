export const toNotificationsArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toNotification(item);
    });
  } else {
    return [];
  }
};

export const toNotification = data => {
  if (data) {
    return {
      id: data.id,
      title: data.title,
      message: data.message,
      type: data.type,
      thumbnail: data.thumbnail,
      actionId: data.actionId,
      isRead: data.isRead
    };
  }
};
