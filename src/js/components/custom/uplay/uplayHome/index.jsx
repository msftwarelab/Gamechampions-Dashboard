import React from "react";
import { Link, Paragraph } from "~components/atoms";
import Footer from "~components/custom/footer";
import { media, styled } from "~theme";
import UplayGameCard from "../uplayGameCard";
import UplayGameCardPlaceholder from "../uplayGameCardPlaceholder";
import UplayQuickLinkCard from "../uplayQuickLinkCard";

const UPlayHome = ({
  uPlayGames,
  uPlayQuickLinks,
  dashboardFooter,
  selectedLanguage,
  profile,
  t
}) => {
  function gtagFortniteGame(game) {
    if (typeof window !== "undefined") {
      window.dataLayer.push({
        Event: "boyGameSelected",
        userId: profile.get("id"),
        userCountry: profile.get("country") || "MT",
        GameName: game.get("title")
      });
    }
  }
  return (
    <Wrapper>
      <Paragraph
        margin="0 0 1.5rem 0"
        fontSize={{ base: "1.4rem", md: "1.8rem" }}
        fontWeight="bold"
      >
        {t("GamesAvailable")}
      </Paragraph>
      <GamesGrid>
        {uPlayGames.map(game => {
          return (
            <Link
              to={
                game.get("isEnabled")
                  ? `/${selectedLanguage}/uplay/${game.get("gameId")}`
                  : "#"
              }
              key={game.get("gameId")}
              onClick={gtagFortniteGame(game)}
            >
              {game.get("isEnabled") ? (
                <UplayGameCard
                  title={game.get("title")}
                  thumbnail={game.get("thumbnail")}
                  iconUrl={game.get("iconUrl")}
                  bannerColor={game.get("bannerColor")}
                />
              ) : (
                <UplayGameCardPlaceholder
                  title={game.get("title")}
                  thumbnail={game.get("thumbnail")}
                  iconUrl={game.get("iconUrl")}
                  bannerColor={game.get("bannerColor")}
                />
              )}
            </Link>
          );
        })}
      </GamesGrid>
      <Paragraph
        margin="2.8rem 0 1.5rem 0"
        fontSize={{ base: "1.4rem", md: "1.8rem" }}
        fontWeight="bold"
      >
        {t("QuickLinks")}
      </Paragraph>
      <GamesGrid>
        {!!uPlayQuickLinks &&
          uPlayQuickLinks.map((quickLink, idx) => (
            <a
              key={idx}
              href={
                (!!quickLink.get("link") &&
                  quickLink.get("link").get("link")) ||
                "/"
              }
              target={
                quickLink.get("link").get("isNewWindow") ? "_blank" : "_self"
              }
              rel="noopener noreferrer"
            >
              <UplayQuickLinkCard
                header={quickLink.get("header")}
                summary={quickLink.get("summary")}
              />
            </a>
          ))}
      </GamesGrid>
      <Footer
        dashboardFooter={dashboardFooter}
        selectedLanguage={selectedLanguage}
      />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 100%;
  padding: 1em;
  overflow-y: auto;
`;

const GamesGrid = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fill, 1fr);
  grid-gap: 2rem;
  padding-bottom: 1em;
  ${media.md`
    grid-template-columns: repeat(auto-fill, minmax(14.5rem, 20rem));
  `};
`;

export default UPlayHome;
