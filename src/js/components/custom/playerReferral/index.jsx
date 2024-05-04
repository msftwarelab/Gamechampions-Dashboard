import React from "react";
import { styled, withTheme } from "~theme";
import Card from "../../card/card";
import {
  Paragraph,
  FlexBox,
  Heading,
  Span,
  Icon,
  Section
} from "~components/atoms";
import { ShareThisLinks } from "../shareThisLinks";
import { useTranslation } from "react-i18next";

const PlayerReferral = ({ referralLink = {}, theme = {}, isMobile }) => {
  const { link = {}, totalCommissionAmount = 0, totalPayout = 0 } =
    referralLink || {};
  const { urlShort } = link;
  const { t } = useTranslation();

  return (
    <Card cardClassName="fullscreen">
      <PlayerReferralStyle>
        <FlexBox
          backgroundColor={theme.colors.primary}
          hoverBackgroundColor={theme.colors.primary}
          color={theme.colors.white}
          flexDirection="column"
          padding="1rem 1rem 0 1rem"
        >
          <Heading fontSize="1.5rem" margin="1rem 0" color={theme.colors.green}>
            {t("AffiliateReferralHeading")}
          </Heading>
          <Section
            margin="1rem 0"
            color={theme.colors.white}
            dangerouslySetInnerHTML={{
              __html: t("AffiliateReferralDescription", {
                interpolation: { escapeValue: false }
              })
            }}
          />
          <Paragraph margin="0 0 1rem">
            {t("AffiliateReferralSecondDescription")}
          </Paragraph>
          <CopyClipboardStyle
            onClick={() => {
              navigator.clipboard.writeText(urlShort);
            }}
          >
            <FlexBox
              flexDirection={isMobile ? "column" : "row"}
              justifyContent={isMobile ? "center" : "space-between"}
              alignItems="center"
              backgroundColor={theme.colors.primaryLighterSecond}
              hoverBackgroundColor={theme.colors.primaryLighterSecond}
              padding="0.5rem"
              color={theme.colors.white}
              borderRadius="5px"
              cursor="pointer"
              margin="1rem 0"
            >
              <Span>{urlShort}</Span>
              <FlexBox>
                <Icon scale="1.5" icon="content_copy" />
              </FlexBox>
            </FlexBox>
          </CopyClipboardStyle>
        </FlexBox>
        <FlexBox
          backgroundColor={theme.colors.primary}
          hoverBackgroundColor={theme.colors.primary}
          justifyContent="center"
        >
          <Paragraph color={theme.colors.white} margin="1rem 0">
            {t("AffiliateReferralOr")}
          </Paragraph>
        </FlexBox>
        <FlexBox
          justifyContent="center"
          padding="1rem"
          backgroundColor={theme.colors.primary}
          hoverBackgroundColor={theme.colors.primary}
        >
          <ShareThisLinks
            buttonSize={isMobile ? 45 : 50}
            buttonMargin={isMobile ? "0 5px 0 0" : null}
            url={urlShort}
          />
        </FlexBox>

        <FlexBox fontSize="1.25rem">
          <FlexBox
            justifyContent="center"
            flexDirection="column"
            flex="1"
            backgroundColor={theme.colors.primary}
            hoverBackgroundColor={theme.colors.primary}
            padding="1rem"
            color={theme.colors.white}
            borderRadius="5px"
            margin="1rem 1rem 1rem 0"
            minHeight="10rem"
          >
            <Paragraph margin="0 0 1rem 0">
              {t("AffiliateReferralMoneyReferrals")}
            </Paragraph>
            <Paragraph>
              {t("AffiliateReferralTotalEarned")}
              <Span
                color={theme.colors.green}
              >{`$${totalCommissionAmount}`}</Span>
            </Paragraph>
          </FlexBox>
          <FlexBox
            justifyContent="center"
            flexDirection="column"
            flex="1"
            backgroundColor={theme.colors.primary}
            hoverBackgroundColor={theme.colors.primary}
            padding="1rem"
            color={theme.colors.white}
            borderRadius="5px"
            cursor="pointer"
            margin="1rem 0"
            minHeight="10rem"
          >
            <Paragraph margin="0 0 1rem 0">
              {t("AffiliateReferralPayments")}
            </Paragraph>
            <Paragraph>
              {t("AffiliateReferralTotalPaid")}
              <Span color={theme.colors.green}>{`$${totalPayout}`}</Span>
            </Paragraph>
          </FlexBox>
        </FlexBox>

        <FlexBox
          justifyContent="center"
          flexDirection="column"
          flex="1"
          backgroundColor={theme.colors.primary}
          hoverBackgroundColor={theme.colors.primary}
          padding="1rem"
          color={theme.colors.white}
          borderRadius="5px"
          minHeight="10rem"
        >
          <Paragraph color={theme.colors.white} margin="1rem 0">
            {t("AffiliateReferralFinePrint")}
          </Paragraph>
          <Section
            margin="1rem 0"
            color={theme.colors.white}
            dangerouslySetInnerHTML={{
              __html: t("AffiliateReferralFinePrintSupport", {
                interpolation: { escapeValue: false }
              })
            }}
          />
        </FlexBox>
      </PlayerReferralStyle>
    </Card>
  );
};

export default withTheme(PlayerReferral);

const PlayerReferralStyle = styled("div")`
  max-width: 64rem;
`;

const CopyClipboardStyle = styled("button")`
  position: relative;
  padding: 0;
  margin: 0;
  outline: 0 !important;
  border: none;
  background: none;

  &:after {
    content: "Copy to Clipboard";
    display: none;
    position: absolute;
    z-index: 9999;
    bottom: -2rem;
    left: 40%;
    width: 114px;
    height: 36px;

    color: #fff;
    font-size: 10px;
    line-height: 36px;
    text-align: center;

    background: rgba(0, 0, 0, 0.72);
    border-radius: 3px;
  }

  &:hover {
    &:before,
    &:after {
      display: block;
    }
  }

  &:active,
  &:focus {
    outline: none;

    &:after {
      content: "Copied!";
    }
  }
`;
