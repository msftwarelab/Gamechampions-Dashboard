import React from "react";

import { Helmet } from "react-helmet";

const Meta = ({ meta, url }) => {
  let ogImage = <meta property="og:image" content="/img/linear_logo.svg" />;

  let imageSrc = <link rel="image_src" href="/img/linear_logo.svg" />;

  if (meta.get("thumbnail")) {
    ogImage = <meta property="og:image" content={meta.get("thumbnail")} />;
    imageSrc = <link rel="image_src" href={meta.get("thumbnail")} />;
  }
  return (
    <Helmet htmlAttributes={{ lang: "en", class: "no-js" }}>
      <meta charset="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />
      <title>{`${process.env.DESCRIPTION} ${
        meta.get("title") ? "- " + meta.get("title") : ""
      }`}</title>
      <meta name="description" content={meta.get("description")} />
      <meta name="keywords" content={meta.get("keywords")} />
      <meta
        property="og:title"
        content={`${process.env.DESCRIPTION} ${
          meta.get("title") ? "- " + meta.get("title") : ""
        }`}
      />
      <link rel="canonical" href={url} />
      {ogImage}
      {imageSrc}
      <meta name="theme-color" content="#fff" />
      <link rel="manifest" href="/manifest.json" />
      <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    </Helmet>
  );
};

export default Meta;
