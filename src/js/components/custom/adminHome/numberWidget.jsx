import React from "react";
import { styled, withTheme } from "~theme";
import { Paragraph, Icon, FlexBox, Span } from "~components/atoms";
import {
  ColouringStyle,
  BoxShadowStyle,
  SizeStyle,
  SpaceStyle
} from "~components/styles";

const NumberWidget = ({ theme, icon, color, title, count, prefix }) => {
  return (
    <NumberWidgetStyle
      width={{ base: "100%", md: "300px" }}
      boxShadow={theme.boxShadows.primary}
      backgroundColor={color}
      margin={{ base: "0.75rem 0", md: "0.25rem" }}
    >
      <Icon
        viewBox="0 0 24 24"
        scale="4"
        icon={icon}
        color={theme.colors.white}
        margin="0 0 1rem 0"
      />
      <FlexBox
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flex="1"
      >
        <Paragraph
          color={theme.colors.white}
          fontSize="1.25rem"
          lineHeight="1.25rem"
          margin="0 0 0.75rem"
        >
          {title}
        </Paragraph>
        <LabelParagraph
          color={theme.colors.white}
          fontSize="3rem"
          lineHeight="3rem"
          fontWeight={theme.fonts.bold}
        >
          <PrefixSpan>{prefix}</PrefixSpan>
          {count}
        </LabelParagraph>
      </FlexBox>
    </NumberWidgetStyle>
  );
};

export default withTheme(NumberWidget);

const NumberWidgetStyle = styled.div`
  ${BoxShadowStyle};
  ${ColouringStyle};
  ${SizeStyle};
  ${SpaceStyle};

  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
`;

const PrefixSpan = styled(Span)`
  position: absolute;
  left: -18px;
  top: -7px;
  font-size: 1.5rem;
`;

const LabelParagraph = styled(Paragraph)`
  position: relative;
`;
