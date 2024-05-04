import {
  default as styled,
  css,
  keyframes,
  withTheme
} from "styled-components";
import { theme } from "~config";
import { icons } from "./icons";

import IconTheme from "~components/atoms/icon/theme";
import SpanTheme from "~components/atoms/span/theme";
import LinkTheme from "~components/atoms/link/theme";
import GaugeTheme from "~components/atoms/gauge/theme";
import TableTheme from "~components/molecules/table/theme";
import ButtonTheme from "~components/atoms/button/theme";
import BannerTheme from "~components/molecules/banner/theme";
import GamesListTheme from "~components/custom/games/gamesList/theme";
import GameLobbyScheme from "~components/custom/gameLobby/theme";
import LoaderTheme from "~components/atoms/loader/theme";
import PaginationTheme from "~components/molecules/pagination/theme";
import ConfirmBoxTheme from "~components/molecules/confirmBox/theme";

const sharedProps = {
  boxShadows: theme.boxShadows,
  colors: theme.colors,
  fonts: theme.fonts,
  icons
};

export const createTheme = () => {
  return {
    spanTheme: SpanTheme(sharedProps),
    gaugeTheme: GaugeTheme(sharedProps),
    iconTheme: IconTheme(sharedProps),
    linkTheme: LinkTheme(sharedProps),
    tableTheme: TableTheme(sharedProps),
    buttonTheme: ButtonTheme(sharedProps),
    bannerTheme: BannerTheme(sharedProps),
    gamesListTheme: GamesListTheme(sharedProps),
    gameLobbyTheme: GameLobbyScheme(sharedProps),
    loaderTheme: LoaderTheme(sharedProps),
    paginationTheme: PaginationTheme(sharedProps),
    confirmBoxTheme: ConfirmBoxTheme(sharedProps),
    ...sharedProps
  };
};

export { media, breakpoints } from "./media";
export { styled, css, keyframes, withTheme };
