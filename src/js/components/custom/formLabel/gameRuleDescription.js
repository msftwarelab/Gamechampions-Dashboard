import React from "react";
import { withTheme, styled, media } from "~theme";
import { Heading } from "~components/atoms";
import { useTranslation } from "react-i18next";

const GameRuleDescription = ({ activeRule, theme }) => {
  const { t } = useTranslation();
  if (!activeRule) {
    return null;
  }

  return (
    <>
      <Heading
        as="h2"
        margin="1rem 0 0 0.5em"
        color="rgba(0, 0, 0, 0.87)"
        fontSize={theme.fonts.small}
        fontWeight={theme.fonts.semiBold}
      >
        {t("GameRuleDescription")}
      </Heading>
      <ActiveRuleStyle
        dangerouslySetInnerHTML={{
          __html: activeRule
        }}
      />
    </>
  );
};

export default withTheme(GameRuleDescription);

const ActiveRuleStyle = styled("div")`
  overflow-y: scroll;
  margin: auto 9px;
  ${media.md`
  max-height: 8em;
`};
`;
