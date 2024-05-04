export const toMyAccountJson = data => {
  if (data) {
    return {
      userId: data.userId,
      email: data.email,
      accountNumber: data.accountNumber,
      contactNumber: data.contactNumber,
      userName: data.userName,
      fullName: data.fullName,
      streetAddress: data.address,
      city: data.city,
      country: data.country,
      dateOfBirth: data.dateOfBirth,
      thumbnailUrl: data.profileImage,
      documents: data.documents,
      bankName: data.bankName,
      bankCountry: data.bankCountry,
      bankAddress: data.bankAddress,
      IBAN: data.iban,
      payPalUserName: data.payPalUserName,
      swiftBic: data.swiftBic,
      postCode: "PC1234"
    };
  }
};

export const toUploadFile = (name, fileUrl, documentType) => {
  if (name && fileUrl && documentType) {
    return {
      FileName: name,
      FileUrl: fileUrl,
      DocumentType: documentType
    };
  } else return null;
};
