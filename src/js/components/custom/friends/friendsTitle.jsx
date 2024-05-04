import React from "react";
import { FRIENDS_LOGO } from "~containers/friends/constants";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FriendsTitle = ({ selectedLanguage }) => {
  const { t } = useTranslation();
  return (
    <div className="friends-title">
      <img src={FRIENDS_LOGO}></img>
      <span>{t("MyFriendsListTitle")}</span>
      <Link
        className="friend__add"
        to={{
          pathname: `/${selectedLanguage}/add-friend`,
          state: {
            returnUrl: `/${selectedLanguage}`
          }
        }}
      >
        <img src="/img/icons/ic_plus_symbol-24px.svg" alt="Add friend"></img>
      </Link>
      <Link
        className="friend__add_mobile"
        to={{
          pathname: `/${selectedLanguage}/add-friend`,
          state: {
            returnUrl: `/${selectedLanguage}/friends`
          }
        }}
      >
        <img src="/img/icons/ic_plus_symbol-24px.svg" alt="Add friend"></img>
      </Link>
    </div>
  );
};

export default FriendsTitle;
