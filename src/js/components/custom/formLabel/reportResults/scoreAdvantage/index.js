import React from "react";
import { Paragraph, Heading } from "~components/atoms";
import { RecommendedScoreWrapper } from "../../recommendedScoreAdvantage/recommendedScoreWrapper";
import { ScoreAdvantageWrapper } from "./scoreAdvantageWrapper";

class ScoreAdvantage extends React.PureComponent {
  render() {
    const { recommendedScoreAdvantage, isAdmin } = this.props;
    if (isAdmin) {
      return <></>;
    }
    return (
      <ScoreAdvantageWrapper>
        <Heading as="h4" textTransform="uppercase" padding="0.5em">
          Score Advantage
        </Heading>
        <RecommendedScoreWrapper>
          <Paragraph>{recommendedScoreAdvantage.challenger}</Paragraph>
          <Paragraph>-</Paragraph>
          <Paragraph>{recommendedScoreAdvantage.challengee}</Paragraph>
        </RecommendedScoreWrapper>
      </ScoreAdvantageWrapper>
    );
  }
}

export default ScoreAdvantage;
