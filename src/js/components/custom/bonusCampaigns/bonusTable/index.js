import React from "react";
import { withTheme, styled } from "~theme";
import MainWrapper from "~components/custom/mainWrapper";
import { useTranslation } from "react-i18next";
import { Table, Pagination } from "~components/molecules";
import TableWrapper from "./tableWrapper";
import { FlexBox } from "~components/atoms";
import DynamicForm from "~components/molecules/dynamicForm";
import { Button, Section, Span } from "~components/atoms";

const BonusesTable = ({
  bonuses,
  isLoading,
  pagination,
  onChangePageClick,
  isMobile,
  selectedLanguage,
  onSubmitBonusDelete,
  onSetSelectedBonus,
  theme
}) => {
  const { t } = useTranslation();

  const icons = [
    {
      label: "Delete", // TODO: add to translation once you implement the actions
      icon: "delete",
      onClick: data => {
        if (confirm(`Are you sure you want to delete ${data.title}?`)) {
          return onSubmitBonusDelete(data);
        }
      }
    }
  ];
  const tableHeaders = [
    t("BonusTableFirstColumn"),
    t("BonusTableSecondColumn"),
    t("BonusTableThirdColumn"),
    t("BonusTableFourthColumn"),
    t("BonusTableFifthColumn"),
    t("BonusTableSixthColumn"),
    t("BonusTableSevenColumn")
  ];

  const renderCell = ({ item, itemKey, isMobile, t, theme }) => {
    if (isMobile) {
      const renderHeader = header => {
        return (
          <Span
            display="inline-block"
            fontWeight={theme.fonts.semiBold}
            minWidth="6rem"
          >
            {header}
          </Span>
        );
      };

      return (
        <>
          <Section>
            {renderHeader(t("BonusTableFirstColumn"))}
            <Span>{item.title}</Span>
          </Section>
        </>
      );
    }

    return <Span>{item[itemKey]}</Span>;
  };

  return (
    <MainWrapper>
      <BonusTableStyle>
        <FlexBox
          flexDirection={{ md: "row-reverse", base: "column" }}
          alignItems="center"
          padding="1em 0"
        >
          <Button
            to={`/${selectedLanguage}/bonus-campaigns/new/create`}
            width={{ base: "15.5em", md: "auto" }}
            padding="0.5em 2.5em"
          >
            {t("CreateBonusCampaign")}
          </Button>
          <DynamicForm
            displayButtons={false}
            className="bonuses-search__form"
          />
        </FlexBox>
        <TableWrapper noScroll={true}>
          <Table
            headers={tableHeaders}
            data={
              (bonuses &&
                bonuses.length > 0 &&
                bonuses.map(b => ({
                  id: b.id,
                  title: b.title,
                  depositFrom: b.from,
                  depositTo: b.to,
                  dateFrom: b.dateFrom,
                  dateTo: b.dateTo,
                  percentageBonus: b.value,
                  promoCode: b.promoCode,
                  isPublic: b.isPublic,
                  type: b.type,
                  betMultiplierRequirements: b.betMultiplierRequirements,
                  expirationInDays: b.expirationInDays
                }))) ||
              []
            }
            excludedProps={[
              "id",
              "isPublic",
              "betMultiplierRequirements",
              "expirationInDays",
              "type"
            ]}
            isLoading={isLoading}
            urlConstructor={item => {
              return `/${selectedLanguage}/bonus-campaigns/${item.id}`;
            }}
            icons={icons}
            noResultLabel="TableNotFound"
            title={t("BonusTableTitle")}
            mobileCellIndex={1}
            iconProps={{
              margin: "0 0 0 1rem"
            }}
            cellTemplate={props => renderCell({ ...props, isMobile, t, theme })}
            onCellClick={item => onSetSelectedBonus(item)}
          />
        </TableWrapper>
        <Pagination
          pagination={pagination}
          onChangePageClick={onChangePageClick}
        />
      </BonusTableStyle>
    </MainWrapper>
  );
};

const BonusTableStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default withTheme(BonusesTable);
