import React from "react";
import { withTheme, styled } from "~theme";
import MainWrapper from "~components/custom/mainWrapper";
import { useTranslation } from "react-i18next";
import { Table, Pagination } from "~components/molecules";
import TableWrapper from "../players/playersTable/tableWrapper";
import { Section, Span } from "~components/atoms";

const DuplicateIpsDetailTable = ({
  duplicateIpDetail,
  isLoading,
  onChangePageClick,
  isMobile,
  theme,
  pagination,
  selectedLanguage,
  params,
  history
}) => {
  const { t } = useTranslation();

  const icons = [
    {
      label: t("PlayersTableBlock"),
      icon: "block",
      color: (data = {}) =>
        data.isBlocked ? theme.colors.errorColor : theme.colors.secondary,
      onClick: (data = {}) => {
        history.push(`/${selectedLanguage}/all-players/${data.id}/block`);
      }
    }
  ];

  const tableHeaders = [
    t("DuplicateIpsDetailTableFirstColumn"),
    t("DuplicateIpsDetailTableSecondColumn"),
    t("DuplicateIpsDetailTableThirdColumn"),
    t("DuplicateIpsDetailTableFourthColumn")
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
            {renderHeader(t("DuplicateIpsDetailTableFirstColumn"))}
            <Span>{item.fullName}</Span>
          </Section>
          <Section>
            {renderHeader(t("DuplicateIpsDetailTableSecondColumn"))}
            <Span>{item.email}</Span>
          </Section>
          <Section>
            {renderHeader(t("DuplicateIpsDetailTableThirdColumn"))}
            <Span>{item.dateOfBirth}</Span>
          </Section>
          <Section>
            {renderHeader(t("DuplicateIpsDetailTableFourthColumn"))}
            <Span>{item.country}</Span>
          </Section>
        </>
      );
    }

    return <Span overflowWrap="anywhere">{item[itemKey]}</Span>;
  };
  let data = (duplicateIpDetail && duplicateIpDetail.toJS()) || [];
  return (
    <MainWrapper height="unset">
      <DuplicateIpsDetailTableStyle>
        <TableWrapper noScroll={true}>
          <Table
            headers={tableHeaders}
            data={data}
            isLoading={isLoading}
            icons={icons}
            noResultLabel="TableNotFound"
            title={t("AffiliatesTableTitle")}
            mobileCellIndex={1}
            iconProps={{
              margin: "0 0 0 1rem"
            }}
            cellTemplate={props => renderCell({ ...props, isMobile, t, theme })}
            excludedProps={["id"]}
          />
        </TableWrapper>
        <Pagination
          params={params}
          pagination={pagination}
          onChangePageClick={onChangePageClick}
        />
      </DuplicateIpsDetailTableStyle>
    </MainWrapper>
  );
};

const DuplicateIpsDetailTableStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 2%;
`;

export default withTheme(DuplicateIpsDetailTable);
