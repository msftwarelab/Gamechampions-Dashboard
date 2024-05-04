export const toGamerTagsJson = data => {
  if (data) {
    return {
      psnId: data.psnId,
      xboxLive: data.xboxLive,
      fortniteGamertag: data.fortniteGamertag,
      eaAccount: data.eaAccount,
      nba2KAccount: data.nba2KAccount,
      activisionId: data.activisionId,
      id: data.id
    };
  }
};
