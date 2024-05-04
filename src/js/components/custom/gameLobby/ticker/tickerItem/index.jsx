import React from "react";
import { Span } from "~components/atoms";
import { withTheme, styled } from "~theme";
import { useTranslation } from "react-i18next";

const TickerItem = ({ winner, looser, bet, isTie, theme }) => {
  const { t } = useTranslation();
  return (
    <TickerItemStyle>
      <Span padding="0 0.5em 0 0" color={theme.colors.secondary}>
        {winner}
      </Span>
      <Span>
        {" "}
        {isTie
          ? `${t("GameLobbyTickerMatchesDraw")} `
          : `${t("GameLobbyTickerMatchesWin")} `}
        {looser}
      </Span>
      <Span padding="0 0 0 1em" fontSize={theme.fonts.tiny}>
        {`${t("GameLobbyTickerMatchesBet")} `}
      </Span>
      <Span
        padding="0 0 0 1em"
        fontSize={theme.fonts.xxSmall}
      >{`$${bet}`}</Span>
    </TickerItemStyle>
  );
};

export default withTheme(TickerItem);

const TickerItemStyle = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0 1rem;
  font-size: ${({ theme }) => theme.fonts.xxSmall};
  color: ${({ theme }) => theme.colors.lightenColor};
`;
