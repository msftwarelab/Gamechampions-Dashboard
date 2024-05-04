import React, { useState } from "react";
import { withTheme, styled } from "~theme";
import MainWrapper from "~components/custom/mainWrapper";
import { useTranslation } from "react-i18next";
import { Table } from "~components/molecules";
import TableWrapper from "../players/playersTable/tableWrapper";
import { FlexBox } from "~components/atoms";
import { Button, Section, Span } from "~components/atoms";
import ConfirmBox from "~components/molecules/confirmBox";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";

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

const AffiliatePromotionsTable = ({
  promotions,
  isLoading,
  isMobile,
  selectedLanguage,
  theme,
  history,
  selectedPromotion,
  onPromotionDelete,
  onSetSelectedPromotion,
  selectedAffiliate,
  returnUrl,
  page
}) => {
  const { t } = useTranslation();
  const [isConfirmVisible, toggleConfirm] = useState(false);

  const icons = [
    {
      label: t("PromotionBlock"),
      icon: "delete",
      onClick: (data = {}) => {
        onSetSelectedPromotion(
          promotions.find(promtion => promtion.id == data.id)
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
    <Modal onClick={() => history.push(returnUrl)}>
      <Card
        htmlProps={{
          margin: "1rem 0"
        }}
        padding="1rem 0.5rem"
        title={page.get("title")}
        closeUrl={returnUrl}
        className="player-matches-table-card"
      >
        <MainWrapper>
          <AffiliatePromotionsTableStyle>
            <ConfirmBox
              isVisible={isConfirmVisible}
              title={t("SureToDeletePromotionFromUser", {
                promtionTitle: selectedPromotion
                  ? selectedPromotion.get("title")
                  : "",
                user: selectedAffiliate && selectedAffiliate.get("fullName")
              })}
              onCancel={() => {
                toggleConfirm(false);
              }}
              onConfirm={() => {
                let data = {};
                data.promotionId =
                  selectedPromotion && selectedPromotion.get("id");
                data.affiliateId =
                  selectedAffiliate && selectedAffiliate.get("id");
                onPromotionDelete(data);
                toggleConfirm(false);
              }}
            />
            <FlexBox
              flexDirection={{ md: "row-reverse", base: "column" }}
              alignItems="center"
              padding="1em 0.5em"
            >
              <Button
                to={`/${selectedLanguage}/affiliates/${selectedAffiliate &&
                  selectedAffiliate.get("id")}/promote`}
                width={{ base: "15.5em", md: "auto" }}
                padding="0.5em 2.5em"
              >
                {t("LinkPromotionToAffiliate")}
              </Button>
            </FlexBox>
            <TableWrapper noScroll={true}>
              <Table
                headers={tableHeaders}
                data={getData(promotions ? promotions : [], t)}
                excludedProps={["id", "description"]}
                isLoading={isLoading}
                icons={icons}
                noResultLabel="TableNotFound"
                title={t("AffiliatesTableTitle")}
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
          </AffiliatePromotionsTableStyle>
        </MainWrapper>
      </Card>
    </Modal>
  );
};

const AffiliatePromotionsTableStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default withTheme(AffiliatePromotionsTable);
