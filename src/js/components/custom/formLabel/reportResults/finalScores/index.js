import React from "react";
import { withTheme } from "~theme";
import { Heading, Paragraph } from "~components/atoms";
import { RecommendedScoreWrapper } from "../../recommendedScoreAdvantage/recommendedScoreWrapper";
import { FinalScoreWrapper } from "./finalScoreWrapper";

class FinalScores extends React.PureComponent {
  render() {
    const { finalScore, isAdmin } = this.props;
    if (isAdmin) {
      return <></>;
    }
    return (
      <FinalScoreWrapper>
        <Heading
          as="h4"
          fontSize="1.5em"
          textTransform="uppercase"
          padding="0.5em"
        >
          Final Score
        </Heading>
        <RecommendedScoreWrapper>
          <Paragraph fontSize="1.5em">
            {finalScore.challengerFinalScore}
          </Paragraph>
          <Paragraph>-</Paragraph>
          <Paragraph fontSize="1.5em">
            {finalScore.challengeeFinalScore}
          </Paragraph>
        </RecommendedScoreWrapper>
      </FinalScoreWrapper>
    );
  }
}

export default withTheme(FinalScores);
