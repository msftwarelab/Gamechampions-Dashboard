import { toPlayerProfile, toAdminProfile } from "~service/self/adapter";

import { ROLES } from "~service/constants";

export const toAuthenticateJson = data => {
  if (data) {
    return {
      tokenDurationMinutes: data.ttl,
      email: data.userName.trim(),
      password: data.password
    };
  }
  return null;
};

export const toFacebookAuthenticateJson = data => {
  if (data) {
    return {
      tokenDurationMinutes: data.ttl,
      facebookId: data.id,
      email: data.email,
      name: data.name,
      dateOfBirth: data.birthday,
      profilePic: data.picture
    };
  }
  return null;
};

export const toAuthenticate = data => {
  if (data) {
    const { authenticationToken, profile } = data;

    let obj = {
      authentication: {
        ...authenticationToken,
        role: profile.role,
        profileId: profile.id
      }
    };

    switch (profile.role) {
      case ROLES.ADMIN:
        obj.profile = toAdminProfile(profile);
        break;
      case ROLES.PLAYER:
        obj.profile = toPlayerProfile(profile);
        break;
      default:
        break;
    }

    return obj;
  }
  return null;
};

export const toRefreshTokenJson = data => {
  if (data) {
    return {
      ttl: data.ttl,
      refreshToken: data.refreshToken
    };
  }
  return null;
};

export const toRefreshToken = data => {
  if (data) {
    return data;
  }
  return null;
};

export const toForgotPasswordJson = data => {
  if (data) {
    return {
      email: encodeURIComponent(data.email)
    };
  }
};

export const toResetPassword = data => {
  if (data) {
    return {
      email: data.email,
      id: data.id,
      role: data.role
    };
  }
};

export const toResetPasswordJson = data => {
  if (data) {
    return {
      profileId: data.id,
      email: data.email,
      role: data.role,
      password: data.password
    };
  }
};

export const toChangePasswordJson = data => {
  if (data) {
    return {
      profileId: data.id,
      password: data.password,
      role: data.role,
      email: data.email
    };
  }
};

export const toCreateMyAccountJson = data => {
  if (data) {
    return {
      email: data.email,
      userName: data.userName,
      fullName: data.fullName,
      country: data.country,
      dateOfBirth: data.dateOfBirth,
      passwordHash: data.password,
      acceptedTaC: data.acceptedTaC
    };
  }
};
