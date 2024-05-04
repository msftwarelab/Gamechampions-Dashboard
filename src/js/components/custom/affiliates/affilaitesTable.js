import React, { useState } from "react";
import { withTheme, styled } from "~theme";
import MainWrapper from "~components/custom/mainWrapper";
import { useTranslation } from "react-i18next";
import { Table, Pagination } from "~components/molecules";
import TableWrapper from "../players/playersTable/tableWrapper";
import { FlexBox } from "~components/atoms";
import { Button, Section, Span } from "~components/atoms";
import ConfirmBox from "~components/molecules/confirmBox";

const AffiliatesTable = ({
  affiliates,
  isLoading,
  pagination,
  onChangePageClick,
  isMobile,
  selectedLanguage,
  theme,
  history,
  onSetSelectedAffiliate,
  blockAffiliate,
  selectedAffiliate
}) => {
  const { t } = useTranslation();
  const [isConfirmVisible, toggleConfirm] = useState(false);

  const icons = [
    {
      label: t("AffiliateUrls"),
      color: (data = {}) =>
        data.numberOfTransactions > 0 ? theme.colors.green : null,
      icon: "link",
      onClick: (data = {}) => {
        onSetSelectedAffiliate(
          affiliates.find(affiliate => affiliate.get("id") == data.id)
        );
        history.push(`/${selectedLanguage}/affiliates/${data.id}/urls`);
      }
    },
    {
      label: t("AffiliatePromotions"),
      color: (data = {}) =>
        data.numberOfTransactions > 0 ? theme.colors.green : null,
      icon: "promotion",
      onClick: (data = {}) => {
        onSetSelectedAffiliate(
          affiliates.find(affiliate => affiliate.get("id") == data.id)
        );
        history.push(
          `/${selectedLanguage}/affiliates/${data.id}/affiliate-promotions`
        );
      }
    },
    {
      label: t("AffiliateReporting"),
      icon: "report",
      onClick: (data = {}) => {
        onSetSelectedAffiliate(
          affiliates.find(affiliate => affiliate.get("id") == data.id)
        );
        history.push(
          `/${selectedLanguage}/affiliates/${data.id}/affiliate-reporting`
        );
      }
    },
    {
      label: t("AffiliateBlock"),
      icon: "block",
      color: (data = {}) =>
        data.isBlocked ? theme.colors.disabledColor : theme.colors.secondary,
      onClick: (data = {}) => {
        if (data.isBlocked) return;

        onSetSelectedAffiliate(
          affiliates.find(affiliate => affiliate.get("id") == data.id)
        );

        toggleConfirm(true);
      }
    }
  ];

  const tableHeaders = [
    t("AffiliatesTableFirstColumn"),
    t("AffiliatesTableSecondColumn"),
    t("AffiliatesTableThirdColumn")
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
            {renderHeader(t("AffiliatesTableFirstColumn"))}
            <Span>{item.fullName}</Span>
          </Section>
          <Section>
            {renderHeader(t("AffiliatesTableSecondColumn"))}
            <Span>{item.email}</Span>
          </Section>
          <Section>
            {renderHeader(t("AffiliatesTableThirdColumnMobile"))}
            <Span>{item.dateRegistered}</Span>
          </Section>
        </>
      );
    }

    return <Span overflowWrap="anywhere">{item[itemKey]}</Span>;
  };
  let data = (affiliates && affiliates.toJS()) || [];
  return (
    <MainWrapper height="unset">
      <AffiliatesTableStyle>
        <ConfirmBox
          isVisible={isConfirmVisible}
          title={t("SureToBlockPlayer", {
            affiliateName:
              selectedAffiliate && selectedAffiliate.get("fullName")
          })}
          onCancel={() => {
            toggleConfirm(false);
          }}
          onConfirm={() => {
            blockAffiliate({
              id: selectedAffiliate && selectedAffiliate.get("id"),
              page: pagination && pagination.get("page"),
              pageSize: pagination.get("pageSize")
            });
            toggleConfirm(false);
          }}
        />
        <FlexBox
          flexDirection={{ md: "row-reverse", base: "column" }}
          alignItems="center"
          padding="1em 0.5em"
        >
          <Button
            to={`/${selectedLanguage}/affiliates/new/create`}
            width={{ base: "15.5em", md: "auto" }}
            padding="0.5em 2.5em"
          >
            {t("CreateAffiliate")}
          </Button>
        </FlexBox>
        <TableWrapper noScroll={true}>
          <Table
            headers={tableHeaders}
            data={data.map(affiliate => ({
              ...affiliate,
              isDisabled: affiliate.isBlocked
            }))}
            excludedProps={[
              "id",
              "urls",
              "lifetimeValue",
              "commission",
              "isBlocked",
              "isDisabled"
            ]}
            isLoading={isLoading}
            icons={icons}
            noResultLabel="TableNotFound"
            title={t("AffiliatesTableTitle")}
            mobileCellIndex={1}
            urlConstructor={item => {
              return `/${selectedLanguage}/affiliates/${item.id}/update`;
            }}
            iconProps={{
              margin: "0 0 0 1rem"
            }}
            cellTemplate={props => renderCell({ ...props, isMobile, t, theme })}
            onCellClick={data => {
              onSetSelectedAffiliate(
                affiliates.find(affiliate => affiliate.get("id") == data.id)
              );
            }}
          />
        </TableWrapper>
        <Pagination
          pagination={pagination}
          onChangePageClick={onChangePageClick}
        />
      </AffiliatesTableStyle>
    </MainWrapper>
  );
};

const AffiliatesTableStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default withTheme(AffiliatesTable);
