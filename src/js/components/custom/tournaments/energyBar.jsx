import React from "react";
import { useTheme } from "styled-components";
import { FlexBox, Image } from "~components/atoms";

const BarIcon = () => (
  <FlexBox
    justifyContent="center"
    alignItems="center"
    position="absolute"
    left="-1rem"
    zIndex="2"
  >
    <Image
      src="/img/icons/energy-hexagon.svg"
      alt="Energy Hexagon"
      height="3.125rem"
      width="3.125rem"
    />
  </FlexBox>
);

const EnergyBar = ({
  width = "100%",
  showIcon = false,
  availableFreeMatches,
  numberOfFreeMatchesPlayed
}) => {
  const theme = useTheme();
  const remainingEnergyWidth =
    (numberOfFreeMatchesPlayed / availableFreeMatches) * 100;

  return (
    <FlexBox
      alignItems="center"
      justifyContent="center"
      position="relative"
      margin={showIcon ? ".4rem .65rem" : ""}
      width={width}
    >
      {showIcon && <BarIcon />}
      <FlexBox
        backgroundColor={theme.colors.greySoft}
        hoverBackgroundColor={theme.colors.greySoft}
        width="100%"
        height="1.69rem"
        borderRadius="5px"
        position="relative"
      >
        <FlexBox
          position="absolute"
          height="100%"
          width="100%"
          color={theme.colors.white}
          alignItems="center"
          justifyContent="center"
          fontWeight="700"
          fontSize="0.875rem"
          textShadow={`0 0 3px ${theme.colors.black}`}
        >{`${numberOfFreeMatchesPlayed}/${availableFreeMatches}`}</FlexBox>
        <FlexBox
          width={`${remainingEnergyWidth}%`}
          height="100%"
          backgroundColor={theme.colors.energyColor}
          hoverBackgroundColor={theme.colors.energyColor}
          borderRadius="5px"
        ></FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default EnergyBar;
