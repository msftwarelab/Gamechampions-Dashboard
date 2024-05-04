import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { FlexBox, Span } from "~components/atoms";
import BonusCashProgressCard from "./bonusCashProgressCard";

const BonusPromotions = ({ playerLinkedBonusCampaigns }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return !playerLinkedBonusCampaigns ||
    playerLinkedBonusCampaigns.length === 0 ? (
    <FlexBox justifyContent="center" padding="2rem 0">
      <Span
        fontSize={theme.fonts.small}
        fontWeight={theme.fonts.semiBold}
        margin="1em 0"
      >
        {t("BonusPromotionsNoCampaigns")}
      </Span>
    </FlexBox>
  ) : (
    <FlexBox flexDirection="column">
      <Span
        fontSize={theme.fonts.small}
        fontWeight={theme.fonts.semiBold}
        margin="1em 0"
      >
        {t("BonusPromotionsHeaderLabel")}
        <a
          href="https://www.gamechampions.com/terms-of-use/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Span>{t("RegisterTermsLinkLabel")}</Span>
        </a>
      </Span>

      <FlexBox flexWrap="wrap" gap="1em">
        {playerLinkedBonusCampaigns &&
          playerLinkedBonusCampaigns.length > 0 &&
          playerLinkedBonusCampaigns.map(linkedCampaign => (
            <BonusCashProgressCard
              key={linkedCampaign.playerBonusCampaignId}
              bonusCampaignTitle={linkedCampaign.bonusCampaignTitle}
              currentBonusBets={linkedCampaign.currentBonusBets}
              targetBonusBets={linkedCampaign.targetBonusBets}
              expiryDate={linkedCampaign.expiryDate}
              bonusAmount={linkedCampaign.bonusAmount}
              status={linkedCampaign.status}
            />
          ))}
      </FlexBox>
    </FlexBox>
  );
};

export default BonusPromotions;
