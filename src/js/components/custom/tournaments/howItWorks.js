import React from "react";
import { useTranslation } from "react-i18next";
import { withTheme } from "~theme";
import { Button, FlexBox, Heading } from "~components/atoms";

const HowItWorks = ({ theme, tournament }) => {
  const { t } = useTranslation();

  return (
    <FlexBox
      flexDirection="column"
      alignItems="center"
      fontWeight={theme.fonts.bold}
      padding="0.5em"
      margin={{ base: "0 0 1em 0", md: "0 " }}
    >
      <Heading color={theme.colors.secondary}>
        {t("TournamentsHowItWorks")}
      </Heading>
      <FlexBox
        flexDirection={{ base: "row-reverse", md: "column" }}
        alignItems={{ base: "unset", md: "center" }}
      >
        <FlexBox
          margin="1em"
          color="black"
          justifyContent="space-around"
          flexDirection={{ base: "column", md: "row" }}
          maxWidth={{ base: "95%", md: "unset" }}
        >
          {tournament &&
            tournament.get("tournamentSteps") &&
            tournament.get("tournamentSteps").map((step, idx) => (
              <FlexBox
                fontSize={theme.fonts.fontSizeNormal}
                margin="1em"
                display="flex"
                key={idx}
                fontWeight={theme.fonts.fontWeightNormal}
              >
                {step}
              </FlexBox>
            ))}
        </FlexBox>
        <FlexBox
          backgroundColor={theme.colors.secondary}
          hoverBackgroundColor={theme.colors.secondary}
          height={{ base: "unset", md: "0.5em" }}
          width={{ base: "0.5em", md: "80%" }}
          justifyContent="space-between"
          margin={{ base: "2.5rem 1rem", md: "0 0 1em 0" }}
          position="realitve"
          flexDirection={{ base: "column", md: "row" }}
        >
          {tournament &&
            tournament.get("tournamentSteps") &&
            tournament.get("tournamentSteps").map((step, idx) => (
              <FlexBox
                fontSize={theme.fonts.xSmall}
                borderRadius="50%"
                backgroundColor={theme.colors.secondary}
                hoverBackgroundColor={theme.colors.secondary}
                color={theme.colors.white}
                key={idx}
                width="2em"
                height="fit-content"
                justifyContent="center"
                position="relative"
                top={{ base: "unset", md: "-0.5em" }}
                left={{ base: "-0.7em", md: idx == 0 ? "-0.5em" : "unset" }}
                right={
                  idx == tournament.get("tournamentSteps").size - 1 && "-0.5em"
                }
              >
                {idx + 1}
              </FlexBox>
            ))}
        </FlexBox>
      </FlexBox>

      <Button
        onClick={() =>
          window.open(tournament.get("tournamentPageLink"), "_blank")
        }
        margin="1em 0 0 0"
      >
        {t("TournamentsMoreInfoLink")}
      </Button>
    </FlexBox>
  );
};

export default withTheme(HowItWorks);
