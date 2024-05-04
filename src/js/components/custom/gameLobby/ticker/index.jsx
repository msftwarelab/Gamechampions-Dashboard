import React from "react";
import { styled } from "~theme";
import TickerItem from "./tickerItem";
import { Marquee } from "~components/atoms";
import { useTranslation } from "react-i18next";

const Ticker = ({ matches, tournament }) => {
  const { t } = useTranslation();
  let tournamentPrize =
    tournament &&
    tournament
      .get("prizes")
      .map(x => parseInt(x))
      .reduce((a, b) => a + b, 0);
  return (
    <TickerStyle>
      <Marquee>
        {matches &&
          matches.size > 0 &&
          matches.map(n => (
            <TickerItem
              key={n.get("id")}
              winner={n.get("winner")}
              looser={n.get("looser")}
              bet={
                n.get("bet") > 0
                  ? `${n.get("bet")}`
                  : `${tournamentPrize} ${t("TournamentPrize")}`
              }
              isTie={n.get("isTie")}
            />
          ))}
      </Marquee>
    </TickerStyle>
  );
};
export default Ticker;

const TickerStyle = styled.div`
  position: absolute;
  z-index: 8;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.darkenColorDark};
`;
