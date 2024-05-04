import React, { useEffect } from "react";
import { connect } from "react-redux";
import { styled, withTheme } from "~theme";
import Banner from "~components/molecules/banner";
import TabsBar from "./tabsBar";
import BonusCashNavWelcome from "~components/custom/bonusPromotions/bonusCashNavWelcome";
import { getGamerTag } from "~service/matches/adapter";
import { getRotatingBanners } from "~containers/games/actions";
import { selectRotatingBanners } from "~containers/games/reducer";

const GameLobby = ({
  game,
  gameId,
  isTournament,
  theme,
  selectedLanguage,
  profile,
  tournament,
  createChallengeUrl,
  isMobile,
  getGameLobbyEnabledTabs,
  websiteUrl,
  rotatingBanners,
  onLoadRotatingBanners
}) => {
  const { gameLobbyTheme } = theme;
  const { gameLobbyBannerTheme } = gameLobbyTheme;
  const platForm =
    game && profile ? getGamerTag(profile.toJS(), game.get("gameType")) : null;

  useEffect(() => {
    onLoadRotatingBanners({ selectedLanguage });
  }, []);

  return (
    <>
      {game && (
        <>
          {!profile.get("hasPlayerMadeFirstDeposit") && (
            <BonusCashNavWelcome selectedLanguage={selectedLanguage} />
          )}
          <BannerStyle>
            {platForm.value && (
              <Banner
                title={game.get("title")}
                platform={game.get("platform")}
                imageUrl={game.get("bannerImageUrl")}
                bannerTheme={gameLobbyBannerTheme}
                tournament={tournament}
                createChallengeUrl={createChallengeUrl}
                banners={game.get("banners").toJS()}
                websiteUrl={websiteUrl}
                selectedLanguage={selectedLanguage}
              />
            )}
            {!platForm.value && (
              <Banner
                title={game.get("title")}
                platform={game.get("platform")}
                imageUrl={game.get("bannerImageUrl")}
                ctaUrl={`/${selectedLanguage}/my-account/gamer-tags`}
                ctaText={`Add ${platForm.id} tag`}
                bannerTheme={gameLobbyBannerTheme}
                tournament={tournament}
                createChallengeUrl={createChallengeUrl}
                websiteUrl={websiteUrl}
                selectedLanguage={selectedLanguage}
              />
            )}
          </BannerStyle>
        </>
      )}
      <TabsBar
        getGameLobbyEnabledTabs={getGameLobbyEnabledTabs}
        selectedLanguage={selectedLanguage}
        gameId={gameId}
        isTournament={isTournament}
        isMobile={isMobile}
      />
    </>
  );
};

const mapStateToProps = state => ({
  rotatingBanners: selectRotatingBanners(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadRotatingBanners: data => dispatch(getRotatingBanners(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(GameLobby));

const BannerStyle = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
`;
