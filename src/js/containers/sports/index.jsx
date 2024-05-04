import React from "react";
import { connect } from "react-redux";
import { FlexBox, Loader } from "~components/atoms";
import HomeComponent from "~components/custom/games/home";
import {
  selectAuth,
  selectBrandConfig,
  selectGlobalChatConfig,
  selectIsMobile
} from "~containers/app/reducer";
import { getDashboardFooter } from "~containers/boyGameLobby/actions";
import { selectDashboardFooter } from "~containers/boyGameLobby/reducer";
import {
  fetchGames,
  getGames,
  getTournament,
  getRotatingBanners
} from "~containers/games/actions";
import { PAGE_SIZE_VALUE, REDUCER_NAME } from "~containers/games/constants";
import {
  selectGames,
  selectIsLoading,
  selectTournament,
  selectRotatingBanners
} from "~containers/games/reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { getPlayerBonusCampaignStatus } from "~containers/myaccount/actions";
import {
  selectPlayerBonusCampaignStatus,
  selectProfile
} from "~containers/myaccount/reducer";
import { getPage } from "~containers/page/actions";
import { withAuth, withPage } from "~hocs";
import {
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME
} from "~service/constants";
import { getParameterByName } from "../../util/util";

class Sports extends React.PureComponent {
  componentDidMount() {
    const {
      games,
      authentication,
      selectedLanguage,
      onLoadGames,
      onLoadTournament,
      onGetPlayerBonusCampaignStatus,
      onGetDashboardFooter,
      onLoadRotatingBanners
    } = this.props;

    if (games && games.size) {
      let gameId = games.get(0).get("id");
      onLoadTournament({ gameId: gameId, language: selectedLanguage });
    }

    if (!(games && games.size)) {
      onLoadGames({
        page: getParameterByName(PAGE_QUERY_PARAM_NAME, location.search) || 1,
        pageSize:
          getParameterByName(PAGE_SIZE_QUERY_PARAM_NAME, location.search) ||
          PAGE_SIZE_VALUE
      }).then(response => {
        onLoadTournament({
          gameId: response.get(0).get("id"),
          language: selectedLanguage
        });
      });
    }

    onLoadRotatingBanners({ selectedLanguage });

    onGetPlayerBonusCampaignStatus({
      playerId: authentication.get("profileId")
    });
    onGetDashboardFooter({ selectedLanguage });
  }

  render() {
    const {
      isLoading,
      games,
      selectedLanguage,
      isMobile,
      tournament,
      globalChatConfig,
      brandConfig,
      playerBonusCampaignStatus,
      dashboardFooter,
      profile,
      rotatingBanners
    } = this.props;

    if (isLoading) {
      return (
        <FlexBox
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Loader
            isLoading={true}
            height="4em"
            alignItems="center"
            scale="6rem"
          />
        </FlexBox>
      );
    }

    return (
      <HomeComponent
        playerBonusCampaignStatus={
          playerBonusCampaignStatus && playerBonusCampaignStatus.toJS()
        }
        isGlobalChatEnabled={
          globalChatConfig.get("isEnabled") &&
          globalChatConfig.get("isHomeChatEnabled")
        }
        games={games}
        selectedLanguage={selectedLanguage}
        tournament={tournament}
        rotatingBanners={rotatingBanners}
        isMobile={isMobile}
        websiteUrl={brandConfig.get("websiteUrl")}
        dashboardFooter={dashboardFooter}
        profile={profile}
      />
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(
      fetchGames({
        pageData: {
          url,
          language
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  games: selectGames(state),
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  authentication: selectAuth(state),
  isMobile: selectIsMobile(state),
  tournament: selectTournament(state),
  globalChatConfig: selectGlobalChatConfig(state),
  brandConfig: selectBrandConfig(state),
  playerBonusCampaignStatus: selectPlayerBonusCampaignStatus(state),
  profile: selectProfile(state),
  dashboardFooter: selectDashboardFooter(state),
  rotatingBanners: selectRotatingBanners(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadGames: data => dispatch(getGames(data)),
  onLoadTournament: data => dispatch(getTournament(data)),
  onLoadRotatingBanners: data => dispatch(getRotatingBanners(data)),
  onGetPlayerBonusCampaignStatus: data =>
    dispatch(getPlayerBonusCampaignStatus(data)),
  onGetDashboardFooter: data => dispatch(getDashboardFooter(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(Sports),
    getPage,
    REDUCER_NAME
  )
);
