import React from "react";
import { styled, withTheme } from "~theme";
import {
  FlexBox,
  Thumbnail,
  Heading,
  Link,
  Paragraph
} from "~components/atoms";
import PlatformTag from "../platformTag";

const Player = ({ player, theme, selectedLanguage, match, isHost }) => (
  <>
    {player && (
      <PlayerStyle>
        <FlexBox
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
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
            <FlexBox maxWidth={"90px"}>
              {" "}
              <Thumbnail
                src={player.get("thumbnailUrl")}
                alt={`${player.get("title")} thumbnail`}
                title={`${player.get("title")} thumbnail`}
                height="5rem"
                width="5rem"
                margin="0.5rem 0.5rem 0.5rem 0"
              />
            </FlexBox>
          </Link>
          <FlexBox
            flexDirection="column"
            textAlign="center"
            width="min-content"
            minWidth="6.25rem"
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
              <Heading as="h3" margin="0" color={theme.colors.black}>
                {player.get("userName")}
              </Heading>
            </Link>
          </FlexBox>
        </FlexBox>

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
      </PlayerStyle>
    )}
  </>
);

export default withTheme(Player);

const PlayerStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 1rem;
  flex: 1;
  min-width: 0;
  align-items: center;
`;
