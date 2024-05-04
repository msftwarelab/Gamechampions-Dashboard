import React from "react";
import { styled, withTheme } from "~theme";
import { FlexBox, Thumbnail, Paragraph, Link } from "~components/atoms";
import XpPoints from "~components/custom/matches/match/xpPoints";

const MatchPlayer = ({ selectedLanguage, player, theme, xp }) => (
  <>
    {player && (
      <PlayerStyle>
        <FlexBox alignItems="center">
          <Link
            to={`/${selectedLanguage}/player-details/${player.get("id")}`}
            color={theme.colors.black}
          >
            <Thumbnail
              src={player.get("thumbnailUrl")}
              alt={`${player.get("title")} thumbnail`}
              title={`${player.get("title")} thumbnail`}
              height="35px"
              width="35px"
              margin="0"
            />
          </Link>
          <FlexBox
            flexDirection="column"
            textAlign="center"
            width="min-content"
            minWidth="6rem"
          >
            <Link
              to={`/${selectedLanguage}/player-details/${player.get("id")}`}
              color={theme.colors.black}
            >
              <Paragraph fontSize={theme.fonts.small}>
                {player.get("userName")}
              </Paragraph>
            </Link>
          </FlexBox>
        </FlexBox>
        <FlexBox flexDirection="column" alignItems="center" gap="0.375em">
          {xp && <XpPoints points={xp} margin="0" />}
        </FlexBox>
      </PlayerStyle>
    )}
  </>
);

export default withTheme(MatchPlayer);

const PlayerStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 1rem;
  flex: 1;
  min-width: 0;
`;
