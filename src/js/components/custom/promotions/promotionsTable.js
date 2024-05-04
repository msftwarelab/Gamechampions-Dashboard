import React, { useState } from "react";
import { withTheme, styled } from "~theme";
import MainWrapper from "~components/custom/mainWrapper";
import { useTranslation } from "react-i18next";
import { Table, Pagination } from "~components/molecules";
import TableWrapper from "../players/playersTable/tableWrapper";
import { FlexBox } from "~components/atoms";
import { Button, Section, Span } from "~components/atoms";
import ConfirmBox from "~components/molecules/confirmBox";

const getData = (data = [], t) => {
  return data.map(item => {
    return {
      id: item.id,
      title: item.title,
      commissionType: t(item.commissionType),
      type: t(item.type),
      description: item.description,
      commission: item.commission ? `${item.commission}%` : "N/A",
      fixedCommission: item.fixedCommission
        ? `$ ${item.fixedCommission.toFixed(2)}`
        : "N/A"
    };
  });
};

const PromotionsTable = ({
  promtions,
  isLoading,
  pagination,
  onChangePageClick,
  isMobile,
  selectedLanguage,
  theme,
  selectedPromotion,
  onPromotionDelete,
  onSetSelectedPromotion
}) => {
  const { t } = useTranslation();
  const [isConfirmVisible, toggleConfirm] = useState(false);

  const icons = [
    {
      label: t("PromotionBlock"),
      icon: "delete",
      onClick: (data = {}) => {
        onSetSelectedPromotion(
          promtions && promtions.find(promtion => promtion.get("id") == data.id)
        );
        toggleConfirm(true);
      }
    }
  ];

  const tableHeaders = [
    t("PromotionsTableFirstColumn"),
    t("PromotionsTableSecondColumn"),
    t("PromotionsTableThirdColumn"),
    t("PromotionsTableForthColumn"),
    t("PromotionsTableFifthColumn")
  ];

  const renderCell = ({ item, itemKey, isMobile, t, theme }) => {
    if (isMobile) {
      const renderHeader = header => {
        return (
          <Span
            display="inline-block"
            fontWeight={theme.fonts.semiBold}
            minWidth="9rem"
          >
            {header}
          </Span>
        );
      };

      return (
        <>
          <Section>
            {renderHeader(t("PromotionsTableFirstColumn"))}
            <Span>{item.title}</Span>
          </Section>
          <Section>
            {renderHeader(t("PromotionsTableSecondColumn"))}
            <Span>{item.commissionType}</Span>
          </Section>
          <Section>
            {renderHeader(t("PromotionsTableThirdColumn"))}
            <Span>{item.type}</Span>
          </Section>
          <Section>
            {renderHeader(t("PromotionsTableForthColumn"))}
            <Span>{item.commission}</Span>
          </Section>
          <Section>
            {renderHeader(t("PromotionsTableFifthColumn"))}
            <Span>{item.fixedCommission}</Span>
          </Section>
        </>
      );
    }

    return <Span overflowWrap="anywhere">{item[itemKey]}</Span>;
  };

  return (
    <MainWrapper height="unset">
      <AffiliatesTableStyle>
        <ConfirmBox
          isVisible={isConfirmVisible}
          title={t("SureToDeletePromotion", {
            promtionTitle: selectedPromotion
              ? selectedPromotion.get("title")
              : ""
          })}
          onCancel={() => {
            toggleConfirm(false);
          }}
          onConfirm={() => {
            onPromotionDelete({
              id: selectedPromotion && selectedPromotion.get("id"),
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
            to={`/${selectedLanguage}/promotions/create-promotion`}
            width={{ base: "15.5em", md: "auto" }}
            padding="0.5em 2.5em"
          >
            {t("CreatePromotion")}
          </Button>
        </FlexBox>
        <TableWrapper noScroll={true}>
          <Table
            headers={tableHeaders}
            data={getData(promtions && promtions.toJS(), t)}
            excludedProps={["id", "description"]}
            isLoading={isLoading}
            icons={icons}
            noResultLabel="TableNotFound"
            title={t("AffiliatesTableTitle")}
            mobileCellIndex={1}
            urlConstructor={item => {
              return `/${selectedLanguage}/promotions/${item.id}/update-promotion`;
            }}
            iconProps={{
              margin: "0 0 0 1rem"
            }}
            cellTemplate={props => renderCell({ ...props, isMobile, t, theme })}
            onCellClick={data => {
              onSetSelectedPromotion(
                promtions &&
                  promtions.find(promtion => promtion.get("id") == data.id)
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

export default withTheme(PromotionsTable);
