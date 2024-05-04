import React from "react";
import { styled, media } from "~theme";
import GamesList from "~components/custom/games/gamesList";
import GlobalChat from "~containers/globalChat/globalChat";
import Banner from "~components/molecules/banner";
import MainWrapper from "~components/custom/mainWrapper";
import { FlexBox, Button, Paragraph } from "~components/atoms";
import { useTranslation } from "react-i18next";
import BonusCashNavProgress from "~components/custom/bonusPromotions/bonusCashNavProgress";
import BonusCashNavWelcome from "~components/custom/bonusPromotions/bonusCashNavWelcome";
import { useTheme } from "styled-components";
import Footer from "~components/custom/footer";

const HomeComponent = ({
  games,
  selectedLanguage,
  isMobile,
  isGlobalChatEnabled,
  websiteUrl,
  playerBonusCampaignStatus,
  dashboardFooter,
  profile,
  rotatingBanners
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <MainWrapper>
      {!profile.get("hasPlayerMadeFirstDeposit") && (
        <BonusCashNavWelcome selectedLanguage={selectedLanguage} />
      )}
      {playerBonusCampaignStatus && (
        <FlexBox
          display={{ base: "flex", lg: "none" }}
          margin="0 0 1em 0"
          width="100%"
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
      {games && games.size > 0 && (
        <Banner
          title={games.get(0).get("title")}
          summary={games.get(0).get("summary")}
          imageUrl={games.get(0).get("bannerImageUrl")}
          websiteUrl={websiteUrl}
          rotatingBanners={rotatingBanners}
          banners={games
            .get(0)
            .get("banners")
            .toJS()}
        />
      )}
      <WrapperStyle>
        {!isMobile && (
          <Button
            to={`/${selectedLanguage}/global-chat`}
            display={{ base: "inline-block", md: "none" }}
            margin="1em 0"
            width="100%"
            color={theme.colors.secondary}
            backgroundColor={theme.colors.white}
            visitedColor={theme.colors.secondary}
            hoverColor={theme.colors.white}
            hoverBackgroundColor={theme.colors.primary}
          >
            {t("OpenChat")}
          </Button>
        )}
        <GamesStyle>
          <Paragraph
            margin="2rem 0 1.5rem 0.5rem"
            fontSize={{ base: "1.4rem", md: "1.8rem" }}
            fontWeight="bold"
            color={theme.colors.secondFontColor}
          >
            {t("GamesAvailable")}
          </Paragraph>
          <ListStyle>
            <GamesList games={games} selectedLanguage={selectedLanguage} />
          </ListStyle>
        </GamesStyle>
        {isGlobalChatEnabled && (
          <FlexBox
            display={{ base: "none", md: "flex" }}
            flex={1}
            height="100%"
          >
            <GlobalChat />
          </FlexBox>
        )}
      </WrapperStyle>

      <Footer
        dashboardFooter={dashboardFooter}
        selectedLanguage={selectedLanguage}
      />
    </MainWrapper>
  );
};

const GamesStyle = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  margin: 0;
`;
const WrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  ${media.md`
    flex-direction: row;
  `};
`;
const ListStyle = styled.div`
  display: flex;
  padding: 0;
  overflow: scroll;
  flex-direction: column;
`;

export default HomeComponent;
