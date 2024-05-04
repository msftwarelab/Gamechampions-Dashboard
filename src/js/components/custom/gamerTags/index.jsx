import React from "react";
import DynamicForm from "../../molecules/dynamicForm";
import { FORM_FIELDS_GAMERTAGS } from "~containers/myaccount/constants";
import { submitGamerTags } from "~containers/myaccount/actions";
import { GamerTagsDiv } from "./gamerTagsStyled";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

class GamerTags extends React.PureComponent {
  render() {
    const {
      match,
      history,
      profile,
      boyProfile,
      t,
      selectedLanguage,
      onSubmitGamerTags
    } = this.props;

    return (
      <GamerTagsDiv>
        <h2>{t("GamerTagsTitle")}</h2>
        <DynamicForm
          action={match.url}
          formFields={FORM_FIELDS_GAMERTAGS({
            ...(profile && profile.toJS()),
            isBoyProfileExist: boyProfile ? true : false,
            epicId:
              boyProfile && boyProfile.get("epicDisplayName")
                ? boyProfile.get("epicDisplayName")
                : null,
            isVerified:
              boyProfile && boyProfile.get("isVerified")
                ? boyProfile.get("isVerified")
                : false
          })}
          initialValues={profile && profile.toJS()}
          onSubmit={e => {
            const data = { ...e };
            data.id = profile.get("id");
            return onSubmitGamerTags(data)
              .then(() =>
                history.push(
                  `/${selectedLanguage}` +
                    "?success=true&action=save&object=Gamertags"
                )
              )
              .catch(() =>
                history.push(
                  `/${selectedLanguage}` +
                    "?success=false&action=save&object=Gamertags"
                )
              );
          }}
          onCancel={e => {
            e.preventDefault();
            history.push(`/${selectedLanguage}`);
          }}
          className="gamer-tags-form"
        />
      </GamerTagsDiv>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmitGamerTags: data => dispatch(submitGamerTags(data))
});

export default connect(null, mapDispatchToProps)(withTranslation()(GamerTags));
