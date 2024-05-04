import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { withTheme } from "styled-components";
import {
  FlexBox,
  Paragraph,
  Loader,
  Thumbnail,
  Link,
  Image
} from "~components/atoms";
import { styled } from "~theme";

const LeaderBoard = ({
  theme,
  profile,
  ranking,
  selectedLanguage,
  tournamentUrl,
  onLoadTournamentRanking,
  isLoading
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    onLoadTournamentRanking();
  }, []);

  if (isLoading)
    return <Loader isLoading={true} margin="5rem auto" scale="6rem" />;

  return (
    <FlexBox flexDirection="column" width="100%" margin=".5rem 0">
      <FlexBox
        backgroundColor={theme.colors.primary}
        hoverBackgroundColor={theme.colors.primary}
        alignItems="center"
        padding="1rem"
        gap="0.8rem"
      >
        <Image
          src="/img/icons/leaderboard_icon.svg"
          width="1.5rem"
          height="1.5rem"
          alt="leaderboard"
        />
        <Paragraph
          fontSize="1.2rem"
          fontWeight="700"
          color={theme.colors.white}
          textAlign="left"
          margin="0"
        >
          {t("Leaderboards")}
        </Paragraph>
      </FlexBox>
      <FlexBox flexDirection="column">
        {ranking.toJS().map(({ rank, player, totalPoints, prize }, index) => {
          const backgroundColor =
            profile.get("id") === player.id
              ? "#0D2440"
              : index % 2 === 0
              ? theme.colors.greySoft
              : "transparent";
          return (
            <FlexBox
              key={rank}
              justifyContent="space-between"
              alignItems="center"
              gap="8px"
              padding="10px 19px 10px 10px"
              backgroundColor={backgroundColor}
              hoverBackgroundColor={backgroundColor}
              color={
                profile.get("id") === player.id
                  ? theme.colors.white
                  : theme.colors.primary
              }
            >
              <FlexBox justifyContent="center" alignItems="center">
                {/* <FlexBox
                      alignItems="center"
                      justifyContent="center"
                      minWidth="18px"
                    >
                      {rankDifference !== 0 && (
                        <IconWrapper rankDifference={rankDifference}>
                          <Icon
                            color={
                              rankDifference > 0
                                ? theme.colors.secondary
                                : theme.colors.indianRed
                            }
                            icon="rank_triangle"
                            scale="1.125"
                          />
                        </IconWrapper>
                      )}
                    </FlexBox> */}
                <FlexBox
                  minWidth="1.7rem"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Paragraph fontSize="1.125rem" fontWeight="600">
                    {rank}
                  </Paragraph>
                </FlexBox>
              </FlexBox>
              <FlexChild>
                <Thumbnail
                  src={player.profileImage}
                  height="2.5rem"
                  width="2.5rem"
                />
                <FlexBox
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Paragraph
                    fontSize={{ base: "1rem", md: "1.125rem" }}
                    fontWeight="600"
                    textAlign="left"
                  >
                    <Link
                      to={{
                        pathname: `/${selectedLanguage}/player-details/${player.id}`,
                        state: {
                          returnUrl: tournamentUrl
                        }
                      }}
                      color={theme.colors.primary}
                    >
                      {player.userName}
                    </Link>
                  </Paragraph>
                  <Paragraph
                    fontSize={{ base: "1rem", md: "1.125rem" }}
                    fontWeight="600"
                    textAlign="left"
                    color={theme.colors.energyColor}
                  >
                    {`${totalPoints} ${t("TournamentLeaderboardPointsLabel")}`}
                  </Paragraph>
                </FlexBox>
              </FlexChild>
              <FlexBox>
                <Paragraph
                  color={theme.colors.secondary}
                  fontWeight="700"
                  fontSize={{ base: "1.275rem", md: "1.875rem" }}
                >
                  &#36;{prize}
                </Paragraph>
              </FlexBox>
            </FlexBox>
          );
        })}
        {/* <FlexBox alignItems="center" justifyContent="center" padding="12px">
          <Paragraph fontWeight="500" color={theme.colors.primary}>
            Page 1 of 16
          </Paragraph>
        </FlexBox>
        <FlexBox justifyContent="center" alignItems="center" gap="10px">
          <Button
            padding="14px 0"
            width="4.3rem"
            fontWeight="500"
            isDisabled={true}
          >
            FIRST
          </Button>
          <Button
            padding="14px 0"
            width="4.3rem"
            fontWeight="500"
            isDisabled={true}
          >
            PREV
          </Button>
          <Button padding="14px 0" width="4.3rem" fontWeight="500">
            NEXT
          </Button>
          <Button padding="14px 0" width="4.3rem" fontWeight="500">
            LAST
          </Button>
        </FlexBox> */}
      </FlexBox>
    </FlexBox>
  );
};

export default withTheme(LeaderBoard);

const FlexChild = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;
