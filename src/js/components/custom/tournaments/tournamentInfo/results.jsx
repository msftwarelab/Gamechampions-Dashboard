import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { withTheme } from "styled-components";
import { FlexBox, Paragraph, Loader, Image, Button } from "~components/atoms";
import { styled } from "~theme";

const Results = ({
  theme,
  onLoadTournamentResults,
  tournamentResults,
  tournamentId,
  isLoading
}) => {
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(5);

  const [tournamentsLength, setTournamentsLength] = useState(
    tournamentResults ? tournamentResults.size : 0
  );
  const [isDisabledShowMore, setIsDisabledShowMore] = useState(false);

  const handleClickShowMore = () => {
    onLoadTournamentResults({
      tournamentId: tournamentId,
      page: 1,
      pageSize: pageSize + 5
    }).then(response => {
      if (response.length === tournamentsLength) {
        setIsDisabledShowMore(true);
      } else {
        setTournamentsLength(response.length);
      }
    });
    setPageSize(prev => prev + 5);
  };
  useEffect(() => {
    onLoadTournamentResults({
      tournamentId: tournamentId,
      page: 1,
      pageSize: pageSize
    });
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
          src="/img/icons/tournament_result_icon.svg"
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
          {t("Results")}
        </Paragraph>
      </FlexBox>
      <FlexBox flexDirection="column" color="black">
        {tournamentResults?.toJS().map((result, index) => {
          const backgroundColor =
            index % 2 === 0 ? theme.colors.greySoft : "transparent";
          return (
            <FlexBox
              key={index}
              justifyContent="space-between"
              alignItems="center"
              gap={{ base: "0", md: "0.5rem" }}
              padding="10px 19px 10px 10px"
              backgroundColor={backgroundColor}
              hoverBackgroundColor={backgroundColor}
            >
              <FlexBox justifyContent="center" alignItems="center">
                <FlexBox justifyContent="center" alignItems="center">
                  <Image
                    width="2.25rem"
                    src={result.challengerTeam?.thumbnailUrl}
                  />
                </FlexBox>
                <FlexBox
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  margin={{ base: "0", md: "0 1rem" }}
                  width={{ base: "6rem", md: "7rem" }}
                >
                  <Paragraph fontSize={{ base: "0.675rem", md: "0.875rem" }}>
                    {result.challengerUsername}
                  </Paragraph>
                  <FlexBox
                    backgroundColor={
                      result.challengerScore > result.defenderScore
                        ? theme.colors.dodgerBlue
                        : theme.colors.red
                    }
                    hoverBackgroundColor={
                      result.challengerScore > result.defenderScore
                        ? theme.colors.dodgerBlue
                        : theme.colors.red
                    }
                    borderRadius="6.25rem"
                    padding="0 0.5rem"
                  >
                    <Paragraph fontSize="0.75rem" color="white">
                      {result.challengerTournamentPoints > 0
                        ? "+" + result.challengerTournamentPoints
                        : result.challengerTournamentPoints}
                      &nbsp;pts
                    </Paragraph>
                  </FlexBox>
                </FlexBox>
              </FlexBox>
              <FlexChild>
                <FlexBox
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  backgroundColor={theme.colors.silverGrey}
                  hoverBackgroundColor={theme.colors.silverGrey}
                  borderRadius="0.75rem"
                  padding="0.3rem"
                  width="4rem"
                >
                  <Paragraph
                    fontSize={{ base: "1rem", md: "1.125rem" }}
                    fontWeight="600"
                    textAlign="left"
                    color={theme.colors.primary}
                  >
                    {result.challengerScore}-{result.defenderScore}
                  </Paragraph>
                </FlexBox>
              </FlexChild>
              <FlexBox justifyContent="center" alignItems="center">
                <FlexBox
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  margin={{ base: "0", md: "0 1rem" }}
                  width={{ base: "6rem", md: "7rem" }}
                >
                  <Paragraph fontSize={{ base: "0.675rem", md: "0.875rem" }}>
                    {result.defenderUsername}
                  </Paragraph>
                  <FlexBox
                    backgroundColor={
                      result.challengerScore > result.defenderScore
                        ? theme.colors.red
                        : theme.colors.dodgerBlue
                    }
                    hoverBackgroundColor={
                      result.challengerScore > result.defenderScore
                        ? theme.colors.red
                        : theme.colors.dodgerBlue
                    }
                    borderRadius="6.25rem"
                    padding="0 0.5rem"
                  >
                    <Paragraph fontSize="0.75rem" color="white">
                      {result.defenderTournamentPoints > 0
                        ? "+" + result.defenderTournamentPoints
                        : result.defenderTournamentPoints}
                      &nbsp;pts
                    </Paragraph>
                  </FlexBox>
                </FlexBox>
                <FlexBox justifyContent="center" alignItems="center">
                  <Image
                    width="2.25rem"
                    src={result.defenderTeam?.thumbnailUrl}
                  />
                </FlexBox>
              </FlexBox>
            </FlexBox>
          );
        })}
      </FlexBox>
      <Button
        to="#"
        color={theme.colors.fontNobelColor}
        hoverColor="#777676"
        backgroundColor="transparent !important"
        hoverBackgroundColor="transparent"
        visitedColor={theme.colors.fontNobelColor}
        isDisabled={isDisabledShowMore}
        onClick={handleClickShowMore}
        className="tournaments-show-more-btn"
        margin="0.5em auto"
        boxShadow="none"
        padding={{ base: "12px 24px", md: "12px 24px" }}
        width={{ base: "100%", md: "auto" }}
      >
        {t("ShowMore")}
      </Button>
    </FlexBox>
  );
};

export default withTheme(Results);

const FlexChild = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
