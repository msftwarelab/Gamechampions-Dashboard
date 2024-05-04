import React from "react";
import { styled, media, withTheme } from "~theme";
import {
  ResponsiveWrapper,
  Paragraph,
  Heading,
  FlexBox,
  Thumbnail
} from "~components/atoms";
import { useTranslation } from "react-i18next";
import Button from "~components/atoms/button";

const PersonalDetails = ({
  personalDetails,
  theme,
  playerId,
  selectedLanguage,
  onChatOpen
}) => {
  const { t } = useTranslation();
  if (!personalDetails) {
    return null;
  }

  const image = personalDetails.get("thumbnail");

  return (
    <PersonalDetailsStyle>
      <ResponsiveWrapper>
        <FlexBox
          alignItems="center"
          justifyContent="space-between"
          minWidth="20em"
          width="100%"
          flexDirection={{ base: "column", md: "row" }}
        >
          {image && (
            <Thumbnail
              src={image.get("src")}
              srcSet={image.get("srcset")}
              alt={image.get("alt")}
              title={image.get("title")}
              height="70px"
              width="70px"
            />
          )}
          <FlexBox
            flexDirection="column"
            flex="1"
            margin="0 0 0 1em"
            width="100%"
            alignItems={{ base: "center", md: "normal" }}
          >
            <Heading
              as="h2"
              margin="0"
              color={theme.colors.dimGray}
              fontSize={theme.fonts.xLarge}
              padding=".5em 0"
            >
              {personalDetails.get("userName")}
            </Heading>
            <Paragraph
              color="rgba(0, 0, 0, 0.54)"
              fontSize={theme.fonts.xSmall}
              fontWeight={theme.fonts.semiBold}
            >
              {personalDetails.get("currentStaus")}
            </Paragraph>
          </FlexBox>
          <FlexBox
            flex="1"
            margin="0 0 0 1em"
            width="100%"
            alignItems={{ base: "center", md: "normal" }}
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="center"
            gap="1rem"
          >
            <Button
              width="9rem"
              height="3.9rem"
              backgroundColor={theme.colors.darkAqua}
              hoverBackgroundColor={theme.colors.darkAqua}
              onClick={() =>
                onChatOpen({
                  friendId: playerId,
                  friendImage: personalDetails.get("thumbnail").get("src"),
                  friendName: personalDetails.get("userName"),
                  hasUnreadMessages: false
                })
              }
            >
              {t("PlayerDetailsSendMessage")}
            </Button>
            <Button
              width="9rem"
              height="3.9rem"
              to={`/${selectedLanguage}/player-details/${playerId}/send-challenge`}
            >
              {t("PlayerDetailsSendChallenge")}
            </Button>
          </FlexBox>
        </FlexBox>
      </ResponsiveWrapper>
    </PersonalDetailsStyle>
  );
};

export default withTheme(PersonalDetails);

const PersonalDetailsStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1em 1.5em;
  border-radius: 2px;
  border: solid 1px #e1e1e1;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.fontColor};

  ${media.md`
    flex-direction: row;
    justify-content: space-between;
    width: auto;
  `};
`;
