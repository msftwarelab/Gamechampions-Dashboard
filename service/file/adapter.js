export const toFileJson = data => {
  if (data) {
    return {
      serializedFile: data.file,
      extension: data.extension,
      fileName: data.fileName,
      type: data.documentType
    };
  }
  return null;
};

export const toFile = data => {
  if (data) {
    return {
      fileUrl: data.fileUrl,
      fileName: data.fileName
    };
  }
  return null;
};
