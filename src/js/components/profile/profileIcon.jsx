import React from "react";
import { Link } from "react-router-dom";

import { withRole } from "~hocs";
import { ROLES } from "~service/constants";
import { ProfileDiv, ProfileName } from "./profileIconStyled";

const ProfileIcon = ({ src, url, profileName }) => {
  return (
    <Link to={url}>
      <ProfileDiv>
        <i>
          <img className="header__profile__img" src={src} />
        </i>
        <ProfileName>{profileName}</ProfileName>
      </ProfileDiv>
    </Link>
  );
};

ProfileIcon.Roles = [ROLES.PARTNER];

export default withRole(ProfileIcon);
