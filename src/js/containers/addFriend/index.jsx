import React from "react";
import { connect } from "react-redux";

import Modal from "../../components/modal/modal";
import { submitSendInvite, fetchAddFriend, getReferrerId } from "./actions";
import { selectProfile } from "../myaccount/reducer";
import { selectReferrerId } from "./reducer";
import { getPage } from "../page/actions";
import { withPage } from "~hocs";
import Card from "~components/card/card";
import DynamicForm from "~components/molecules/dynamicForm";
import { FORM_FIELDS, REDUCER_NAME, WEBSITE_URL } from "./constants";
import { ShareThisLinks } from "~components/custom/shareThisLinks";
import { getProfile } from "~containers/myaccount/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";

class AddFriend extends React.PureComponent {
  componentDidMount() {
    const { profile, onLoadProfile, onLoadReferrerId } = this.props;

    if (profile && profile.get("id")) {
      onLoadReferrerId({ userId: profile.get("id") });
    } else {
      onLoadProfile().then(response =>
        onLoadReferrerId({ userId: response.id })
      );
    }
  }

  render() {
    const { page, match, history, profile } = this.props;

    const returnUrl = this.props.location.state.returnUrl;

    return (
      <Modal>
        <Card
          title={page.get("title")}
          html={page.get("html")}
          buttons={page.buttons}
          className="add-friend"
          cardClassName="fullscreen"
          closeUrl={returnUrl}
        >
          {profile && (
            <DynamicForm
              action={match.url}
              className="add-friend-form"
              formFields={FORM_FIELDS}
              submitButtonLabel="ButtonDynamicFormAddFriend"
              onSubmit={e => {
                const data = { ...e };
                data.userId = profile.get("id");
                return submitSendInvite(data)
                  .then(() =>
                    history.push(
                      returnUrl + "?success=true&action=send&object=email"
                    )
                  )
                  .catch(() =>
                    history.push(
                      returnUrl + "?success=false&action=send&object=email"
                    )
                  );
              }}
            />
          )}
          <div className="sharethis">
            <ShareThisLinks url={WEBSITE_URL} />
          </div>
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(
      fetchAddFriend({
        pageData: {
          url,
          language
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  profile: selectProfile(state),
  referrerId: selectReferrerId(state),
  selectedLanguage: selectSelectedLanguage(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadReferrerId: data => dispatch(getReferrerId(data)),
  onLoadProfile: () => dispatch(getProfile())
});

export default withPage(
  connect(mapStateToProps, mapDispatchToProps)(AddFriend),
  getPage,
  REDUCER_NAME
);
