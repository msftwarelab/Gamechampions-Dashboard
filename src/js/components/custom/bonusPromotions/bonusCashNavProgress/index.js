import React from "react";
import { useHistory } from "react-router-dom";
import { useTheme } from "styled-components";
import { FlexBox, Image, Span } from "~components/atoms";
import { IMAGES_STORAGE_URL } from "~service/constants";
import ProgressBar from "../progressBar";

const BonusCashNavProgress = ({
  currentBonusBets = 0,
  targetBonusBets = 0,
  bonusAmount,
  selectedLanguage
}) => {
  const history = useHistory();
  const theme = useTheme();

  return (
    <FlexBox
      width="100%"
      maxWidth={{ base: "18.75rem", lg: "21.875rem" }}
      padding={{ base: "0.4em 0.4em 0.4em 0", lg: "0.2em 0.4em 0.2em 0" }}
      backgroundColor={theme.colors.primaryDark}
      hoverBackgroundColor={theme.colors.primaryDark}
      position="relative"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      cursor="pointer"
      onClick={() => {
        history.push(`/${selectedLanguage}/my-account/bonus-promotions`);
      }}
    >
      <FlexBox
        position="absolute"
        top="-5px"
        left={{ base: "-24px", lg: "-14px" }}
        zIndex={1}
      >
        <Image
          src={`${IMAGES_STORAGE_URL}super-cash-icon.svg`}
          width={{ base: "48px", lg: "38px" }}
          height={{ base: "48px", lg: "38px" }}
        />
      </FlexBox>

      <ProgressBar value={(currentBonusBets / targetBonusBets) * 100} />
      <Span
        color={theme.colors.white}
        fontStyle="italic"
        fontSize={theme.fonts.large}
        fontWeight={theme.fonts.bold}
      >
        ${bonusAmount || 0}
      </Span>
    </FlexBox>
  );
};

export default BonusCashNavProgress;
