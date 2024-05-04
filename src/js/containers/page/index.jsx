import React from "react";

import Card from "../../components/card/card";
import { withPage } from "~hocs";
import { fetchPage, getPage } from "./actions";
import * as CONSTANTS from "./constants";

class Page extends React.PureComponent {
  render() {
    const { title, html, buttons, images } = this.props.combinedPage.page;

    return (
      <section className="content">
        {!!images && images.length && (
          <section className="banner">
            {
              <img
                src={images[0].src}
                alt={images[0].alt}
                srcSet={images.map(n => `${n.src} ${n.width}w`)}
              />
            }
          </section>
        )}
        {!!html && <Card title={title} html={html} buttons={buttons} />}
      </section>
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(fetchPage({ url, language }, CONSTANTS.REDUCER_NAME));
  }
}

export default withPage(Page, getPage, CONSTANTS.REDUCER_NAME);
