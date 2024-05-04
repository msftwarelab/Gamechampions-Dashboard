/**
 * Route configuration
 * After receving routing configuration from the service (service/router),
 * Following configurations are merged into routing where we map relavent container,
 * authentication role, routing match, accessiblity as well as page type
 */

import Games from "~containers/games/";
import Page from "~containers/page/";
import Contact from "~containers/contact";
import Login from "~containers/login/";
import Logout from "~containers/logout/";
import AddFriend from "~containers/addFriend/";
import ResetPassword from "~containers/resetPassword/";
import ForgotPassword from "~containers/forgotPassword/";
import Friends from "~containers/friends/";
import PlayerDetails from "~containers/playerDetails";
import MatchDetails from "~containers/playerDetails/matchDetails";
import TransactionDetails from "~containers/myaccount/transactionDetails";
import BonusTransactionDetails from "~containers/myaccount/bonusTransactionDetails";
import MyAccount from "~containers/myaccount/";
import Matches from "~containers/matches/";
import Deposit from "~containers/deposit/";
// import Withdrawal from "~containers/withdrawal/"; // TODO: uncoment once original withdrawal is ready
import TemporaryWithdrawal from "~containers/withdrawal/temporayWithdrawal";
import GameLobby from "~containers/gameLobby/";
import RecentPlayers from "~containers/recentPlayers/";
import MatchMaking from "~containers/matchMaking/";
import GameLobbyChat from "~containers/gameLobbyChat/";
import LeaderBoards from "~containers/leaderBoards/";
import LeaderBoardsDetails from "~containers/leaderBoards/leaderBoardsDetails";
import CreateChallenge from "~containers/createChallenge";
import SendChallenge from "~containers/sendChallenge";
import Wallet from "~containers/wallet";
import Offers from "~containers/offers";
import GameRules from "~containers/gameRules/";
import MatchLobby from "~containers/matchLobby";
import MatchLobbyChat from "~containers/matchLobbyChat";
import ReportResults from "~containers/reportResults/";
import SetScoreAdvantage from "~containers/setScoreAdvantage/";
import Registration from "~containers/registration";
import Notifications from "~containers/notifications";
import Support from "~containers/support";
import Players from "~containers/players";
import PlayerWithdraw from "~containers/players/playerWithdraw";
import PlayerCredit from "~containers/players/playerCredit";
import PlayerCreditEnergy from "~containers/players/playerCreditEnergy";
import PlayerXp from "~containers/players/playerXp";
import PlayerBoyProfile from "~containers/players/playerBoyProfile";
import PlayerCreditBonus from "~containers/players/playerCreditBonus";
import PlayerBlock from "~containers/players/playerBlock";
import PlayerTransactions from "~containers/players/playerTransactions";
import PlayerBonusTransactions from "~containers/players/playerBonusTransactions";
import PlayerMatches from "~containers/players/playerMatches";
import PlayerDetailsAdmin from "~containers/players/playerDetails";
import AdminGameDetails from "~containers/gamesAdmin/gameDetails";
import GameLobbyChatWrapper from "~containers/gameLobbyChat";
import BonusCampaigns from "~containers/bonusCampaigns";
import CreateBonusCampaigns from "~containers/bonusCampaigns/create";
import BonusCampaignsDetails from "~containers/bonusCampaigns/details";
import AdminGames from "~containers/gamesAdmin";
import AdminMatches from "~containers/matchesAdmin";
import AdminMatchMaking from "~containers/matchesAdmin/matchMaking";
import Affiliates from "~containers/affiliates";
import CreateAffiliate from "~containers/affiliates/createAffiliate";
import AffiliateUrls from "~containers/affiliates/affiliateUrls";
import CreateAffiliateUrl from "~containers/affiliates/createAffiliateUrl";
import AffiliateReporting from "~containers/affiliates/affiliateReporting";
import Promotions from "~containers/promotions";
import CreatePromotion from "~containers/promotions/createPromotion";
import UpdatePromotion from "~containers/promotions/updatePromotion";
import AffiliatePromotions from "~containers/affiliates/affiliatePromotions";
import PromoteAffiliate from "~containers/affiliates/promoteAffiliate";
import UpdateAffiliate from "~containers/affiliates/updateAffiliate";
import UpdateAffiliateUrl from "~containers/affiliates/updateAffiliateUrl";
import PlayerReferral from "~containers/playerReferral";
import Tournaments from "~containers/tournaments";
import DuplicateIpsReport from "~containers/duplicateIpReport";
import DuplicateIpsReportDetail from "~containers/duplicateIpReport/details";
import Messages from "~containers/messages";
import TournamentInfo from "~containers/tournamentInfo";
import tournamentResults from "~containers/tournamentResults";
import TournamentPaywall from "~containers/tournamentPaywall";
import IosAddToHomeScreen from "~containers/iosA2hs";

import { ROLES } from "~service/constants";
import home from "~containers/home";
import sports from "~containers/sports";
import getBonus from "~containers/sportsGetBonus";

function getRouteList() {
  return [
    {
      name: "Games",
      exact: true,
      component: Games,
      fetchData: [Games.fetchData]
    },
    {
      name: "Home",
      exact: true,
      component: home,
      fetchData: [home.fetchData]
    },
    {
      name: "Sports",
      exact: true,
      component: sports,
      fetchData: [sports.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "GetBonus",
      exact: true,
      modal: true,
      component: getBonus,
      fetchData: [],
      roles: [ROLES.PLAYER]
    },
    {
      name: "LiveStats",
      exact: true,
      component: Games,
      fetchData: [Games.fetchData]
    },
    {
      name: "Page",
      exact: true,
      component: Page,
      fetchData: [Page.fetchData]
    },
    {
      name: "Contact",
      exact: true,
      component: Contact,
      fetchData: [Contact.fetchData],
      showBreadcrumbs: true,
      roles: [ROLES.PLAYER]
    },
    {
      name: "Login",
      exact: true,
      isPublic: true,
      component: Login,
      fetchData: [Login.fetchData]
    },
    {
      name: "Registration",
      exact: true,
      isPublic: true,
      component: Registration,
      fetchData: [Registration.fetchData]
    },
    {
      name: "Logout",
      exact: true,
      component: Logout,
      fetchData: []
    },
    {
      name: "ResetPassword",
      exact: true,
      isPublic: true,
      component: ResetPassword,
      fetchData: [ResetPassword.fetchData]
    },
    {
      name: "ForgotPassword",
      exact: true,
      isPublic: true,
      component: ForgotPassword,
      fetchData: [ForgotPassword.fetchData]
    },
    {
      name: "Friends",
      exact: true,
      modal: true,
      component: Friends,
      fetchData: [Friends.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "MyAccount",
      exact: true,
      component: MyAccount,
      fetchData: [MyAccount.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "Messages",
      exact: true,
      component: Messages,
      fetchData: [],
      roles: [ROLES.PLAYER]
    },
    {
      name: "Matches",
      exact: true,
      component: Matches,
      fetchData: [],
      roles: [ROLES.PLAYER]
    },
    {
      name: "AddFriend",
      exact: true,
      modal: true,
      component: AddFriend,
      fetchData: [AddFriend.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "RecentPlayers",
      exact: true,
      component: RecentPlayers,
      fetchData: [RecentPlayers.fetchData, GameLobby.fetchData]
    },
    {
      name: "MatchMaking",
      exact: true,
      component: MatchMaking,
      fetchData: [MatchMaking.fetchData, GameLobby.fetchData]
    },
    {
      name: "GameLobbyChat",
      exact: true,
      modal: true,
      component: GameLobbyChat,
      fetchData: [GameLobbyChat.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "LeaderBoards",
      exact: true,
      component: LeaderBoards,
      fetchData: [LeaderBoards.fetchData, GameLobby.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "LeaderBoardsDetails",
      exact: true,
      modal: true,
      component: LeaderBoardsDetails,
      fetchData: [LeaderBoardsDetails.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "GameRules",
      exact: true,
      component: GameRules,
      fetchData: [GameRules.fetchData, GameLobby.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "Deposit",
      exact: true,
      modal: true,
      component: Deposit,
      fetchData: [Deposit.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "Withdrawal",
      exact: true,
      modal: true,
      component: TemporaryWithdrawal,
      fetchData: [TemporaryWithdrawal.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "PlayerDetails",
      exact: true,
      component: PlayerDetails,
      fetchData: [PlayerDetails.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "MatchDetails",
      exact: true,
      modal: true,
      component: MatchDetails,
      fetchData: [MatchDetails.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "CreateChallenge",
      exact: true,
      modal: true,
      component: CreateChallenge,
      fetchData: [CreateChallenge.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "AdminGameDetails",
      exact: true,
      modal: true,
      component: AdminGameDetails,
      fetchData: [AdminGameDetails.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "SendChallenge",
      exact: true,
      modal: true,
      component: SendChallenge,
      fetchData: [SendChallenge.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "TransactionDetails",
      exact: true,
      modal: true,
      component: TransactionDetails,
      fetchData: [TransactionDetails.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "BonusTransactionDetails",
      exact: true,
      modal: true,
      component: BonusTransactionDetails,
      fetchData: [BonusTransactionDetails.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "Wallet",
      exact: true,
      modal: true,
      component: Wallet,
      fetchData: [Wallet.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "Offers",
      exact: true,
      modal: true,
      component: Offers,
      fetchData: [Offers.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "MatchLobby",
      exact: true,
      component: MatchLobby,
      fetchData: [MatchLobby.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "MatchLobbyChat",
      exact: true,
      modal: true,
      component: MatchLobbyChat,
      fetchData: [MatchLobbyChat.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "ReportResults",
      exact: true,
      modal: true,
      component: ReportResults,
      fetchData: [ReportResults.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "SetScoreAdvantage",
      exact: true,
      modal: true,
      component: SetScoreAdvantage,
      fetchData: [SetScoreAdvantage.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "Notifications",
      exact: true,
      component: Notifications,
      fetchData: [Notifications.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "Support",
      exact: true,
      component: Support,
      fetchData: [Support.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "Players",
      exact: true,
      component: Players,
      fetchData: [Players.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "PlayerCredit",
      exact: true,
      modal: true,
      component: PlayerCredit,
      fetchData: [PlayerCredit.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "PlayerCreditEnergy",
      exact: true,
      modal: true,
      component: PlayerCreditEnergy,
      fetchData: [PlayerCreditEnergy.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "PlayerCreditBonus",
      exact: true,
      modal: true,
      component: PlayerCreditBonus,
      fetchData: [PlayerCreditBonus.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "PlayerBonusTransactions",
      exact: true,
      modal: true,
      component: PlayerBonusTransactions,
      fetchData: [PlayerBonusTransactions.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "PlayerBlock",
      exact: true,
      modal: true,
      component: PlayerBlock,
      fetchData: [PlayerBlock.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "PlayerWithdraw",
      exact: true,
      modal: true,
      component: PlayerWithdraw,
      fetchData: [PlayerWithdraw.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "PlayerTransactions",
      exact: true,
      modal: true,
      component: PlayerTransactions,
      fetchData: [PlayerTransactions.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "PlayerMatches",
      exact: true,
      modal: true,
      component: PlayerMatches,
      fetchData: [PlayerMatches.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "PlayerDetailsAdmin",
      exact: true,
      modal: true,
      component: PlayerDetailsAdmin,
      fetchData: [PlayerDetailsAdmin.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "PlayerXp",
      exact: true,
      modal: true,
      component: PlayerXp,
      fetchData: [PlayerXp.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "PlayerBoyProfile",
      exact: true,
      modal: true,
      component: PlayerBoyProfile,
      fetchData: [PlayerBoyProfile.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "GlobalChat",
      exact: true,
      modal: true,
      component: GameLobbyChatWrapper,
      fetchData: [],
      roles: [ROLES.PLAYER]
    },
    {
      name: "BonusCampaigns",
      exact: true,
      component: BonusCampaigns,
      fetchData: [BonusCampaigns.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "CreateBonusCampaigns",
      exact: true,
      modal: true,
      component: CreateBonusCampaigns,
      fetchData: [CreateBonusCampaigns.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "BonusCampaignsDetails",
      exact: true,
      modal: true,
      component: BonusCampaignsDetails,
      fetchData: [BonusCampaignsDetails.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "AdminGames",
      exact: true,
      component: AdminGames,
      fetchData: [AdminGames.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "AdminMatches",
      exact: true,
      component: AdminMatches,
      fetchData: [AdminMatches.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "AdminMatchMaking",
      exact: true,
      modal: true,
      component: AdminMatchMaking,
      fetchData: [AdminMatchMaking.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "AdminBoyMatches",
      exact: true,
      component: AdminBoyMatches,
      fetchData: [AdminBoyMatches.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "UpdateAdminBoyMatch",
      exact: true,
      modal: true,
      component: UpdateAdminBoyMatch,
      fetchData: [UpdateAdminBoyMatch.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "Affiliates",
      exact: true,
      component: Affiliates,
      fetchData: [Affiliates.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "CreateAffiliate",
      exact: true,
      modal: true,
      component: CreateAffiliate,
      fetchData: [CreateAffiliate.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "AffiliateUrls",
      exact: true,
      modal: true,
      component: AffiliateUrls,
      fetchData: [AffiliateUrls.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "CreateAffiliateUrl",
      exact: true,
      modal: true,
      component: CreateAffiliateUrl,
      fetchData: [CreateAffiliateUrl.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "AffiliateReporting",
      exact: true,
      modal: true,
      component: AffiliateReporting,
      fetchData: [AffiliateReporting.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "Promotions",
      exact: true,
      component: Promotions,
      fetchData: [Promotions.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "CreatePromotion",
      exact: true,
      modal: true,
      component: CreatePromotion,
      fetchData: [CreatePromotion.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "UpdatePromotion",
      exact: true,
      modal: true,
      component: UpdatePromotion,
      fetchData: [UpdatePromotion.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "AffiliatePromotions",
      exact: true,
      modal: true,
      component: AffiliatePromotions,
      fetchData: [AffiliatePromotions.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "PromoteAffiliate",
      exact: true,
      modal: true,
      component: PromoteAffiliate,
      fetchData: [PromoteAffiliate.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "UpdateAffiliate",
      exact: true,
      modal: true,
      component: UpdateAffiliate,
      fetchData: [UpdateAffiliate.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "UpdateAffiliateUrl",
      exact: true,
      modal: true,
      component: UpdateAffiliateUrl,
      fetchData: [UpdateAffiliateUrl.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "PlayerReferral",
      exact: true,
      component: PlayerReferral,
      fetchData: [PlayerReferral.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "Tournaments",
      exact: true,
      component: Tournaments,
      fetchData: [Tournaments.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "TournamentInfo",
      exact: true,
      component: TournamentInfo,
      fetchData: [],
      roles: [ROLES.PLAYER]
    },
    {
      name: "TournamentResults",
      exact: true,
      component: tournamentResults,
      fetchData: [],
      roles: [ROLES.PLAYER]
    },
    {
      name: "TournamentPaywall",
      exact: true,
      component: TournamentPaywall,
      fetchData: [],
      roles: [ROLES.PLAYER]
    },

    {
      name: "IpsReport",
      exact: true,
      component: DuplicateIpsReport,
      fetchData: [DuplicateIpsReport.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "IpsReportDetail",
      exact: true,
      modal: true,
      component: DuplicateIpsReportDetail,
      fetchData: [DuplicateIpsReportDetail.fetchData],
      roles: [ROLES.ADMIN]
    },
    {
      name: "BoyGameLobby",
      exact: true,
      component: boyGameLobby,
      fetchData: [boyGameLobby.fetchData],
      roles: [ROLES.PLAYER]
    },
    {
      name: "BoyMatch",
      exact: true,
      component: boyMatch,
      fetchData: [],
      roles: [ROLES.PLAYER]
    },
    {
      name: "IosAddToHomeScreen",
      exact: true,
      modal: true,
      component: IosAddToHomeScreen,
      fetchData: [],
      roles: [ROLES.PLAYER]
    }
  ];
}

export default getRouteList;
