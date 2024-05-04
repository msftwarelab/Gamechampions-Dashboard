import React from "react";
import DynamicForm from "../../molecules/dynamicForm";
import {
  BANK_FORM_TYPES,
  getBankDetailsFields
} from "~containers/myaccount/constants";
import { DetailsDiv } from "./bankDetailsStyled";
import { withTranslation } from "react-i18next";

class BankDetails extends React.PureComponent {
  render() {
    const {
      match,
      history,
      profile,
      t,
      selectedLanguage,
      countries,
      onSubmitMyBankDetails
    } = this.props;

    const formFields = getBankDetailsFields({
      formType: BANK_FORM_TYPES.ALL,
      ...(profile && profile.toJS())
    });

    formFields.forEach(x => {
      if (x.name === "country" || x.name === "bankCountry") {
        x.options = countries.toJS ? countries.toJS() : countries;
      }
    });

    return (
      <>
        <DetailsDiv>
          <h2>{t("BankDetailsTitle")}</h2>
          <DynamicForm
            displayButtons={
              !(
                profile &&
                profile.get("bankName") &&
                profile.get("iban") &&
                profile.get("swiftBic")
              )
            }
            action={match.url}
            formFields={formFields}
            initialValues={profile && profile.toJS()}
            onSubmit={e => {
              const data = { ...e };
              data.userId = profile.get("id");
              data.role = profile.get("role");
              data.email = profile.get("email");
              return onSubmitMyBankDetails(data)
                .then(() =>
                  history.push(
                    `/${selectedLanguage}?success=true&action=view&object=profile`
                  )
                )
                .catch(() =>
                  history.push(
                    `/${selectedLanguage}?success=false&action=view&object=profile`
                  )
                );
            }}
            onCancel={e => {
              e.preventDefault();
              history.push(`/${selectedLanguage}`);
            }}
            className="bank-details-form"
          />
        </DetailsDiv>
      </>
    );
  }
}

export default withTranslation()(BankDetails);
