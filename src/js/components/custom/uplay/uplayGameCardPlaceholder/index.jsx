import React from "react";
import { FlexBox, Image } from "~components/atoms";
import Paragraph from "~components/atoms/paragraph";
import { STORAGE_URL } from "~service/constants";
import { styled, withTheme } from "~theme";

const UPlayGameCardPlaceholder = ({
  theme,
  title,
  thumbnail,
  iconUrl,
  bannerColor
}) => {
  const imageUrl = thumbnail.get("imageUrl")?.substring(1);

  return (
    <Wrapper>
      <FlexBox width="100%" height="200px">
        <Image
          width="100%"
          src={`${STORAGE_URL}${imageUrl}`}
          filter="grayscale(1)"
        />
      </FlexBox>
      <FlexBox
        width="100%"
        height="3.625rem"
        backgroundColor={bannerColor}
        hoverBackgroundColor={bannerColor}
        alignItems="center"
        justifyContent="center"
        gap="1rem"
      >
        <Image width="2rem" src={`${STORAGE_URL}${iconUrl?.substring(1)}`} />
        <Paragraph color={theme.colors.white}>{title}</Paragraph>
      </FlexBox>
      <WrapperComingSoon>
        <Paragraph
          color={theme.colors.white}
          fontSize="40px"
          fontWeight={theme.fonts.bold}
          textAlign="center"
        >
          OFFLINE
        </Paragraph>
      </WrapperComingSoon>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  min-width: 20rem;
  border-radius: 1.2rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: not-allowed;
  position: relative;
`;

const WrapperComingSoon = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
`;

export default withTheme(UPlayGameCardPlaceholder);
