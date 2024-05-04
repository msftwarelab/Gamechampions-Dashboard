import React from "react";
import { useTranslation } from "react-i18next";
import { Dot } from "../chat/friendChat/header/dot";
import { Loader, Span } from "~components/atoms";
import { withTheme } from "styled-components";

const FriendsList = ({
  friends,
  onFriendClick,
  handleScroll,
  isLoading,
  theme
}) => {
  const { t } = useTranslation();
  return (
    <section className="friends-list__wrapper" onScroll={handleScroll}>
      <ul className="friends-list">
        {friends && friends.size > 0 ? (
          friends.map(n => {
            return (
              <li key={n.get("id")}>
                <div
                  className={
                    "friends-list__item" +
                    (n.get("isSelected") ? " friends__item--selected" : "")
                  }
                  onClick={() => onFriendClick(n)}
                >
                  <div className="friends-list__item__thumbnail">
                    <img
                      key={n.get("userName")}
                      src={n.get("iconUrl")}
                      alt="Profile icon"
                    />
                    {n.get("isOnline") && (
                      <span className="friends-list--online"></span>
                    )}
                  </div>
                  <Span
                    fontWeight={n.get("hasUnreadMessages") ? "bold" : "inherit"}
                    color={theme.colors.black}
                  >
                    {n.get("userName")}
                  </Span>
                  <div className="friends-list--dot">
                    {n.get("hasUnreadMessages") && <Dot />}
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <span className="friends-list--empty">{t("NoPlayerFound")}</span>
        )}
      </ul>
      {isLoading && (
        <Loader
          isLoading={true}
          height="4em"
          alignItems="center"
          scale="3rem"
        />
      )}
    </section>
  );
};

export default withTheme(FriendsList);
