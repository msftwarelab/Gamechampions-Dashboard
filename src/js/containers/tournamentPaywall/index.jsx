import React from "react";
import { connect } from "react-redux";
import { selectIsMobile } from "~containers/app/reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import TournamentPaywallComponent from "~components/custom/tournaments/paywall";

const TournamentPaywall = ({ selectedLanguage, history, match }) => {
  return (
    <TournamentPaywallComponent
      selectedLanguage={selectedLanguage}
      history={history}
      match={match}
    />
  );
};

const mapStateToProps = state => ({
  selectedLanguage: selectSelectedLanguage(state),
  isMobile: selectIsMobile(state)
});

export default connect(mapStateToProps)(TournamentPaywall);
