import React from "react";
import { styled, media, withTheme } from "~theme";
import { Button } from "~components/atoms";
import TabsWrapper from "./tabsWrapper";
import StyledLink from "./styledLink";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const TabsBar = ({
  gameId,
  isTournament,
  theme,
  selectedLanguage,
  isMobile,
  getGameLobbyEnabledTabs
}) => {
  const { t } = useTranslation();
  const location = useLocation();

  const tabsData = [
    {
      id: 1,
      to: `/${selectedLanguage}/game-lobby/${gameId}/recentplayers`,
      title: t("RecentPlayers")
    },
    {
      id: 2,
      to: `/${selectedLanguage}/game-lobby/${gameId}/matchmaking`,
      title: t("PublicMatches")
    },
    {
      id: 3,
      to: `/${selectedLanguage}/game-lobby/${gameId}/tournaments`,
      title: t("Tournaments")
    },
    {
      id: 5,
      to: `/${selectedLanguage}/game-lobby/${gameId}/rules`,
      title: t("Rules")
    }
  ];

  const filteredTabsData = getGameLobbyEnabledTabs
    ? tabsData.filter(tabs =>
        getGameLobbyEnabledTabs.some(t => t.id === tabs.id && t.isEnabled)
      )
    : tabsData;

  const createChallengeUrl = isTournament
    ? `/${selectedLanguage}/create-challenge/${gameId}?tournament=true`
    : `/${selectedLanguage}/create-challenge/${gameId}`;

  return (
    <TabsBarStyle>
      <TabsWrapper>
        {filteredTabsData.map(n => {
          return (
            <StyledLink key={n.id} to={n.to} title={n.title}>
              {n.title}
            </StyledLink>
          );
        })}
      </TabsWrapper>
      {filteredTabsData.find(
        td => td.title !== t("Tournaments") && td.to === location.pathname
      ) && (
        <Button
          to={createChallengeUrl}
          margin={{ base: "1.5em 0 1.5em 0", md: "0 1rem 0.5em 0" }}
          padding={{ base: "0.8em 1.66em", md: "0.8em 1.66em" }}
          width={{ base: "100%", md: "auto" }}
          fontStyle="italic"
          fontWeight={theme.fonts.bold}
          fontSize={"1.125rem"}
          className="create-match-pulsing-btn"
        >
          {t("CreateChallengeButton")}
        </Button>
      )}
      {!isMobile && (
        <Button
          to={`/${selectedLanguage}/game-lobby/${gameId}/chat`}
          display={{ base: "inline-block", md: "none" }}
          margin="0 0 1.5em 0"
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
    </TabsBarStyle>
  );
};

export default withTheme(TabsBar);

const TabsBarStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fonts.small};
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  margin-bottom: 1rem;
  overflow-x: "auto";

  ${media.md`
    flex-direction: row;
    border-bottom: 1px solid ${({ theme }) => theme.colors.darkenColorLight};
    background-color: ${({ theme }) => theme.colors.white};
    margin-bottom: 0.5rem;
  `};
`;
