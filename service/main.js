import configuration from "~config";
/* This class is used to define which modules will be consumed from API
 */
import Router from "./router/";
import Games from "./games";
import GamesService from "./games/service";
import Pages from "./pages/";
import Authentication from "./authentication/";
import AuthenticationService from "./authentication/service";
import Navigation from "./navigation/";
import File from "./file/";
import FileService from "./file/service";
import Session from "./session/";
import Self from "./self";
import SelfService from "./self/service";
import Friends from "./friends";
import FriendsService from "./friends/service";
import Chat from "./chat";
import ChatService from "./chat/service";
import GameLobbyChat from "./gameLobbyChat";
import GameLobbyChatService from "./gameLobbyChat/service";
import MatchLobbyChat from "./matchLobbyChat";
import MatchLobbyChatService from "./matchLobbyChat/service";
import PlayerDetails from "./playerDetails";
import PlayerDetailsService from "./playerDetails/service";
import GamerTags from "./gamerTags";
import GamerTagsService from "./gamerTags/service";
import Profile from "./profile";
import ProfileService from "./profile/service";
import Matches from "./matches";
import MatchesService from "./matches/service";
import Challenges from "./challenges";
import ChallengesService from "./challenges/service";
import TransactionHistory from "./transactionHistory";
import TransactionHistoryService from "./transactionHistory/service";
import MultiLanguage from "./multiLanguage";
import Notifications from "./notifications";
import Wallet from "./wallet";
import WalletService from "./wallet/service";
import NotificationsService from "./notifications/service";
import Countries from "./countries";
import CountriesService from "./countries/service";
import Contact from "./contact";
import ContactService from "./contact/service";
import Players from "./players";
import PlayersService from "./players/service";
import Transactions from "./transactions";
import TransactionsService from "./transactions/service";
import Content from "./content";
import ContentService from "./content/service";
import GlobalChat from "./globalChat";
import GlobalChatService from "./globalChat/service";
import MailProvider from "./mailProvider";
import MailProviderService from "./mailProvider/service";
import bonusCampaigns from "./bonusCampaigns";
import bonusCampaignsService from "./bonusCampaigns/service";
import bonusTransactions from "./bonusTransactions";
import bonusTransactionsService from "./bonusTransactions/service";
import Teams from "./teams";
import TeamsService from "./teams/service";
import ChangeLanguage from "./changeLanguage";
import Statistics from "./statistics";
import StatisticsService from "./statistics/service";
import Affiliates from "./affiliates";
import AffiliatesService from "./affiliates/service";
import Promotions from "./promotions";
import PromotionService from "./promotions/service";
import Tournaments from "./tournaments";
import TournamentsService from "./tournaments/service";

import GlobalChatHub from "./hubConnections/globalChat";
import GlobalChatHubService from "./hubConnections/globalChat/service";
import ConfigService from "./config";
import ConfigServiceMock from "./config/service.mock";
import GoogleRecaptcha from "./googleRecaptcha";
import GoogleRecaptchaService from "./googleRecaptcha/service";
import BoyGames from "./boyGames";
import BoyGamesService from "./boyGames/service";
import TranslationsService from "./translations/service";
import Translations from "./translations";

class Main {
  constructor() {
    if (!Main.instance) {
      this.router = new Router();
      this.games = new Games({ service: new GamesService() });
      this.boyGames = new BoyGames({ service: new BoyGamesService() });
      this.pages = new Pages();
      this.navigation = new Navigation();
      this.session = new Session();
      this.authentication = new Authentication({
        service: new AuthenticationService()
      });
      this.file = new File({ service: new FileService() });
      this.self = new Self({ service: new SelfService() });
      this.profile = new Profile({ service: new ProfileService() });
      this.friends = new Friends({ service: new FriendsService() });
      this.chat = new Chat({ service: new ChatService() });
      this.playerDetails = new PlayerDetails({
        service: new PlayerDetailsService()
      });
      this.gamerTags = new GamerTags({ service: new GamerTagsService() });
      this.matches = new Matches({ service: new MatchesService() });
      this.gameLobbyChat = new GameLobbyChat({
        service: new GameLobbyChatService()
      });
      this.challenges = new Challenges({ service: new ChallengesService() });
      this.transactionHistory = new TransactionHistory({
        service: new TransactionHistoryService()
      });
      this.multiLanguage = new MultiLanguage();
      this.notifications = new Notifications({
        service: new NotificationsService()
      });
      this.matchLobbyChat = new MatchLobbyChat({
        service: new MatchLobbyChatService()
      });
      this.wallet = new Wallet({ service: new WalletService() });
      this.countries = new Countries({ service: new CountriesService() });
      this.contact = new Contact({ service: new ContactService() });
      this.players = new Players({ service: new PlayersService() });
      this.transactions = new Transactions({
        service: new TransactionsService()
      });
      this.content = new Content({ service: new ContentService() });
      this.globalChat = new GlobalChat({ service: new GlobalChatService() });
      this.mailProvider = new MailProvider({
        service: new MailProviderService()
      });
      this.bonusCampaigns = new bonusCampaigns({
        service: new bonusCampaignsService()
      });
      this.bonusTransactions = new bonusTransactions({
        service: new bonusTransactionsService()
      });
      this.teams = new Teams({
        service: new TeamsService()
      });
      this.translations = new Translations({
        service: new TranslationsService()
      });
      this.statistics = new Statistics({
        service: new StatisticsService()
      });
      this.affiliates = new Affiliates({
        service: new AffiliatesService()
      });
      this.promotions = new Promotions({
        service: new PromotionService()
      });
      this.tournaments = new Tournaments({
        service: new TournamentsService()
      });
      this.changeLanguage = new ChangeLanguage();
      this.tournaments = new Tournaments({
        service: new TournamentsService()
      });
      this.globalChatHub = new GlobalChatHub({
        service: new GlobalChatHubService()
      });
      this.configService = new ConfigService({
        service: new ConfigServiceMock({ configuration })
      });
      this.googleRecaptcha = new GoogleRecaptcha({
        service: new GoogleRecaptchaService()
      });
      Main.instance = this;
    }

    return Main.instance;
  }

  setToken(value) {
    Main.instance.authentication.setToken(value);
  }

  getToken() {
    return Main.instance.authentication.getToken();
  }

  setRefreshToken(value) {
    Main.instance.authentication.setRefreshToken(value);
  }

  getRefreshToken() {
    return Main.instance.authentication.getRefreshToken();
  }
}

const instance = new Main();
Object.freeze(instance);
export default instance;
