import React from "react";
import { withTheme } from "~theme";
import { Paragraph, Heading } from "~components/atoms";
import { RecommendedScoreAdvantageWrapper } from "./recommendedScoreAdvantageWrapper";
import { RecommendedScoreWrapper } from "./recommendedScoreWrapper";

class RecommendedScoreAdvantage extends React.PureComponent {
  render() {
    const { recommendedScoreAdvantage } = this.props;
    return (
      <>
        <RecommendedScoreAdvantageWrapper>
          <Heading as="h4" textTransform="uppercase" padding="0.5em">
            Recommended Score Advantage
          </Heading>
          <RecommendedScoreWrapper>
            <Paragraph fontSize="1.75em">
              {recommendedScoreAdvantage.challenger}
            </Paragraph>
            <Paragraph fontSize="1.75em">-</Paragraph>
            <Paragraph fontSize="1.75em">
              {recommendedScoreAdvantage.challengee}
            </Paragraph>
          </RecommendedScoreWrapper>
        </RecommendedScoreAdvantageWrapper>
        <Paragraph
          fontStyle="italic"
          justifyContent="center"
          fontSize="0.9em"
          padding="0.1em 0"
        >
          Recommended Score Advantage is calculated based on XP difference using
          our internal algorithm
        </Paragraph>
      </>
    );
  }
}

export default withTheme(RecommendedScoreAdvantage);
