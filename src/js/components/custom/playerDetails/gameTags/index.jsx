import React from "react";
import { styled, media, withTheme } from "~theme";
import UnstyledList from "~components/atoms/unstyledList";
import GamerTag from "./gamerTag";
import { Heading } from "~components/atoms";
import { useTranslation } from "react-i18next";

const GamerTags = ({ gamerTags, theme }) => {
  const { t } = useTranslation();
  return (
    <GamerTagsStyle>
      <Heading
        color="rgba(0, 0, 0, 0.87)"
        fontSize={theme.fonts.small}
        fontWeight={theme.fonts.semiBold}
      >
        {t("PlayerDetailsGamerTags")}
      </Heading>
      <UnstyledList>
        {gamerTags &&
          gamerTags.size > 0 &&
          gamerTags.map(n => <GamerTag key={n.get("id")} tag={n} />)}
      </UnstyledList>
    </GamerTagsStyle>
  );
};

export default withTheme(GamerTags);

const GamerTagsStyle = styled.section`
  position: relative;
  align-self: flex-start;
  padding: 1em;
  width: 100%;

  ${media.md`
    width: auto;
    height: 100%;
    border-left: 1px solid #e1e1e1;
  `};
`;
