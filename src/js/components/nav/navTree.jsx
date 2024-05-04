import React from "react";

import NavTreeItem from "./navTreeItem";

const NavTree = ({
  nav,
  onLinkClick,
  isMenuOpen,
  isMobile,
  numOfUnreadMessages,
  numOfOngoingMatches
}) => {
  // This object maps a relation between the id of the nav item and the number of notifications associated to it
  const notifications = {
    7: numOfUnreadMessages,
    5: numOfOngoingMatches
  };

  let children = [];
  if (nav.children) {
    children = nav.children.map((item, index) => {
      const mobileIcon = item.get("icon");
      let desktopIcon = item.get("iconDesktop");
      if (!desktopIcon) desktopIcon = mobileIcon;
      return (
        <li className="nav__item" key={index}>
          <NavTreeItem
            name={item.get("name")}
            url={item.get("url")}
            icon={isMobile ? mobileIcon : desktopIcon}
            isActive={item.get("isActive")}
            isExternal={item.get("isExternal")}
            onClick={onLinkClick}
            isMenuOpen={isMenuOpen}
            notifications={notifications[item.get("id")]}
            newlyAdded={item.get("name") === "STREAMS"}
          />
        </li>
      );
    });
  }

  return (
    <ul className="nav__list">
      <li className="nav__item">
        <NavTreeItem
          name={nav.name}
          url={nav.url}
          icon={nav.icon}
          isActive={nav.isActive}
          isExternal={nav.isExternal}
          onClick={onLinkClick}
          isMenuOpen={isMenuOpen}
          newlyAdded={nav.name === "STREAMS"}
        />
      </li>
      {children}
    </ul>
  );
};

export default NavTree;
