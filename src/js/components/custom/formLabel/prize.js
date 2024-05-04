import React from "react";
import Switch from "react-switch";
import { styled, media, withTheme } from "~theme";
import { withTranslation } from "react-i18next";
import { FlexBox, Span, Image } from "~components/atoms";
import Paragraph from "~components/atoms/paragraph";

class Prize extends React.PureComponent {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    const { onMatchTypeChange } = this.props;
    onMatchTypeChange(checked);
    this.setState({ checked });
  }

  render() {
    const {
      selectedEntryFee,
      selectedPrize,
      hideEntryFee,
      isDirectChallenge,
      theme,
      currency,
      t
    } = this.props;
    return (
      <PrizeWrapperStyle>
        <PrizeStyle>
          {!isDirectChallenge && (
            <FlexBox alignItems="center" gap="0.4rem">
              <Image src="/img/incognito.svg" width="2.5rem" height="2.5rem" />
              <Paragraph fontSize="1.2rem">{t("Incognito")}</Paragraph>
              <Switch
                onChange={this.handleChange}
                checked={this.state.checked}
                onColor="#05D005"
                checkedIcon={false}
                uncheckedIcon={false}
              />
            </FlexBox>
          )}
          {!hideEntryFee && !isNaN(selectedEntryFee) && (
            <FlexBox
              textTransform="capitalize"
              fontSize="1.2rem"
              margin="4px 0 0 4px"
              gap="0.2rem"
            >
              <span style={{ whiteSpace: "nowrap" }}>{t("EntryFee")}</span>
              <Span
                fontWeight={theme.fonts.extraBold}
              >{`${currency}${selectedEntryFee}`}</Span>
            </FlexBox>
          )}
          {!isNaN(Number(selectedPrize)) && Number(selectedPrize) !== 0 && (
            <FlexBox
              alignItems="center"
              gap="12px"
              textTransform="capitalize"
              fontSize="2rem"
            >
              {t("Prize")}
              <Span
                color={theme.colors.secondary}
                fontWeight={theme.fonts.semiBold}
              >{`${currency}${selectedPrize} `}</Span>
            </FlexBox>
          )}
        </PrizeStyle>
      </PrizeWrapperStyle>
    );
  }
}

export default withTheme(withTranslation()(Prize));

const PrizeWrapperStyle = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.md`
    justify-content: flex-start;
`};
`;

const PrizeStyle = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  height: 3em;
  padding: 0.75em 0.75em;
  font-size: ${({ theme }) => theme.fonts.xLarge};
  font-weight: ${({ theme }) => theme.fonts.semiBold};
  ${media.md`
    flex-direction: row;
    gap: 6.2rem;
    margin-top: 0rem;
  `};
`;
