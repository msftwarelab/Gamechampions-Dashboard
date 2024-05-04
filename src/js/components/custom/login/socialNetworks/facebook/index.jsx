import React from "react";
import FacebookLogin from "react-facebook-login";
import { FlexBox } from "~components/atoms";
import { withTheme } from "styled-components";
import { useTranslation } from "react-i18next";

const FacebookLoginButton = ({
  onFacebookLogin,
  theme,
  onFailure,
  onClick,
  isMobile
}) => {
  const { t } = useTranslation();
  return (
    <FlexBox margin="1em 0" justifyContent="center">
      <FacebookLogin
        disableMobileRedirect={true}
        isMobile={isMobile}
        appId={process.env.FACEBOOK_APP_ID}
        fields="name,email,picture,birthday"
        cssClass="btnFacebook"
        icon="fa-facebook"
        textButton={
          <FlexBox margin="10px" fontWeight={theme.fonts.bold} fontSize="1.1em">
            {t("LoginWithFacebook")}
          </FlexBox>
        }
        onClick={onClick}
        onFailure={onFailure}
        callback={onFacebookLogin}
      />
    </FlexBox>
  );
};

export default withTheme(FacebookLoginButton);
