import React from "react";
import { media, styled, withTheme } from "~theme";
import { Heading, FlexBox, Link } from "~components/atoms";
import { useTranslation } from "react-i18next";
import InputButton from "~components/buttons/inputButton";
import XpPoints from "~components/custom/matches/match/xpPoints";

const Player = ({
  selectedLanguage,
  player,
  theme,
  handleSendChallenge,
  isSubmit,
  isButtonClick,
  userId,
  gameId
}) => {
  const { t } = useTranslation();
  return (
    <PlayerStyle>
      <FlexBox
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row" }}
        gap={{ base: "1em", md: "0" }}
      >
        <FlexBox alignItems="center" gap="1em">
          <Link
            to={{
              pathname: `/${selectedLanguage}/player-details/${player?.get(
                "id"
              )}`,
              state: {
                returnUrl: `/${selectedLanguage}/game-lobby/${gameId}/recentplayers`
              }
            }}
            color={theme.colors.black}
          >
            <Thumbnail src={player && player?.get("iconUrl")}>
              <Dot />
            </Thumbnail>
          </Link>
          <FlexBox
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="center"
            alignItems="center"
            gap="0.375em"
          >
            <Link
              to={{
                pathname: `/${selectedLanguage}/player-details/${player?.get(
                  "id"
                )}`,
                state: {
                  returnUrl: `/${selectedLanguage}/game-lobby/${gameId}/recentplayers`
                }
              }}
              color={theme.colors.black}
            >
              <Heading
                as="h3"
                fontSize="1em"
                fontWeight={theme.fonts.semiBold}
                textTransform="uppercase"
                textAlign="center"
                margin="0"
              >
                {player && player?.get("userName")}
              </Heading>
            </Link>
            <XpPoints points={player && player?.get("stars")} margin="0" />
          </FlexBox>
        </FlexBox>
        {player && player?.get("id") != userId && (
          <FlexBox
            alignItems="center"
            justifyContent={{ base: "center", md: "flex-end" }}
            padding={{ base: "0", md: "0 2em" }}
            width="100%"
            flex={1}
          >
            <InputButton
              type="submit"
              loading={isButtonClick}
              value={t("GameLobbyRecentPlayersButton")}
              disabled={isSubmit}
              className="send--challenge"
              onButtonClick={() => handleSendChallenge(player?.get("id"))}
            />
          </FlexBox>
        )}
      </FlexBox>
    </PlayerStyle>
  );
};

export default withTheme(Player);

const PlayerStyle = styled.li`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.fontColor};
  background-color: ${({ theme }) => theme.colors.white};
  margin: 0.5rem;
  padding: 1em 0.5rem;
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.boxShadows.secondary};
`;

const Thumbnail = styled(FlexBox)`
  position: relative;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;

  ${media.md`
  width: 64px;
  height: 64px;
  `};
`;

const Dot = styled("span")`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.green};
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid;
  border-color: ${({ theme }) => theme.colors.white};

  ${media.md`
  width: 24px;
  height: 24px;
  `};
`;
