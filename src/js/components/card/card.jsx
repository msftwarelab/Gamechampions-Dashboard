import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FlexBox, Section, Heading, Image } from "~components/atoms";
import LanguageSelector from "~containers/multiLanguage";
import { LanguageSelectorWrapper } from "./languageSelectorWrapper";
import { useTheme } from "styled-components";
const blockClassName = "card";

const Card = ({
  title,
  html,
  buttons,
  closeUrl,
  icon,
  className,
  cardClassName,
  children,
  description,
  showLanguage,
  showLogo,
  titleProps = {},
  htmlProps = {},
  footer,
  isFooterNoPadding = false,
  ...props
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const logo = {
    src: "/img/linear_logo.svg",
    alt: process.env.NAME,
    title: process.env.NAME
  };

  const renderLanguageSelector = () => {
    return (
      <LanguageSelectorWrapper>
        <LanguageSelector />
      </LanguageSelectorWrapper>
    );
  };

  const renderTitle = () => {
    return (
      <FlexBox alignItems="center">
        <Heading {...titleProps} className={`${blockClassName}__title`}>
          {icon}
          {title}
        </Heading>
        {showLanguage && !showLogo && renderLanguageSelector()}
      </FlexBox>
    );
  };

  const renderContent = () => {
    if (footer) {
      return (
        <>
          <FlexBox
            flex={1}
            flexDirection="column"
            padding={isFooterNoPadding ? "0 1em 1em" : "0 1em"}
            overflow="auto"
            maxHeight={{ base: "unset", md: "100%" }}
          >
            {children}
          </FlexBox>
          <FlexBox
            flexDirection="column"
            padding={isFooterNoPadding ? "0" : "1em 1em 0 1em"}
            margin={isFooterNoPadding ? "0 0 -1em 0" : "0"}
            backgroundColor={theme.colors.white}
          >
            {footer}
          </FlexBox>
        </>
      );
    }

    return children;
  };

  const renderLogo = () => {
    return (
      <FlexBox
        alignItems="center"
        justifyContent="center"
        margin={{ base: "40px 0 0", md: "0 0 1.5rem" }}
      >
        <Image
          src={logo.src}
          title={logo.title}
          alt={logo.alt}
          width={{ base: "20em", md: "48rem" }}
        />
        {showLanguage && renderLanguageSelector()}
      </FlexBox>
    );
  };

  return (
    <Section
      className={`${blockClassName} ${
        cardClassName ? `${blockClassName}--${cardClassName}` : ""
      } ${className || ""}`}
      padding={footer ? "1em 0" : "1em"}
      {...props}
    >
      {showLogo && renderLogo()}

      {title && renderTitle()}

      {html && (
        <FlexBox {...htmlProps} dangerouslySetInnerHTML={{ __html: html }} />
      )}
      {description && <div className="richtext">{t(description)}</div>}
      {buttons && (
        <div className={`${blockClassName}__buttons`}>
          {buttons.map((n, index) => (
            <Link
              to={n.url}
              key={index}
              href={n.url}
              className={`${blockClassName}__buttons__button`}
              title={n.title}
            >
              {n.title}
            </Link>
          ))}
        </div>
      )}
      {closeUrl && (
        <div className="card-close">
          <Link to={closeUrl} className="card-close__button" />
        </div>
      )}
      {renderContent()}
    </Section>
  );
};

export default Card;
