import React from "react";
import { styled, media, withTheme } from "~theme";
import { Heading, Paragraph, FlexBox } from "~components/atoms";
import { ShareThisLinks } from "~components/custom/shareThisLinks";
import { WEBSITE_URL } from "~containers/addFriend/constants";
import { MATCH_STATUS } from "~containers/matchLobby/constants";
import { useTranslation } from "react-i18next";

const SocialSection = ({ match, matchStatus, theme }) => {
  const { t } = useTranslation();
  const shareUrl = WEBSITE_URL; // TODO: this will be changed to /registration and maybe ?referrerId=${referrerId} will be added
  let shareDescription = `${t("SocialSectionSharePlayerText")} ${match.get(
    "gameTitle"
  )}.`;

  if (matchStatus && matchStatus.get("status") === MATCH_STATUS.COMPLETED) {
    if (
      matchStatus.get("isChallenger") &&
      match.get("score").get("challenger") >
        match.get("score").get("challengee")
    ) {
      shareDescription = `${t("SocialSectionShareWinnerText")} ${match
        .get("score")
        .get("challenger")} : ${match
        .get("score")
        .get("challengee")} on ${match.get("gameTitle")}.`;
    } else if (
      !matchStatus.get("isChallenger") &&
      match.get("score").get("challenger") <
        match.get("score").get("challengee")
    ) {
      shareDescription = `${t("SocialSectionShareWinnerText")} ${match
        .get("score")
        .get("challengee")} : ${match
        .get("score")
        .get("challenger")} on ${match.get("gameTitle")}.`;
    }
  }

  return (
    <SocialSectionStyle>
      <Heading
        as="h2"
        fontSize={theme.fonts.xSmall}
        fontWeight={theme.fonts.semiBold}
        textTransform="uppercase"
        margin="0"
      >
        {t("SocialSectionShareTitle")}
      </Heading>
      <Paragraph fontSize={theme.fonts.xSmall} lineHeight="1.5">
        {t("SocialSectionShareResultText")}
      </Paragraph>
      <FlexBox margin="0.5em 0 0">
        <ShareThisLinks
          image={match.get("bannerImageUrl")}
          title={match.get("gameTitle")}
          description={shareDescription}
          url={shareUrl}
        />
      </FlexBox>
    </SocialSectionStyle>
  );
};

export default withTheme(SocialSection);

const SocialSectionStyle = styled.div`
  color: ${({ theme }) => theme.colors.fontColor};
  padding: 1em 0;

  ${media.md`
    padding: 0 1em 1em;
  `};
`;
