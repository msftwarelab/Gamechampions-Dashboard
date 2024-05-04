import React from "react";
import { styled, withTheme } from "~theme";
import { withTranslation } from "react-i18next";
import { Span } from "~components/atoms";

class EpicDisplayName extends React.PureComponent {
  render() {
    const { isBoyProfileExist, epicId, isVerified, theme, t } = this.props;
    return (
      <WrapperStyle>
        <TextWrapperStyle>
          {isBoyProfileExist && epicId ? <Span>{epicId}</Span> : <></>}
          {!isBoyProfileExist ? (
            <Span fontStyle="italic">{t("Not exist")}</Span>
          ) : (
            <Span
              fontStyle="italic"
              margin="0 0 0 1em"
              color={
                isVerified ? theme.colors.secondary : theme.colors.indianRed
              }
            >
              {isVerified ? t("Verified") : t("Not verified")}
            </Span>
          )}
        </TextWrapperStyle>
        <LabelStyle>
          <Span>{t("EPIC ID")}</Span>
        </LabelStyle>
      </WrapperStyle>
    );
  }
}

export default withTheme(withTranslation()(EpicDisplayName));

const WrapperStyle = styled("div")`
  position: relative;
`;

const TextWrapperStyle = styled("div")`
  display: inline-block;
  width: 100%;
  padding: 1.5em 0.5em 0.75em;
  outline: none;
  max-width: none;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.greyDim};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.inputDisabledBackgroundColor};
  color: ${({ theme }) => theme.colors.disabledBackgroundColor};
  font-size: 1em;
  font-weight: 400;
`;

const LabelStyle = styled("label")`
  display: block;
  margin: auto;
  position: absolute;
  color: #ccc;
  height: 1.285em;
  left: 0.6em;
  top: 0.3em;
  font-size: 0.75em;
  font-weight: 400;
`;
