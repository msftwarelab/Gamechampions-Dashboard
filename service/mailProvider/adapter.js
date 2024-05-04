export const toUserMailJson = data => {
  if (data) {
    return {
      email: data.email,
      userName: data.userName,
      fullName: data.fullName,
      IsExcludedFromCampaigns: false
    };
  }
};
