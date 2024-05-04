import React, { useState } from "react";
import { withTheme, styled } from "~theme";
import { useTranslation } from "react-i18next";
import { Table } from "~components/molecules";
import { FlexBox } from "~components/atoms";
import { Button, Section, Span } from "~components/atoms";
import ConfirmBox from "~components/molecules/confirmBox";

const AffiliateUrlsTable = ({
  urls,
  isLoading,
  isMobile,
  selectedLanguage,
  theme,
  selectedAffiliate,
  onSetSelectedAffiliateUrl,
  blockAffiliateUrl,
  onSetSelectedUrl,
  selectedUrl
}) => {
  const { t } = useTranslation();
  const [isConfirmVisible, toggleConfirm] = useState(false);

  const icons = [
    {
      label: t("AffiliateUrlBlock"),
      icon: "block",
      color: (data = {}) =>
        data.isBlocked ? theme.colors.disabledColor : theme.colors.secondary,
      onClick: (data = {}) => {
        if (data.isBlocked) return;

        onSetSelectedUrl(urls.find(url => url.get("id") == data.id));
        toggleConfirm(true);
      }
    }
  ];

  const tableHeaders = [
    t("AffiliateUrlsTableFirstColumn"),
    t("AffiliateUrlsTableSecondColumn"),
    t("AffiliateUrlsTableThirdColumn"),
    t("AffiliateUrlsTableFourthColumn")
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
            {renderHeader(t("AffiliateUrlsTableFirstColumn"))}
            <Span>{item.urlShort}</Span>
          </Section>
          <Section>
            {renderHeader(t("AffiliateUrlsTableSecondColumn"))}
            <Span>{item.destination}</Span>
          </Section>
          <Section>
            {renderHeader(t("AffiliateUrlsTableThirdColumn"))}
            <Span>{item.medium}</Span>
          </Section>
          <Section>
            {renderHeader(t("AffiliateUrlsTableThirdFourth"))}
            <Span>{item.numberOfClicks}</Span>
          </Section>
        </>
      );
    }

    if (itemKey == "urlShort" || itemKey == "destination") {
      return <Span overflowWrap="anywhere">{item[itemKey]}</Span>;
    }

    return <Span>{item[itemKey]}</Span>;
  };

  let data = (urls && urls.toJS()) || [];

  return (
    <AffiliateUrlsTableStyle>
      <ConfirmBox
        isVisible={isConfirmVisible}
        title={t("SureToBlockUrl")}
        onCancel={() => {
          toggleConfirm(false);
        }}
        onConfirm={() => {
          blockAffiliateUrl(selectedUrl && selectedUrl.get("id"));
          toggleConfirm(false);
        }}
      />
      <FlexBox
        flexDirection={{ md: "row-reverse", base: "column" }}
        alignItems="center"
        padding="1em 0"
      >
        <Button
          to={`/${selectedLanguage}/affiliates/${selectedAffiliate &&
            selectedAffiliate.get?.("id")}/urls/create`}
          width={{ base: "15.5em", md: "auto" }}
          padding="0.5em 2.5em"
        >
          {t("CreateAffiliateUrl")}
        </Button>
      </FlexBox>
      <Table
        headers={tableHeaders}
        data={data.map(url => ({ ...url, isDisabled: url.isBlocked }))}
        excludedProps={[
          "id",
          "affiliateId",
          "affiliateName",
          "isBlocked",
          "isDisabled"
        ]}
        isLoading={isLoading}
        icons={icons}
        noResultLabel="TableNotFound"
        title={t("AffiliateUrlsTableTitle")}
        mobileCellIndex={1}
        onCellClick={data => {
          onSetSelectedAffiliateUrl(urls.find(url => url.get("id") == data.id));
        }}
        urlConstructor={item => {
          return `/${selectedLanguage}/affiliates/${selectedAffiliate &&
            selectedAffiliate.get?.("id")}/urls/${item.id}/update`;
        }}
        iconProps={{
          margin: "0 0 0 1rem"
        }}
        cellTemplate={props => renderCell({ ...props, isMobile, t, theme })}
      />
    </AffiliateUrlsTableStyle>
  );
};

const AffiliateUrlsTableStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default withTheme(AffiliateUrlsTable);
