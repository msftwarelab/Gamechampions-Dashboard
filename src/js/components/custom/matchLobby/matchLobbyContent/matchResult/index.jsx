import React from "react";
import { styled, media, withTheme } from "~theme";
import { Heading, FlexBox, Paragraph, Span } from "~components/atoms";
import { toPriceString } from "~service/adapter";

const MatchResult = ({ match, currency, theme }) => (
  <MatchReportStyle>
    {match && (
      <>
        <Heading
          color={theme.colors.white}
          backgroundColor={theme.colors.tertiary}
          margin="0"
          padding="0 0.5em"
          fontSize={theme.fonts.fontSizeNormal}
          fontWeight={theme.fonts.semiBold}
          textTransform="uppercase"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          height="2rem"
        >
          <Span>{`${match.get("gameTitle")} ${match.get("platform")}`}</Span>
          <Span>{toPriceString(match.get("prize"), currency)}</Span>
        </Heading>
        <FlexBox
          padding="1em 0.5em"
          color={theme.colors.fontColor}
          justifyContent="space-between"
        >
          {match.get("challenger") && (
            <FlexBox flexDirection="column" alignItems="flex-start">
              <Paragraph fontWeight={theme.fonts.semiBold}>
                {match.get("challenger").get("userName")}
              </Paragraph>
              <Paragraph fontSize={theme.fonts.small}>
                {match.get("challenger").get("platformId")}
              </Paragraph>
            </FlexBox>
          )}
          {match.get("score") && (
            <FlexBox flexDirection="column" alignItems="center">
              <Paragraph
                fontSize={theme.fonts.xLarge}
                fontWeight={theme.fonts.bold}
              >
                {`${match.get("score").get("challenger")} - ${match
                  .get("score")
                  .get("challengee")}`}
              </Paragraph>
              <Paragraph fontSize={theme.fonts.small}>
                {match.get("score").get("challenger") -
                  match.get("score").get("challengee") >
                0 ? (
                  <>
                    <Span padding="0.5rem" color={theme.colors.tertiary}>
                      WON
                    </Span>
                    <Span padding="0.5rem">LOST</Span>
                  </>
                ) : match.get("score").get("challenger") -
                    match.get("score").get("challengee") ==
                  0 ? (
                  <Span padding="0.5rem">DRAW</Span>
                ) : (
                  <>
                    <Span padding="0.5rem">LOST</Span>
                    <Span padding="0.5rem" color={theme.colors.tertiary}>
                      WON
                    </Span>
                  </>
                )}
              </Paragraph>
            </FlexBox>
          )}
          {match.get("challengee") && (
            <FlexBox flexDirection="column" alignItems="flex-end">
              <Paragraph fontWeight={theme.fonts.semiBold}>
                {match.get("challengee").get("userName")}
              </Paragraph>
              <Paragraph fontSize={theme.fonts.small}>
                {match.get("challengee").get("platformId")}
              </Paragraph>
            </FlexBox>
          )}
        </FlexBox>
      </>
    )}
  </MatchReportStyle>
);

export default withTheme(MatchResult);

const MatchReportStyle = styled.div`
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.boxShadows.primary};
  margin-bottom: 1rem;

  ${media.md`
    margin: 0 0.5rem 1rem 1rem;
  `};
`;
