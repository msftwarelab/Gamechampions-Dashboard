import React from "react";
import { styled, withTheme } from "~theme";
import { FlexBox, Heading, Link } from "~components/atoms";
import SlotMachine from "~components/slotMachine";
import PlatformTag from "../platformTag";
import Paragraph from "~components/atoms/paragraph";

const ChampionsPlayer = ({
  player,
  theme,
  teams,
  selectedTeam,
  onShowTeams,
  selectedLanguage,
  isHost,
  match
}) => (
  <>
    {player && (
      <PlayerStyle>
        <FlexBox alignItems="center" flexDirection="column">
          <SlotMachine
            teams={teams}
            selectedTeam={selectedTeam}
            onShowTeams={onShowTeams}
          />
          <FlexBox
            flexDirection="column"
            textAlign="center"
            width="min-content"
            minWidth="6.25rem"
            alignItems="center"
          >
            <Link
              to={{
                pathname: `/${selectedLanguage}/player-details/${player?.get(
                  "id"
                )}`,
                state: {
                  returnUrl: `/${selectedLanguage}/match-lobby/${match?.get(
                    "id"
                  )}`
                }
              }}
              color={theme.colors.white}
            >
              <Heading as="h3" margin="0" color={theme.colors.lobbyGrey}>
                {player.get("userName")}
              </Heading>
            </Link>
            <PlatformTag player={player} theme={theme} match={match} />
            {isHost && (
              <FlexBox
                backgroundColor={theme.colors.brightturquoise}
                hoverBackgroundColor={theme.colors.brightturquoise}
                color={theme.colors.black}
                fontSize="12px"
                borderRadius="200px"
                width="50px"
                height="24px"
                justifyContent="center"
                borderWidth="1px"
                borderStyle="solid"
                borderColor={theme.colors.primary}
                margin="0.5rem 0 0 0"
                alignItems="center"
              >
                <Paragraph>HOST</Paragraph>
              </FlexBox>
            )}
          </FlexBox>
        </FlexBox>
      </PlayerStyle>
    )}
  </>
);

export default withTheme(ChampionsPlayer);

const PlayerStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 1rem;
  flex: 1;
  min-width: 0;
  gap: 0.375em;
  justify-content: center;
`;
