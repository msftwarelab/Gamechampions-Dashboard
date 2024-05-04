import React from "react";
import DynamicForm from "../../molecules/dynamicForm";
import {
  getProfileFormFields,
  ProfileFormTypes,
  DocumentType
} from "~containers/myaccount/constants";
import { toast } from "react-toastify";
import ErrorToastNotification from "~components/custom/toastNotification/errorToastNotification";
import { PersonalSettingDiv } from "./personalSettingsStyled";
import { withTranslation } from "react-i18next";
import { toUploadFile } from "~service/profile/adapter";
import { STORAGE_URL } from "../../../../../service/constants";

const defaultImage = "ic_account_circle-24px";
const defultImageFolder = "images";

const validateProfileImage = imageUrl => {
  if (!imageUrl) {
    return null;
  }
  if (imageUrl.includes(defaultImage)) {
    return null;
  }
  if (imageUrl.includes(STORAGE_URL)) {
    const imgIndex = imageUrl.lastIndexOf("/");
    const image = imageUrl.substr(imgIndex);
    return defultImageFolder.concat(image);
  }
  return imageUrl;
};

const validateDocuments = documents => {
  if (!documents) {
    return null;
  }
  if (documents.includes(defaultImage)) {
    return null;
  }
  const fileName = documents.split(",")[0].trim();
  const fileUrl = documents.split(",")[1]?.trim();
  const documentType = DocumentType.IdentityDocument;
  return toUploadFile(fileName, fileUrl, documentType);
};

class PersonalSettings extends React.PureComponent {
  render() {
    const {
      history,
      profile,
      match,
      t,
      selectedLanguage,
      countries,
      onSubmitMyAccount
    } = this.props;

    const formFields = getProfileFormFields({
      formType: ProfileFormTypes.EditProfile,
      profile: profile
    });

    formFields.find(x => x.name === "country").options = countries.toJS
      ? countries.toJS()
      : countries;

    return (
      <PersonalSettingDiv>
        <h2>{t("PersonalSettingsTitle")}</h2>
        <DynamicForm
          action={match.url}
          mode="edit"
          submitButtonLabel="ButtonDynamicFormUpdate"
          initialValues={profile && profile.toJS()}
          formFields={formFields}
          onSubmit={e => {
            const data = { ...e };
            data.profileImage = validateProfileImage(e?.profileImage);
            data.documents = profile.toJS().documents;
            data.documents.push(validateDocuments(e?.documents));
            data.userId = profile.get("id");
            data.email = profile.get("email");
            if (
              profile.toJS().documents.length < 1 &&
              (data?.documents?.length < 1 || data?.documents[0] === null)
            ) {
              toast(
                <ErrorToastNotification message={t("ProfileDocRequired")} />,
                {
                  className: "toast-custom",
                  hideProgressBar: true,
                  closeButton: false
                }
              );
            } else {
              return onSubmitMyAccount(data)
                .then(() =>
                  history.push(
                    `/${selectedLanguage}/my-account/personal-settings` +
                      "?success=true&action=edit&object=profile"
                  )
                )
                .catch(() =>
                  history.push(
                    `/${selectedLanguage}/my-account/personal-settings` +
                      "?success=false&action=edit&object=profile"
                  )
                );
            }
          }}
          onCancel={e => {
            e.preventDefault();
            history.push(`/${selectedLanguage}`);
          }}
          className="my-account-form"
        />
      </PersonalSettingDiv>
    );
  }
}

export default withTranslation()(PersonalSettings);
