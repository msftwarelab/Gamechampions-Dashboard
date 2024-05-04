import React from "react";
import { useHistory } from "react-router-dom";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { FlexBox, Image } from "~components/atoms";

const BonusCashNavWelcome = ({ selectedLanguage }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <FlexBox
      width="18.925rem"
      height="6rem"
      backgroundColor={theme.colors.welcomeBonusBgColor}
      hoverBackgroundColor={theme.colors.welcomeBonusBgColor}
      color={theme.colors.primary}
      position="fixed"
      alignContent="center"
      zIndex="10"
      bottom="2rem"
      right={{ base: "0", md: "2rem" }}
      left={{ base: "0", md: "unset" }}
      margin={{ base: "auto", md: "unset" }}
      borderRadius="6.25rem"
      alignItems="center"
      padding="0 1rem 0 0"
      cursor="pointer"
      onClick={() => {
        history.push(`/${selectedLanguage}/arena/get-bonus`);
      }}
      className="backdropFilter"
    >
      <Image src="/img/cash_face_new.png" width="9.25rem" objectFit="Fill" />
      <FlexBox flexDirection="column" gap="0.4rem">
        <FlexBox fontSize="1.4rem" fontWeight="700" lineHeight="23.7px">
          {t("WelcomeBonusTitle5")}
        </FlexBox>
        <FlexBox fontSize="0.9rem" fontWeight="400" lineHeight="1.1rem">
          Get $20 Bonus Cash with your First Deposit
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default BonusCashNavWelcome;
