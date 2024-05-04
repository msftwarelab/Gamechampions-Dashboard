import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "./actions";
import { resetProfile } from "../myaccount/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import configuration from "~config";

const WEBSITE_URL = `${configuration.websiteUrl}`;

class Logout extends React.PureComponent {
  constructor(props) {
    super(props);

    const { onResetProfile, onLogout, selectedLanguage } = this.props;

    onResetProfile();
    onLogout();

    if (window) {
      window.location.href = `${WEBSITE_URL}/${selectedLanguage}`;
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  selectedLanguage: selectSelectedLanguage(state)
});
// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => ({
  onResetProfile: () => dispatch(resetProfile()),
  onLogout: () => dispatch(logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
