import React from "react";
import { useTranslation } from "react-i18next";

import {
  PositioningStyle,
  SizeStyle,
  BoxShadowStyle,
  ColouringStyle,
  SpaceStyle,
  FlexBoxStyle,
  TypographyStyle
} from "~components/styles";
import { FlexBox, Link, Button } from "~components/atoms";
import { withTheme, styled } from "~theme";

const ConfirmBox = ({
  theme,
  onCancel,
  onConfirm,
  isVisible,
  cancelLabel,
  submitLabel,
  title,
  selectedLanguage = "en"
}) => {
  const { confirmBoxTheme = {} } = theme;
  const {
    rootTheme = {},
    wrapperTheme = {},
    buttonWrapperTheme = {},
    buttonTheme = {},
    cancelLinkTheme = {},
    textTheme = {}
  } = confirmBoxTheme;

  const { t } = useTranslation();

  return (
    <ConfirmBoxStyle {...rootTheme} onClick={onCancel} isVisible={isVisible}>
      <ConfirmBoxWrapperStyle
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
        {...wrapperTheme}
        isVisible={isVisible}
      >
        <FlexBox {...textTheme}>{title}</FlexBox>
        <ConfirmButtonsWrapper {...buttonWrapperTheme}>
          <Link
            {...cancelLinkTheme}
            to={`/${selectedLanguage}`}
            onClick={e => {
              e.preventDefault();
              onCancel();
            }}
          >
            {cancelLabel || t("ConfirmBoxCancelLabel")}
          </Link>
          <Button
            {...buttonTheme}
            to={`/${selectedLanguage}`}
            onClick={e => {
              e.preventDefault();
              onConfirm();
            }}
          >
            {submitLabel || t("ConfirmBoxConfirmLabel")}
          </Button>
        </ConfirmButtonsWrapper>
      </ConfirmBoxWrapperStyle>
    </ConfirmBoxStyle>
  );
};

const ConfirmBoxStyle = styled.div`
  display: flex;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s 0s, visibility 0s 0.3s;

  ${PositioningStyle};
  ${SizeStyle};
  ${ColouringStyle};

  ${({ isVisible }) =>
    isVisible &&
    `
    opacity: 1;
    visibility: visible;
    transition: opacity 0.3s 0s, visibility 0s 0s;
    z-index: 9999999;
`};
`;

const ConfirmBoxWrapperStyle = styled.div`
  transform: translateY(0);
  transform: translateY(-20rem);
  transition-property: transform;
  transition-duration: 0.7s;

  ${PositioningStyle};
  ${SizeStyle};
  ${SpaceStyle};
  ${ColouringStyle};
  ${BoxShadowStyle};
  ${TypographyStyle};

  ${({ isVisible }) =>
    isVisible &&
    `
    transform: translateY(0);
`};
`;

const ConfirmButtonsWrapper = styled.div`
  display: flex;
  ${FlexBoxStyle};
`;

export default withTheme(ConfirmBox);
