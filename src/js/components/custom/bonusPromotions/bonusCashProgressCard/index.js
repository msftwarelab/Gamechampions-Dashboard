import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { FlexBox, Heading, Image, Span } from "~components/atoms";
import { IMAGES_STORAGE_URL } from "~service/constants";
import ProgressBar from "../progressBar";

const BonusCashProgressCard = ({
  bonusCampaignTitle,
  currentBonusBets,
  targetBonusBets,
  bonusAmount,
  expiryDate,
  status
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <FlexBox
      width="100%"
      maxWidth="26.25rem"
      padding="1.5em 1em"
      backgroundColor={theme.colors.backgroundColor}
      borderRadius="20px"
      hoverBackgroundColor={theme.colors.backgroundColor}
    >
      <FlexBox width="5rem" justifyContent="center">
        <Image
          src={`${IMAGES_STORAGE_URL}super-cash-icon.svg`}
          width="3rem"
          height="3rem"
        />
      </FlexBox>

      <FlexBox flex="1" flexDirection="column">
        <Heading
          fontSize={theme.fonts.xLarge}
          fontWeight={theme.fonts.bold}
          margin="0"
        >
          {bonusCampaignTitle}
        </Heading>
        <Span
          fontSize={theme.fonts.small}
          fontWeight={theme.fonts.semiBold}
          margin="0.8em 0 0 0"
        >
          {`${t("BonusCampaignExpiryDateLabel", {
            expiryDate: moment(expiryDate).format("DD/MM/YYYY, h:mm a")
          })}`}
        </Span>
        <Span
          fontSize={theme.fonts.small}
          fontWeight={theme.fonts.semiBold}
          margin="0.6em 0 0 0"
        >
          {`${t("BonusCampaignWagerRequirementsLabel", { targetBonusBets })}`}
        </Span>

        <FlexBox
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          margin="0.6em 0 0 0"
        >
          <ProgressBar value={(currentBonusBets / targetBonusBets) * 100} />
          <Span
            color={theme.colors.secondary}
            fontSize={theme.fonts.xLarge}
            fontWeight={theme.fonts.extraBold}
          >
            ${bonusAmount}
          </Span>
        </FlexBox>

        <Span
          color={theme.colors.greyLight}
          fontSize={theme.fonts.small}
          margin="0.6em 0 0 0"
          textAlign="center"
        >
          {`${t("BonusCampaignProgressLabel", {
            currentBonusBets,
            targetBonusBets
          })}`}
        </Span>
      </FlexBox>

      <FlexBox width="5rem" justifyContent="center">
        {status === 2 && (
          <Image
            src={`${IMAGES_STORAGE_URL}active-direct-bonus-check-icon.svg`}
            width="3rem"
            height="3rem"
          />
        )}
      </FlexBox>
    </FlexBox>
  );
};

export default BonusCashProgressCard;
