import React from "react";
import { withTheme, styled } from "~theme";
import MainWrapper from "~components/custom/mainWrapper";
import { useTranslation } from "react-i18next";
import { Table } from "~components/molecules";
import TableWrapper from "../players/playersTable/tableWrapper";
import { FlexBox, Paragraph } from "~components/atoms";
import { Section, Span } from "~components/atoms";
import DynamicForm from "~components/molecules/dynamicForm";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";

const AffiliateReportingTable = ({
  players,
  isLoading,
  isMobile,
  theme,
  commission,
  formFields,
  history,
  returnUrl,
  page
}) => {
  const { t } = useTranslation();

  const tableHeaders = [
    t("AffiliatePlayersTableFirstColumn"),
    t("AffiliatePlayersTableSecondColumn"),
    t("AffiliatePlayersTableThirdColumn"),
    t("AffiliatePlayersTableForthColumn"),
    t("AffiliatePlayersTableSixthColumn"),
    t("AffiliatePlayersTableSeventhColumn")
  ];

  const renderCell = ({ item, itemKey, isMobile, t, theme }) => {
    if (isMobile) {
      const renderHeader = header => {
        return (
          <Span
            display="inline-block"
            fontWeight={theme.fonts.semiBold}
            margin="0 1rem 0 0"
          >
            {`${header}:`}
          </Span>
        );
      };

      return (
        <>
          <Section>
            {renderHeader(t("AffiliatePlayersTableFirstColumn"))}
            <Span>{item.playerName}</Span>
          </Section>
          <Section>
            {renderHeader(t("AffiliatePlayersTableSecondColumn"))}
            <Span>{item.dateRegistered}</Span>
          </Section>
          <Section>
            {renderHeader(t("AffiliatePlayersTableThirdColumn"))}
            <Span>{item.firstActionDate}</Span>
          </Section>
          <Section>
            {renderHeader(t("AffiliatePlayersTableForthColumn"))}
            <Span>{item.actionCount}</Span>
          </Section>
          <Section>
            {renderHeader(t("AffiliatePlayersTableSixthColumn"))}
            <Span>{item.totalLifetimeValue}</Span>
          </Section>
          <Section>
            {renderHeader(t("AffiliatePlayersTableSeventhColumn"))}
            <Span>{item.medium}</Span>
          </Section>
        </>
      );
    }

    return <Span overflowWrap="break-word">{item[itemKey]}</Span>;
  };

  return (
    <Modal onClick={() => history.push(returnUrl)}>
      <Card
        htmlProps={{
          margin: "1rem 0"
        }}
        titleProps={{
          padding: "0 0.3em"
        }}
        padding="1rem 0.5rem"
        title={page.get("title")}
        closeUrl={returnUrl}
      >
        <MainWrapper>
          <AffiliateReportingTableStyle>
            <FlexBox flexDirection={"column-reverse"} margin="0 0 1rem 0">
              <DynamicForm
                formFields={formFields}
                displayButtons={false}
                className="affiliate__reporting-search__form"
              />
              <FlexBox
                flex={1}
                color={theme.colors.fontColor}
                flexDirection="column"
                margin="1rem 0"
                fontSize={{
                  base: theme.fonts.small,
                  md: theme.fonts.fontSizeNormal
                }}
                fontWeight={theme.fonts.semiBold}
              >
                <Paragraph>
                  {t("CommissionForRange")}
                  <Span fontSize={theme.fonts.xLarge}>
                    {`$${commission.get("totalFilteredCommission")}`}
                  </Span>
                </Paragraph>
                <Paragraph>
                  {t("AllTimeCommission")}
                  <Span fontSize={theme.fonts.xLarge}>
                    {`$${commission.get("totalCommission")}`}
                  </Span>
                </Paragraph>
                <Paragraph>
                  {t("TotalPayOut")}
                  <Span fontSize={theme.fonts.xLarge}>
                    {`$${commission.get("totalPayout")}`}
                  </Span>
                </Paragraph>
                <Paragraph color={theme.colors.secondary}>
                  {t("TotalDebt")}
                  <Span fontSize={theme.fonts.xLarge}>
                    {`$${commission.get("totalDebt").toFixed(2)}`}
                  </Span>
                </Paragraph>
              </FlexBox>
            </FlexBox>
            <TableWrapper noScroll={true}>
              <Table
                headers={tableHeaders}
                data={players && players.toJS()}
                excludedProps={["id", "affiliateId", "email"]}
                isLoading={isLoading}
                noResultLabel="TableNotFound"
                title={t("AffiliatePLayersTableTitle")}
                mobileCellIndex={1}
                urlConstructor={() => {}}
                iconProps={{
                  margin: "0 0 0 1rem"
                }}
                cellTemplate={props =>
                  renderCell({ ...props, isMobile, t, theme })
                }
              />
            </TableWrapper>
          </AffiliateReportingTableStyle>
        </MainWrapper>
      </Card>
    </Modal>
  );
};

const AffiliateReportingTableStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default withTheme(AffiliateReportingTable);
