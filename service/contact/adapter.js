export const toContactUsJson = data => {
  if (data) {
    return {
      fullName: data.name,
      email: data.email,
      message: data.message
    };
  }
};
