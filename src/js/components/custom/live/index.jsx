import React from "react";
import { styled } from "~theme";
import { withTheme } from "~theme";

import { FlexBox } from "~components/atoms";

const Live = ({ theme }) => (
  <LiveStyled>
    <LabelParagraph
      color={theme.colors.white}
      fontSize="1rem"
      lineHeight="1.5rem"
      fontWeight={theme.fonts.bold}
      backgroundColor={theme.colors.green}
      hoverBackgroundColor={theme.colors.green}
      align-items="center"
      width={{ base: "6rem", md: "4rem" }}
      justifyContent="space-evenly"
    >
      <LiveBullet className="blink">&bull;</LiveBullet>
      Live
    </LabelParagraph>
  </LiveStyled>
);

const LiveStyled = styled.div`
  display: inline-flex;
  gap: 0.4em;
  text-transform: uppercase;
  border-radius: 0.2em;
  margin-bottom: 0.5em;
`;

const LiveBullet = styled.div`
  font-size: 2em;
`;
const LabelParagraph = styled(FlexBox)`
  position: relative;
`;
export default withTheme(Live);
