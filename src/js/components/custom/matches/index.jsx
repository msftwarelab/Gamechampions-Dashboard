import React from "react";
import MainWrapper from "../mainWrapper";
import ScrollableTabs from "~components/tabs";
import { Paragraph, FlexBox, Button, Icon } from "~components/atoms";
import { withTheme } from "~theme";
import { useTranslation } from "react-i18next";
import SportsMatchesBox from "./sportsMatchesBox";
import BoyMatchesBoxSkeleton from "./boyMatchesBoxSkeleton";

const Matches = ({
  sportsMatches,
  match,
  profile,
  games,
  onLoadSportsMatches,
  theme,
  selectedLanguage,
  isLoading,
  history
}) => {
  const isSportsMatchesExisting = !!sportsMatches && sportsMatches.size > 0;

  const { t } = useTranslation();
  const noMatchFound = (
    <>
      <Paragraph
        color={theme.colors.fontColor}
        justifyContent="center"
        textAlign="center"
      >
        {t("NoMatchFound1")}
        <br />
        {t("NoMatchFound2")}
      </Paragraph>
      <FlexBox justifyContent={"center"}>
        <Icon
          viewBox="0 0 99 132"
          scale="8"
          color={theme.colors.gainsboroGrey}
          icon="ghost"
          cursor="default"
          margin="3rem 0 6rem 0"
        />
      </FlexBox>
    </>
  );

  const elementArray = [
    {
      id: 1,
      title: `${t("MyMatchesSports").toUpperCase()}`,
      url: `/${selectedLanguage}/matches/sports`,
      element: (
        <>
          {isSportsMatchesExisting ? (
            <SportsMatchesBox
              selectedLanguage={selectedLanguage}
              sportsMatches={sportsMatches}
              history={history}
              profile={profile}
              games={games}
              onLoadSportsMatches={onLoadSportsMatches}
              t={t}
            />
          ) : (
            <FlexBox
              flexDirection="column"
              justifyContent={"center"}
              margin={{ base: "1rem auto", md: "2rem auto" }}
            >
              {noMatchFound}
              <FlexBox justifyContent={"center"}>
                <Button
                  to={`/${selectedLanguage}/create-challenge`}
                  margin="0.5em auto"
                  padding={{ base: "12px 24px", md: "12px 24px" }}
                  width={{ base: "100%", md: "auto" }}
                >
                  {t("CreateChallengeButton")}
                </Button>
              </FlexBox>
            </FlexBox>
          )}
        </>
      )
    }
  ];

  return (
    <MainWrapper>
      {isLoading ? (
        <>
          <BoyMatchesBoxSkeleton />
          <BoyMatchesBoxSkeleton />
          <BoyMatchesBoxSkeleton />
          <BoyMatchesBoxSkeleton />
        </>
      ) : (
        <></>
      )}
      <FlexBox
        display={isLoading ? "none" : "flex"}
        flexDirection="column"
        backgroundColor={theme.colors.white}
        hoverBackgroundColor={theme.colors.white}
        alignItems={{ base: "center", md: "flex-start" }}
      >
        <ScrollableTabs
          tabs={elementArray}
          match={match}
          games={games}
          selectedLanguage={selectedLanguage}
          profile={profile}
          isLinkWidthFull={true}
        />
      </FlexBox>
    </MainWrapper>
  );
};

export default withTheme(Matches);
