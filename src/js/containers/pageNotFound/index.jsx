import React from "react";
import { connect } from "react-redux";

import Card from "../../components/card/card";
import { fetchPageNotFound } from "./actions";
import { selectTitle, selectHtml } from "./reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";

const URL = "/en/page-not-found";

class PageNotFound extends React.PureComponent {
  componentDidMount() {
    const { onLoadPageNotFound, title, selectedLanguage } = this.props;
    if (!title) {
      onLoadPageNotFound({ url: URL, language: selectedLanguage });
    }
  }

  // returns the JSX that will be rendered for this component
  render() {
    const { title, html } = this.props;
    return (
      <section className="pageNotFound">
        {!!html && (
          <section className="content">
            <Card title={title} html={html} />
          </section>
        )}
      </section>
    );
  }

  static fetchData(store) {
    return store.dispatch(fetchPageNotFound({ url: URL }));
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => ({
  title: selectTitle(state),
  html: selectHtml(state),
  selectedLanguage: selectSelectedLanguage(state)
});

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    onLoadPageNotFound: data => dispatch(fetchPageNotFound(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageNotFound);
