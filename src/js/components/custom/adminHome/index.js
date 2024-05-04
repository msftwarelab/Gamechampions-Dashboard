import React from "react";
import { styled, withTheme } from "~theme";
import { FlexBox } from "~components/atoms";
import DynamicForm from "~components/molecules/dynamicForm";

import NumberWidget from "./numberWidget";
import Chart from "./chart";
import WidgetWrapper from "./widgetWrapper";

const AdminHome = ({
  theme,
  isMobile,
  formFields,
  initialValues = {},
  // instantMatches = {},
  messageSent = {},
  playerDeposits = {},
  playerRegistrations = {},
  matchesPlayed = {},
  playerWins = {},
  activePlayers,
  depositCount,
  depositSum,
  playerCount,
  matchCommissions = {},
  matchPrizes = {}
}) => {
  const totalCommission = (
    (matchCommissions.values &&
      matchCommissions.length &&
      matchCommissions.values) ||
    []
  ).reduce((a, b) => parseFloat(a) + parseFloat(b), 0);

  const totalPrizes = (
    (matchPrizes.values && matchPrizes.values.length && matchPrizes.values) ||
    []
  ).reduce((a, b) => parseFloat(a) + parseFloat(b), 0);

  return (
    <AdminHomeStyle>
      <FlexBox flex="1 1 100%">
        {initialValues.from && initialValues.to && (
          <DynamicForm
            formWrapperProps={{
              width: {
                base: "100%",
                md: "unset"
              },
              margin: {
                base: "1rem",
                md: "0 auto"
              }
            }}
            formFields={formFields}
            initialValues={initialValues}
            displayButtons={false}
            className="admin-filter__form"
          />
        )}
      </FlexBox>

      <FlexBox
        margin={{ base: "0.25rem 1rem", md: "0.25rem" }}
        width={{ base: "100%", md: "unset" }}
        flexDirection={{ md: "row", base: "column" }}
      >
        <FlexBox flexDirection="column">
          <NumberWidget
            icon="person_add"
            color={theme.colors.primary}
            title="Registered Players"
            count={playerCount}
          />
          <NumberWidget
            icon="euro"
            color={theme.colors.secondary}
            title="Total Deposits"
            count={depositSum}
            prefix="$"
          />
        </FlexBox>
        <FlexBox flexDirection="column">
          <NumberWidget
            icon="people"
            color={theme.colors.tertiary}
            title="Total Active Players"
            count={activePlayers}
          />
          <NumberWidget
            icon="shopping_cart"
            color={theme.colors.primary}
            title="Number Of Deposits"
            count={depositCount}
          />
        </FlexBox>
        <FlexBox flexDirection="column">
          <NumberWidget
            icon="pie_chart"
            color={theme.colors.secondary}
            title="Total Commissions"
            count={totalCommission.toFixed(2)}
            prefix="$"
          />
          <NumberWidget
            icon="emoji_events"
            color={theme.colors.tertiary}
            title="Total Match Prize"
            count={totalPrizes}
            prefix="$"
          />
        </FlexBox>
      </FlexBox>
      {playerWins.labels && (
        <WidgetWrapper title="Players Wins" isHalf={true} padding="1rem">
          <Chart
            headerLabel={"Match Wins"}
            chartType="pie"
            isMobile={isMobile}
            hideGrid={true}
            hideLegends={true}
            labels={playerWins.labels}
            data={playerWins.values}
            hideAxes={true}
            aspectRatio={1}
          />
        </WidgetWrapper>
      )}

      {matchesPlayed.labels && (
        <WidgetWrapper title="Players Matches">
          <Chart
            headerLabel={"Matches Played"}
            chartType="bar"
            isMobile={isMobile}
            labels={matchesPlayed.labels}
            data={matchesPlayed.values}
          />
        </WidgetWrapper>
      )}

      {playerRegistrations.labels && (
        <WidgetWrapper title="Player Registration">
          <Chart
            headerLabel={"Player Registration"}
            chartType="line"
            isMobile={isMobile}
            labels={playerRegistrations.labels}
            data={playerRegistrations.values}
          />
        </WidgetWrapper>
      )}

      {playerDeposits.labels && (
        <WidgetWrapper title="Player Deposit">
          <Chart
            headerLabel={"Player Deposit"}
            chartType="line"
            isMobile={isMobile}
            fill={false}
            labels={playerDeposits.labels}
            data={playerDeposits.values}
          />
        </WidgetWrapper>
      )}

      {messageSent.labels && (
        <WidgetWrapper title="Messages Sent">
          <Chart
            headerLabel={"Messages Sent"}
            chartType="line"
            isMobile={isMobile}
            labels={messageSent.labels}
            data={messageSent.values}
          />
        </WidgetWrapper>
      )}
      {matchCommissions.labels && (
        <WidgetWrapper title="Match Commissions">
          <Chart
            headerLabel={"Match Commissions"}
            chartType="bar"
            isMobile={isMobile}
            labels={matchCommissions.labels}
            data={matchCommissions.values}
          />
        </WidgetWrapper>
      )}
      {matchPrizes.labels && (
        <WidgetWrapper title="Match Prizes">
          <Chart
            headerLabel={"Match Prizes"}
            chartType="bar"
            isMobile={isMobile}
            labels={matchPrizes.labels}
            data={matchPrizes.values}
          />
        </WidgetWrapper>
      )}
    </AdminHomeStyle>
  );
};

export default withTheme(AdminHome);

const AdminHomeStyle = styled(FlexBox)`
  flex-wrap: wrap;
  align-items: flex-start;
`;
