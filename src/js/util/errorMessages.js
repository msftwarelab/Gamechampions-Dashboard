const GENERIC_ERROR_KEY = "GenericError";

export const transformApiMessages = (apiErrorResponse, customMessagesShema) => {
  if (apiErrorResponse && apiErrorResponse.status) {
    return customMessagesShema[apiErrorResponse.status] || GENERIC_ERROR_KEY;
  }

  return GENERIC_ERROR_KEY;
};
