import React from "react";
import { styled, media, withTheme } from "~theme";
import MainWrapper from "~components/custom/mainWrapper";
import GameLobby from "~containers/gameLobby";
import { ScrollBarStyle, Section } from "~components/atoms";
import Footer from "~components/custom/footer";

const GameRulesComponent = ({
  gameRules,
  gameId,
  gameRulesContent,
  theme,
  selectedLanguage,
  title,
  dashboardFooter
}) => (
  <MainWrapper>
    <GameLobby gameId={gameId} selectedLanguage={selectedLanguage} />
    <ContentWrapper>
      {gameRules && title && (
        <ScrollBarStyle>
          <Section
            color={theme.colors.fontColor}
            dangerouslySetInnerHTML={{ __html: `<h1>${title} Rules</h1>` }}
          />
          <Section
            color={theme.colors.fontColor}
            dangerouslySetInnerHTML={{ __html: gameRulesContent }}
          />
        </ScrollBarStyle>
      )}
      <Footer
        dashboardFooter={dashboardFooter}
        selectedLanguage={selectedLanguage}
      />
    </ContentWrapper>
  </MainWrapper>
);

export default withTheme(GameRulesComponent);

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`;
