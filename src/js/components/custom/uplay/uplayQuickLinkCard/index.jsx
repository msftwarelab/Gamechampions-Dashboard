import React from "react";
import { FlexBox } from "~components/atoms";
import Paragraph from "~components/atoms/paragraph";
import { styled, withTheme } from "~theme";

const UPlayQuickLinkCard = ({ theme, header, summary }) => {
  return (
    <Wrapper>
      <FlexBox width="100%" flexDirection="column" padding="1rem" gap="0.4rem">
        <Paragraph color={theme.colors.grey} fontWeight="bold">
          {header}
        </Paragraph>
        <div
          style={{
            fontWeight: theme.fonts.fontWeightNormal,
            color: theme.colors.greyLight
          }}
          dangerouslySetInnerHTML={{
            __html: summary
          }}
        />
      </FlexBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-width: 20rem;
  border-radius: 1.2rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.greyLight};
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.05));
  &:hover {
    text-decoration: underline;
  }
`;

export default withTheme(UPlayQuickLinkCard);
