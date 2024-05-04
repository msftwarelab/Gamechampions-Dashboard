import React from "react";
import { connect } from "react-redux";
import { fetchLanguages, setLanguage, updateLanguage } from "./actions";
import { selectLanguages, selectSelectedLanguage } from "./reducer";
import { withRouter } from "react-router-dom";
import { fetchNavigation } from "~containers/navigation/actions";
import { selectAuth } from "~containers/app/reducer";
import LanguageSelectorDropdown from "~components/custom/multiLanguage";
import { CURRENT_LANGUAGE, DEFAULT_FLAG } from "./constants";
import hoistStatics from "hoist-non-react-statics";
import { withTranslation } from "react-i18next";
import { getGamesAndRules } from "~containers/createChallenge/actions";

class LanguageSelector extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentLanguage: CURRENT_LANGUAGE,
      openDropdown: false
    };

    this.toggling = this.toggling.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  toggling() {
    const { openDropdown } = this.state;
    this.setState({ openDropdown: !openDropdown });
  }

  changeLanguage(value) {
    const {
      i18n,
      onSetSelectedLanguage,
      reLoadNavigation,
      authentication,
      history,
      onUpdateLanguageSession,
      onLoadGamesAndRules
    } = this.props;
    const { currentLanguage } = this.state;
    const { title } = value;

    this.setState({
      openDropdown: false,
      currentLanguage: title
    });
    const previouslanguagevalue = "/" + currentLanguage;
    i18n.changeLanguage(title);
    onSetSelectedLanguage(title);
    onLoadGamesAndRules({ language: title });
    let url = window.location.pathname;
    url = url.replace(previouslanguagevalue, "/" + title);
    const { role } = authentication.toJS();
    reLoadNavigation({ role, language: title });
    history.push(url);
    onUpdateLanguageSession({
      code: title
    });
  }

  componentDidMount() {
    const {
      languages,
      onLoadLanguages,
      selectedLanguage,
      onSetSelectedLanguage
    } = this.props;
    this.setState({ currentLanguage: selectedLanguage });

    if (languages.size == 0) {
      onLoadLanguages();
    }

    if (!selectedLanguage) {
      onSetSelectedLanguage(selectedLanguage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { i18n } = this.props;
    const { currentLanguage } = this.state;

    if (prevState.currentLanguage !== this.state.currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }

  render() {
    const {
      languages,
      selectedLanguage,
      authentication,
      showOnMobile = false,
      isDirectionTop = false
    } = this.props;
    const { openDropdown } = this.state;
    const language =
      languages && languages.toJS().find(x => x.title === selectedLanguage);
    return (
      <LanguageSelectorDropdown
        currentFlag={(language && language.flagPath) || DEFAULT_FLAG}
        openDropdown={openDropdown}
        currentLanguage={selectedLanguage}
        options={languages}
        changeLanguage={this.changeLanguage}
        toggling={this.toggling}
        authentication={authentication}
        showOnMobile={showOnMobile}
        isDirectionTop={isDirectionTop}
      />
    );
  }
}

const mapStateToProps = state => ({
  languages: selectLanguages(state),
  authentication: selectAuth(state),
  selectedLanguage: selectSelectedLanguage(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadLanguages: () => dispatch(fetchLanguages()),
  onSetSelectedLanguage: data => dispatch(setLanguage(data)),
  reLoadNavigation: data => dispatch(fetchNavigation(data)),
  onUpdateLanguageSession: data => dispatch(updateLanguage(data)),
  onLoadGamesAndRules: data => dispatch(getGamesAndRules(data))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hoistStatics(withTranslation()(LanguageSelector), LanguageSelector))
);
