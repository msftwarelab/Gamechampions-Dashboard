import React from "react";
import { withTheme } from "~theme";
import { Link, Paragraph } from "~components/atoms";
import MainWrapper from "~components/custom/mainWrapper";
import GridList from "./gridList";
import ListItem from "./listItem";
import ThumbnailWrapper from "./thumbnailWrapper";
import Thumbnail from "./thumbnail";
import GameCaption from "./gameCaption";
import { useTranslation } from "react-i18next";

const GamesList = ({ games, theme, selectedLanguage }) => {
  const { gamesListTheme = {} } = theme;
  const { linkTheme = {} } = gamesListTheme;
  const { t } = useTranslation();

  return (
    <MainWrapper>
      <GridList>
        {games && games.size > 0 ? (
          games.map(n => (
            <ListItem key={n.get("id")}>
              <Link
                to={`/${selectedLanguage}/game-lobby/${n.get(
                  "id"
                )}/tournaments`}
              >
                <ThumbnailWrapper>
                  {n.get("thumbnailUrl") && (
                    <Thumbnail
                      src={n.get("thumbnailUrl")}
                      title={`${n.get("title")} thumbnail`}
                      alt={`${n.get("title")} thumbnail`}
                      className="game-thumb__img"
                    />
                  )}
                </ThumbnailWrapper>
              </Link>
              <GameCaption>
                <Link
                  to={`/${selectedLanguage}/game-lobby/${n.get(
                    "id"
                  )}/matchmaking`}
                  {...linkTheme}
                >
                  {n.get("title")}
                </Link>
              </GameCaption>
            </ListItem>
          ))
        ) : (
          <Paragraph>{t("NoGamesFound")}</Paragraph>
        )}
      </GridList>
    </MainWrapper>
  );
};

export default withTheme(GamesList);
