import React from "react";
import DynamicForm from "../../molecules/dynamicForm";
import {
  getProfileFormFields,
  ProfileFormTypes
} from "~containers/myaccount/constants";
import { submitChangePassword } from "~containers/myaccount/actions";
import { ChangePasswordDiv } from "./changePasswordStyled";
import { useTranslation } from "react-i18next";

const ChangePassword = ({ match, history, profile, selectedLanguage }) => {
  const { t } = useTranslation();
  return (
    <ChangePasswordDiv>
      <h2>{t("ChangePasswordTitle")}</h2>
      <DynamicForm
        action={match.url}
        formFields={getProfileFormFields({
          formType: ProfileFormTypes.EditPassword
        })}
        onSubmit={e => {
          const data = { ...e };
          data.id = profile.get("id");
          data.role = profile.get("role");
          data.email = profile.get("email");
          return submitChangePassword(data)
            .then(() =>
              history.push(
                `/${selectedLanguage}?success=true&action=view&object=password`
              )
            )
            .catch(() =>
              history.push(
                `/${selectedLanguage}?success=false&action=view&object=password`
              )
            );
        }}
        onCancel={e => {
          e.preventDefault();
          history.push(`/${selectedLanguage}`);
        }}
      />
    </ChangePasswordDiv>
  );
};

export default ChangePassword;
