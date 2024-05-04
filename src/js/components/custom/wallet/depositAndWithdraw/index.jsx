import React from "react";
import { Paragraph, Button, FlexBox } from "~components/atoms";
import { styled, withTheme, media } from "~theme";
import Link from "~components/atoms/link";

const DepositAndWithdraw = ({
  depositTitle,
  withDrawTitle,
  returnUrl,
  theme,
  selectedLanguage
}) => (
  <FlexBox
    width="100%"
    justifyContent="space-between"
    flexDirection={{
      base: "column",
      md: "row-reverse"
    }}
  >
    <Button
      to={{
        pathname: `/${selectedLanguage}/deposit/choose-amount`,
        state: { returnUrl }
      }}
      padding="1rem"
      fontSize={theme.fonts.fontSizeNormal}
      fontWeight={theme.fonts.bold}
      width={{ base: "100%", md: "50%" }}
      backgroundColor={theme.colors.secondary}
      hoverBackgroundColor={theme.colors.secondary}
    >
      {depositTitle}
    </Button>
    <Link
      to={{
        pathname: `/${selectedLanguage}/withdrawal/choose-amount`,
        state: { returnUrl }
      }}
      padding="1rem"
      width={{ base: "100%", md: "50%" }}
    >
      <FlexBox justifyContent="center" alignItems="center">
        <Paragraph
          fontSize={theme.fonts.fontSizeNormal}
          fontWeight={theme.fonts.bold}
          color={theme.colors.secondary}
        >
          {withDrawTitle}
        </Paragraph>
      </FlexBox>
    </Link>
  </FlexBox>
);

export default withTheme(DepositAndWithdraw);

export const ButtonGroupStyled = styled("div")`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: -2em 0 2em 0;
  ${media.md`
    padding: 1em;
    flex-direction: row;
    justify-content: space-between;
    margin: auto 1em;
  `};
`;
