// @ts-nocheck
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FlexBox } from "~components/atoms";
import Paragraph from "~components/atoms/paragraph";
import Lightbox from "react-image-lightbox";
import { DocumentValidationStatus } from "~containers/myaccount/constants";
import { STORAGE_URL } from "~service/constants";

const FileUpload = ({
  register,
  watch,
  setValue,
  name,
  initialValue,
  fieldProps = {
    title: "",
    label: "",
    alt: "",
    helperText: "",
    defaultFile: "",
    multiple: false,
    className: "",
    fileUploadClassName: "",
    documents: [],
    readOnly: false
  },
  readOnly,
  onFileLoad
}) => {
  const {
    title,
    label,
    alt,
    defaultFile,
    multiple,
    className,
    fileUploadClassName,
    documents
  } = fieldProps;
  const [isLoading, setIsLoading] = useState(false);
  const [docName, setDocName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const fileUploadRef = useRef(null);
  const currentValue = watch(name) || initialValue || defaultFile;
  const { t } = useTranslation();
  const getImageURL = fileUrl => {
    return `${STORAGE_URL}${fileUrl}`;
  };

  if (documents?.find(d => d.fileName === docName)) {
    setDocName("");
  }
  const isImage = docName => {
    return (
      docName
        .split(".")
        .pop()
        .toLowerCase() === "png" ||
      docName
        .split(".")
        .pop()
        .toLowerCase() === "jpg" ||
      docName
        .split(".")
        .pop()
        .toLowerCase() === "jpeg"
    );
  };
  return (
    <div className={className ? `${className}` : ""}>
      {className === "profile-doc" && (
        <div>
          Documents
          <hr />
        </div>
      )}
      <div
        title={title}
        className={`file-upload ${
          fileUploadClassName ? `image-upload--${fileUploadClassName}` : ""
        } ${isLoading ? " loading" : ""}
            ${readOnly ? " readonly" : ""}`}
        onClick={() => fileUploadRef.current.click()}
      >
        <input
          className="file-upload__input"
          name={`${name}_file`}
          id={`${name}_file`}
          type="file"
          readOnly={readOnly}
          ref={fileUploadRef}
          multiple={multiple}
          onChange={e => {
            const files = e.target.files;

            if (files) {
              for (let i = 0; i < files?.length; i++) {
                const file = files[i];
                try {
                  setIsLoading(true);
                  if (file.size > 1024 * 1024 * 40) {
                    throw "Error: File size is too large";
                  }
                  const reader = new FileReader();

                  // closure to capture the file information
                  reader.onload = e => {
                    onFileLoad(file, e.target).then(response => {
                      setDocName(file.name);
                      setValue(name, [file.name, response.fileUrl]);
                      setFileUrl(response.fileUrl);
                      setIsLoading(false);
                    });
                  };

                  // read in the file as a data URL
                  reader.readAsDataURL(file);
                } catch (e) {
                  setIsLoading(false);
                  alert(e);
                  console.error(e);
                }
              }
            }
          }}
        />
        <img
          src="/img/icons/ic_insert_drive_file_black_24px.svg"
          alt={alt}
          title={title}
          className={`file-upload__img ${className ? `${className}__img` : ""}`}
        />
        <input
          ref={register}
          type="hidden"
          name={name}
          defaultValue={currentValue}
        />
      </div>
      <div className={`${className ? `${className}__label__container` : ""}`}>
        {documents?.length ? (
          <>
            {documents.map((document, index) => (
              <FlexBox justifyContent="space-between" key={index}>
                <FileName>{document.fileName}</FileName>
                <ListOptions>
                  <Paragraph
                    color={
                      document.validationStatus ===
                      DocumentValidationStatus.DocumentValidated
                        ? "green"
                        : document.validationStatus ===
                          DocumentValidationStatus.InvalidDocument
                        ? "red"
                        : "black"
                    }
                  >
                    {document.validationStatus ===
                    DocumentValidationStatus.DocumentValidated
                      ? t("PlayerUploadDocumentValidated")
                      : document.validationStatus ===
                        DocumentValidationStatus.InvalidDocument
                      ? t("PlayerUploadDocumentInvalid")
                      : t("PlayerUploadDocumentNotValidated")}
                  </Paragraph>
                  <MenuItem
                    color="green"
                    onClick={() => {
                      if (isImage(document.fileName)) {
                        setIsOpen(true);
                        setDocName(document.fileName);
                        setFileUrl(document.fileUrl);
                      }
                    }}
                  >
                    {isImage(document.fileName) ? (
                      <>{t("PlayerUploadDocumentViewText")}</>
                    ) : (
                      <a
                        href={getImageURL(document.fileUrl)}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {t("PlayerUploadDocumentViewText")}
                      </a>
                    )}
                  </MenuItem>
                </ListOptions>
              </FlexBox>
            ))}
          </>
        ) : (
          <></>
        )}
        <>
          {documents &&
            !documents.some(
              document =>
                document.validationStatus ===
                DocumentValidationStatus.DocumentValidated
            ) && (
              <>
                <label
                  className={`files-container__image-list__item--add__label ${
                    className ? `${className}__label` : ""
                  }`}
                  htmlFor={`${name}_file`}
                >
                  {t(label)}
                </label>
                <label
                  className="helper-text"
                  htmlFor={"helperText"}
                  style={{ textAlign: "center" }}
                >
                  {docName !== "" ? (
                    <MenuItem
                      color="green"
                      onClick={() => {
                        if (isImage(docName)) {
                          setIsOpen(true);
                        }
                      }}
                    >
                      {isImage(docName) ? (
                        <>{docName}</>
                      ) : (
                        <a
                          href={getImageURL(fileUrl)}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {docName}
                        </a>
                      )}
                    </MenuItem>
                  ) : documents?.length ? (
                    ""
                  ) : (
                    t("NoDocumentsFound")
                  )}
                </label>
              </>
            )}
        </>
      </div>
      {isOpen && fileUrl && (
        <Lightbox
          animationOnKeyInput
          imageTitle={docName}
          mainSrc={getImageURL(fileUrl)}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

const FileName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ListOptions = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

const MenuItem = styled.a`
  min-width: 3rem;
  color: ${props => props.color};
  text-decoration: none;
  cursor: pointer;
  pointer-events: ${props => props.pointerEvents || "auto"};
  &:hover {
    color: ${props => props.hoverColor} !important;
  }
`;

export default FileUpload;
