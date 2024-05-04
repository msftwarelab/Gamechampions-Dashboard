import React from "react";
import { useHistory } from "react-router-dom";
import ProfileIcon from "~components/profile/profileIcon";
import HeaderWallet from "~components/custom/wallet/headerWallet";
import { FlexBox, Image, Link } from "~components/atoms";
import LanguageSelector from "~containers/multiLanguage";
import { toPriceString } from "~service/adapter";
import BonusCashNavProgress from "~components/custom/bonusPromotions/bonusCashNavProgress";
import GlobalChat from "./globalChat";

const Header = ({
  logo,
  mobile_logo,
  onHamburgerClick,
  profileData,
  selectedLanguage,
  availableAmount,
  playerBonusCampaignStatus,
  isGlobalChatEnabled,
  isMobile
}) => {
  const history = useHistory();
  const profile = {
    src: profileData.get("profileImage")
      ? profileData.get("profileImage")
      : "img/icons/ic_account_circle-24px.svg",
    toUrl: `/${selectedLanguage}/my-account/personal-settings`,
    alt: process.env.NAME,
    title: process.env.NAME
  };

  const logo_img = isMobile ? mobile_logo : logo;

  return (
    <header className="header">
      <div className="header__title">
        {process.env.SHOW_HEADER_LOGO && (
          <div className="header__logo header__logo--desktop">
            <Link to={`/${selectedLanguage}/arena`}>
              <img
                src={logo_img.src}
                title={logo_img.title}
                alt={logo_img.alt}
                className="header__logo__img"
              />
            </Link>
          </div>
        )}
        <button
          onClick={onHamburgerClick}
          className="header__title__hamburger"
        />
      </div>
      {process.env.SHOW_HEADER_LOGO && (
        <div className="header__logo">
          <Link to={`/${selectedLanguage}/arena`}>
            <img
              src={logo_img.src}
              title={logo_img.title}
              alt={logo_img.alt}
              className="header__logo__img"
            />
          </Link>
        </div>
      )}

      {playerBonusCampaignStatus && (
        <FlexBox
          display={{ base: "none", lg: "flex" }}
          width="100%"
          margin="0 1.5em"
          justifyContent="center"
        >
          <BonusCashNavProgress
            selectedLanguage={selectedLanguage}
            currentBonusBets={playerBonusCampaignStatus.currentBonusBets}
            targetBonusBets={playerBonusCampaignStatus.targetBonusBets}
            bonusAmount={playerBonusCampaignStatus.bonusAmount}
          />
        </FlexBox>
      )}

      <FlexBox className="header__icons">
        <HeaderWallet
          url={`/${selectedLanguage}/wallet`}
          availableAmount={toPriceString(
            availableAmount,
            profileData.get("currency")
          )}
        />
        <ProfileIcon
          src={profile.src}
          url={profile.toUrl}
          profileName={profileData.get("userName")}
        />
        <Image src="/img/support.svg" className="tidio-livechat-button" />
        <Link
          to={`/${selectedLanguage}/offers`}
          alignItems="center"
          display="flex"
        >
          <Image src="/img/offer.svg" />
        </Link>
        <Link
          to={{
            pathname: `/${selectedLanguage}/global-chat`,
            state: { returnUrl: history.location.pathname }
          }}
          alignItems="center"
          display="flex"
        >
          <Image src="/img/chat.svg" className="mobile-chat-button" />
        </Link>
        <LanguageSelector />
        {isGlobalChatEnabled && isMobile && (
          <GlobalChat lan={selectedLanguage} />
        )}
      </FlexBox>
    </header>
  );
};

export default Header;
