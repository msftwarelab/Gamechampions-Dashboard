import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { FlexBox, Paragraph } from "~components/atoms";
import { withTheme } from "~theme";
import Paypal from "./paypal";
import Applepay from "./applepay";
import { Image } from "~components/atoms";
import Bitcoin from "./bitcoin";
import Gpay from "./gpay";
import Visa from "./visa";
import Mastercard from "./mastercard";
import { selectIsMobile } from "~containers/app/reducer";

const Footer = ({ theme, t, dashboardFooter, selectedLanguage, isMobile }) => {
  if (!dashboardFooter) return <></>;
  return (
    <FlexBox flexDirection="column">
      <FlexBox
        width="100%"
        flexDirection="column"
        padding={{ base: "1.75rem 2rem 2rem", md: "1.75rem 3rem 2rem" }}
        gap="1rem"
        backgroundColor={theme.colors.primary}
        hoverBackgroundColor={theme.colors.primary}
        borderRadius="2.5rem"
        margin="1rem 0"
      >
        <FlexBox justifyContent="center" alignItems="center">
          <Link to={`/${selectedLanguage}`}>
            <Image
              src="/img/linear_logo.svg"
              title="game-champions"
              alt="game-champions"
              className="footer__logo__img"
            />
          </Link>
        </FlexBox>
        <FlexBox
          width="100%"
          justifyContent="space-between"
          color={theme.colors.bluishGrey}
          flexWrap="wrap"
          gap="2rem"
        >
          <FlexBox>
            <div
              className={
                dashboardFooter.get("quicklinks") === undefined
                  ? ""
                  : dashboardFooter.get("quicklinks").size > 0 &&
                    dashboardFooter.get("quicklinks").size < 4
                  ? "quick-links__column_1"
                  : "quick-links__column_2"
              }
            >
              {dashboardFooter.get("quicklinks") &&
                dashboardFooter.get("quicklinks").size > 0 &&
                dashboardFooter.get("quicklinks").map((n, index) => (
                  <React.Fragment key={index}>
                    {n.get("link") && (
                      <>
                        {n.get("link").get("isInternal") ? (
                          <Link
                            key={n.get("id")}
                            to={n.get("link").get("url")}
                            target={
                              n.get("link").get("isNewWindow") ? "_blank" : ""
                            }
                            className="quick-links__item__link"
                          >
                            {n.get("header")}
                          </Link>
                        ) : (
                          <a
                            href={n.get("link").get("url")}
                            target={
                              n.get("link").get("isNewWindow") ? "_blank" : ""
                            }
                            key={n.get("id")}
                            rel="noopener"
                            className="quick-links__item__link"
                          >
                            {n.get("header")}
                          </a>
                        )}
                      </>
                    )}
                  </React.Fragment>
                ))}
            </div>
          </FlexBox>
          <FlexBox gap="1.5rem" justifyContent="center" flexWrap="wrap">
            <ul className="social-links">
              {dashboardFooter.get("socialLinks") &&
                dashboardFooter.get("socialLinks").size > 0 &&
                dashboardFooter.get("socialLinks").map(n => (
                  <li key={n.get("id")} className="social-links__item">
                    <a
                      href={n.get("url")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-links__item__link ${n
                        .get("platform")
                        .toLowerCase()
                        .replace(/\s/, "-")}`}
                    >
                      {n.get("platform")}
                    </a>
                  </li>
                ))}
            </ul>
          </FlexBox>
        </FlexBox>
        <FlexBox
          width="100%"
          color={theme.colors.bluishGrey}
          fontSize={theme.fonts.small}
          dangerouslySetInnerHTML={{
            __html: dashboardFooter.get("footerContent")
              ? dashboardFooter.get("footerContent")
              : ""
          }}
        />
        <FlexBox
          width="100%"
          justifyContent="center"
          gap="0.75rem"
          flexWrap="wrap"
        >
          <FlexBox
            width="5.1rem"
            height="3.4rem"
            borderRadius="0.5rem"
            backgroundColor={theme.colors.primaryLightSecond}
            hoverBackgroundColor={theme.colors.primaryLightSecond}
            alignItems="center"
            justifyContent="center"
          >
            <Visa />
          </FlexBox>
          <FlexBox
            width="5.1rem"
            height="3.4rem"
            borderRadius="0.5rem"
            backgroundColor={theme.colors.primaryLightSecond}
            hoverBackgroundColor={theme.colors.primaryLightSecond}
            alignItems="center"
            justifyContent="center"
          >
            <Mastercard />
          </FlexBox>
          <FlexBox
            width="5.1rem"
            height="3.4rem"
            borderRadius="0.5rem"
            backgroundColor={theme.colors.primaryLightSecond}
            hoverBackgroundColor={theme.colors.primaryLightSecond}
            alignItems="center"
            justifyContent="center"
          >
            <Paypal />
          </FlexBox>
          <FlexBox
            width="5.1rem"
            height="3.4rem"
            borderRadius="0.5rem"
            backgroundColor={theme.colors.primaryLightSecond}
            hoverBackgroundColor={theme.colors.primaryLightSecond}
            alignItems="center"
            justifyContent="center"
          >
            <Applepay />
          </FlexBox>
          <FlexBox
            width="5.1rem"
            height="3.4rem"
            borderRadius="0.5rem"
            backgroundColor={theme.colors.primaryLightSecond}
            hoverBackgroundColor={theme.colors.primaryLightSecond}
            alignItems="center"
            justifyContent="center"
          >
            <Gpay />
          </FlexBox>
          <FlexBox
            width="5.1rem"
            height="3.4rem"
            borderRadius="0.5rem"
            backgroundColor={theme.colors.primaryLightSecond}
            hoverBackgroundColor={theme.colors.primaryLightSecond}
            alignItems="center"
            justifyContent="center"
          >
            <Bitcoin />
          </FlexBox>
        </FlexBox>
        <FlexBox
          width="100%"
          justifyContent="center"
          gap="0.75rem"
          flexWrap="wrap"
        >
          <Paragraph
            fontSize={theme.fonts.small}
            color={theme.colors.bluishGrey}
          >
            {t("CreditsText")}&nbsp;
            <a
              style={{
                color: theme.colors.bluishGrey
              }}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.incredible-web.com/"
            >
              Incredible Web Limited
            </a>
          </Paragraph>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

const mapStateToProps = state => ({
  isMobile: selectIsMobile(state) // Map isMobile from the Redux store to a prop
});

export default connect(mapStateToProps)(withTranslation()(withTheme(Footer)));
