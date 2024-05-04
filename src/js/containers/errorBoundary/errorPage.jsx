import React from "react";

const ErrorPage = () => (
  <section className="error-page">
    <div className="error-page__content">
      <div className="error-page__logo">
        <img
          className="error-page__img"
          src="/img/icons/broken_icon.svg"
          title="Game Champions"
          alt="Game Champions"
        />
      </div>
      <div className="error-page__title">
        <h1>Unexpected Error</h1>
      </div>
      <div className="error-page__message">
        <p>
          Unfortunately the website encountered an error. Please try again
          later.
        </p>
        <p />
        <p>Game Champions</p>
      </div>
    </div>
  </section>
);

export default ErrorPage;
