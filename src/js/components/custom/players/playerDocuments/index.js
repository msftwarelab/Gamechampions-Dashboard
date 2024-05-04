// @ts-nocheck
import React, { useState } from "react";
import styled from "styled-components";
import Lightbox from "react-image-lightbox";
import { useTranslation } from "react-i18next";
import { withTheme } from "~theme";
import DynamicForm from "~components/molecules/dynamicForm";
import { FlexBox, Loader, Paragraph } from "~components/atoms";
import { onImageLoad } from "~containers/matchLobby/constants";
import { toast } from "react-toastify";
import ErrorToastNotification from "~components/custom/toastNotification/errorToastNotification";
import { STORAGE_URL } from "~service/constants";
import {
  DocumentValidationStatus,
  DocumentRejectionReason,
  getRejectionReasonFormFields,
  DocumentType
} from "~containers/myaccount/constants";

const PlayerDocuments = ({
  name,
  watch,
  register,
  fieldProps,
  theme,
  setValue,
  initialValue
}) => {
  const { t } = useTranslation();

  const {
    selectedPlayer,
    onSetPlayer,
    onDeletePlayerDocument,
    onValidatePlayerDocument,
    history,
    returnUrl
  } = fieldProps;

  const currentValue = watch(name) || initialValue;
  const documents = initialValue === "" ? [] : JSON.parse(initialValue);

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState(0);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const getImageURL = fileUrl => {
    return `${STORAGE_URL}${fileUrl}`;
  };

  const isImage = document => {
    return (
      document.fileName
        .split(".")
        .pop()
        .toLowerCase() === "png" ||
      document.fileName
        .split(".")
        .pop()
        .toLowerCase() === "jpg" ||
      document.fileName
        .split(".")
        .pop()
        .toLowerCase() === "jpeg"
    );
  };

  const onReasonChange = value => {
    setReason(parseInt(value));
  };

  return (
    <FlexBox margin="0px" flexDirection="column">
      <FlexBox justifyContent="center" margin="0 0 1rem 0">
        <input
          name={`${name}_file`}
          id={`${name}_file`}
          type="file"
          hidden
          multiple
          accept="image/jpg, image/jpeg, image/png, application/msword, .pdf"
          onChange={e => {
            const files = e.target.files;
            if (files) {
              for (let i = 0; i < files.length; i++) {
                const file = files[i];
                try {
                  if (file.size > 1024 * 1024 * 10) {
                    throw t("PlayerUploadDocumentFileSizeError");
                  }

                  if (
                    !file.type.match(
                      /image.*|application\/msword|application\/pdf/
                    )
                  ) {
                    throw t("PlayerUploadDocumentInvalidFileTypeError");
                  }

                  const reader = new FileReader();

                  // closure to capture the file information
                  reader.onload = e => {
                    setUploadInProgress(true);
                    onImageLoad(file, e.target).then(response => {
                      setUploadInProgress(true);

                      uploadedFiles.push({
                        FileName: file.name,
                        FileUrl: response.fileUrl
                      });
                      setUploadedFiles(uploadedFiles);

                      let player = selectedPlayer;
                      player.documents = player.documents.concat({
                        fileName: file.name,
                        fileUrl: response.fileUrl,
                        documentType: DocumentType.IdentityDocument,
                        validationStatus:
                          DocumentValidationStatus.NotYetValidated,
                        rejectionReason: DocumentRejectionReason.NotYetValidated
                      });

                      onSetPlayer(player);

                      setValue(name, JSON.stringify(player.documents));
                      setUploadInProgress(false);
                    });
                  };

                  // read in the image file as a data URL
                  reader.readAsDataURL(file);
                } catch (e) {
                  alert(e);
                }
              }
            }
          }}
        />
        <input
          ref={register}
          type="hidden"
          name={name}
          defaultValue={currentValue}
        />
        <FileInputLabel
          htmlFor={`${name}_file`}
          pointerEvents={uploadInProgress ? "none" : "auto"}
          loading={uploadInProgress}
          color={theme.colors.white}
          activeBackgroundColor={theme.colors.secondary}
          hoverColor={theme.colors.secondaryLight}
          disabledBackgroundColor={theme.colors.disabledBackgroundColor}
        >
          {uploadInProgress
            ? t("PlayerUploadDocumentUploadingText")
            : t("PlayerUploadDocumentText")}
          <Loader isLoading={uploadInProgress} margin="0 0 0 1rem" />
        </FileInputLabel>
      </FlexBox>

      <FlexBox flexDirection="column" alignItems="center">
        {documents.length ? (
          <List nthChildBackgroundColor={theme.colors.lobbyBackgroundGrey}>
            {documents.map((document, index) => (
              <ListItem
                key={document.id}
                hoverBackgroundColor={theme.colors.hoverBackgroundColor}
              >
                <FlexBox justifyContent="space-between" alignItems="center">
                  <FlexBox flexDirection="column">
                    <FileName>{document.fileName}</FileName>
                    {document.documentType !== 0 && (
                      <Paragraph
                        fontSize="0.8rem"
                        color={
                          document.validationStatus ===
                          DocumentValidationStatus.DocumentValidated
                            ? theme.colors.secondary
                            : document.validationStatus ===
                              DocumentValidationStatus.InvalidDocument
                            ? theme.colors.errorColor
                            : document.validationStatus ===
                              DocumentValidationStatus.NotYetValidated
                            ? theme.colors.greyDark
                            : theme.colors.black
                        }
                      >
                        <i>
                          {document.validationStatus ===
                          DocumentValidationStatus.DocumentValidated
                            ? t("PlayerUploadDocumentValidated")
                            : document.validationStatus ===
                              DocumentValidationStatus.InvalidDocument
                            ? document.rejectionReason ===
                              DocumentRejectionReason.DocumentNotClearlyVisible
                              ? t("PlayerUploadDocumentNotVisible")
                              : document.rejectionReason ===
                                DocumentRejectionReason.InvalidDocumentExtension
                              ? t("PlayerUploadDocumentInvalidExtension")
                              : t("PlayerUploadDocumentInvalid")
                            : t("PlayerUploadDocumentNotValidated")}
                        </i>
                      </Paragraph>
                    )}
                  </FlexBox>
                  <ListOptions>
                    {document.documentType !== 0 && (
                      <FlexBox flexDirection="column">
                        <FlexBox flexDirection="row-reverse">
                          <MenuItem
                            color={theme.colors.secondary}
                            onClick={() => {
                              let player = selectedPlayer;
                              onValidatePlayerDocument({
                                PlayerId: player.id,
                                DocumentId: document.id,
                                ValidationStatus:
                                  DocumentValidationStatus.DocumentValidated,
                                RejectionReason: document.rejectionReason,
                                DocumentType: document.documentType
                              });
                              const documentUpdate = player.documents.find(
                                ele => ele.id === document.id
                              );

                              documentUpdate.validationStatus =
                                DocumentValidationStatus.DocumentValidated;
                              onSetPlayer(player);
                              setValue(name, JSON.stringify(player.documents));

                              history.push(
                                returnUrl +
                                  `/${player.id}` +
                                  "?success=true&action=edit&object=profile"
                              );
                            }}
                          >
                            {t("PlayerUploadDocumentAcceptText")}
                          </MenuItem>
                        </FlexBox>
                        <FlexBox alignItems="center">
                          <MenuItem color={theme.colors.secondary}>
                            <DynamicForm
                              formFields={getRejectionReasonFormFields({
                                onChange: onReasonChange
                              })}
                              displayButtons={false}
                              className="reason-field__input"
                            />
                          </MenuItem>
                          <MenuItem
                            color={theme.colors.red}
                            hoverColor={theme.colors.indianRed}
                            onClick={() => {
                              let player = selectedPlayer;
                              if (reason == 0) {
                                toast(
                                  <ErrorToastNotification
                                    message={t(
                                      "PlayerUploadDocumentChooseRejectionReason"
                                    )}
                                  />,
                                  {
                                    className: "toast-custom",
                                    hideProgressBar: true,
                                    closeButton: false
                                  }
                                );
                              } else {
                                onValidatePlayerDocument({
                                  PlayerName: player.fullName,
                                  PlayerId: player.id,
                                  DocumentId: document.id,
                                  ValidationStatus:
                                    DocumentValidationStatus.InvalidDocument,
                                  RejectionReason: reason,
                                  DocumentType: document.documentType
                                });
                                const documentUpdate = player.documents.find(
                                  ele => ele.id === document.id
                                );

                                documentUpdate.validationStatus =
                                  DocumentValidationStatus.InvalidDocument;
                                documentUpdate.rejectionReason = reason;
                                onSetPlayer(player);
                                setValue(
                                  name,
                                  JSON.stringify(player.documents)
                                );
                                history.push(
                                  returnUrl +
                                    `/${player.id}` +
                                    "?success=true&action=edit&object=profile"
                                );
                              }
                            }}
                          >
                            {t("PlayerUploadDocumentRejectText")}
                          </MenuItem>
                        </FlexBox>
                      </FlexBox>
                    )}
                  </ListOptions>
                  <ListOptions>
                    <MenuItem
                      color={theme.colors.secondary}
                      onClick={() => {
                        if (isImage(document)) {
                          setPhotoIndex(index);
                          setIsOpen(true);
                        }
                      }}
                    >
                      {isImage(document) ? (
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
                    {!!document.id && (
                      <MenuItem
                        color={theme.colors.red}
                        hoverColor={theme.colors.indianRed}
                        onClick={() => {
                          let player = selectedPlayer;
                          let documentIndex = player.documents.findIndex(
                            currentDocument =>
                              currentDocument.id === document.id
                          );

                          onDeletePlayerDocument({
                            playerId: player.id,
                            documentId: document.id
                          });
                          if (documentIndex !== -1) {
                            player.documents.splice(documentIndex, 1);

                            onSetPlayer(player);
                          }

                          player.documents = player.documents.map(document => {
                            delete document.id;
                            delete document.player;
                            delete document.isEnabled;
                            delete document.dateCreated;
                            delete document.dateUpdated;

                            return document;
                          });

                          setValue(name, JSON.stringify(player.documents));
                        }}
                      >
                        {t("PlayerUploadDocumentDeleteText")}
                      </MenuItem>
                    )}
                  </ListOptions>
                </FlexBox>
              </ListItem>
            ))}
          </List>
        ) : (
          <Paragraph textAlign="center" margin="1rem 0">
            {t("PlayerUploadDocumentNoDocumentsText")}
          </Paragraph>
        )}
      </FlexBox>
      {isOpen && documents && !!documents.length && (
        <Lightbox
          animationOnKeyInput
          imageTitle={documents[photoIndex].fileName}
          mainSrc={getImageURL(documents[photoIndex].fileUrl)}
          nextSrc={getImageURL(
            documents[(photoIndex + 1) % documents.length].fileUrl
          )}
          prevSrc={getImageURL(
            documents[(photoIndex + documents.length - 1) % documents.length]
              .fileUrl
          )}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => {
            setPhotoIndex(
              (photoIndex + documents.length - 1) % documents.length
            );
          }}
          onMoveNextRequest={() => {
            setPhotoIndex((photoIndex + 1) % documents.length);
          }}
        />
      )}
    </FlexBox>
  );
};

const List = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;

  & > li:nth-child(odd) {
    background-color: ${props => props.nthChildBackgroundColor};
  }
`;

const ListItem = styled.li`
  width: 100%;
  padding: 0.8em 0.4em;
  overflow: auto;

  &:hover {
    background-color: ${props => props.hoverBackgroundColor} !important;
  }
`;

const FileInputLabel = styled.label`
  background-color: ${props =>
    props.loading
      ? props.disabledBackgroundColor
      : props.activeBackgroundColor};
  color: ${props => props.color};
  padding: 1rem;
  border-radius: 0.3rem;
  cursor: pointer;
  margin-top: 1rem;

  text-transform: uppercase;

  display: flex;
  align-items: center;

  &:hover {
    background-color: ${props => props.hoverColor};
  }

  pointer-events: ${props => props.pointerEvents || "auto"};

  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

const FileName = styled.div`
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-right: 1rem;
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

export default withTheme(PlayerDocuments);
