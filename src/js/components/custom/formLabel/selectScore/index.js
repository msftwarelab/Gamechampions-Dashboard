import React from "react";
import { FlexBox, Image } from "~components/atoms";
import { ScoreWrapper } from "./scoreWrapper";
import PlayerIconXpId from "../playerIconXpId";
import PlayerIconChampionMatch from "../playerIconChampionMatch";

class SelectScore extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValuePlayer1: 0,
      scoreAdvantagePlayer1: 0,
      inputValuePlayer2: 0,
      scoreAdvantagePlayer2: 0,
      finalScorePlayer1: 0,
      finalScorePlayer2: 0
    };
    this.handleValueInput = this.handleValueInput.bind(this);
    this.handleDefenderScoreUp = this.handleDefenderScoreUp.bind(this);
    this.handleDefenderScoreDown = this.handleDefenderScoreDown.bind(this);
    this.handleChallengerScoreUp = this.handleChallengerScoreUp.bind(this);
    this.handleChallengerScoreDown = this.handleChallengerScoreDown.bind(this);
  }

  propagateStateChange(val, isPlayer1) {
    if (val >= 0 && val <= 999) {
      if (isPlayer1) {
        this.setState(
          {
            scoreAdvantagePlayer1: val,
            finalScorePlayer1: val
          },
          () => {
            this.props.onChallengerScoreChange(this.state.finalScorePlayer1);
          }
        );

        this.setState(
          {
            scoreAdvantagePlayer1: val,
            finalScorePlayer1: val
          },
          () => {
            this.props.onChallengerScoreChange(this.state.finalScorePlayer1);
          }
        );
      } else {
        this.setState(
          {
            scoreAdvantagePlayer2: val,
            finalScorePlayer2: val
          },
          () => {
            this.props.onChallengeeScoreChange(this.state.finalScorePlayer2);
          }
        );
      }
    }
  }

  handleValueInput(val, isPlayer1) {
    this.propagateStateChange(val, isPlayer1);
  }

  handleDefenderScoreUp() {
    this.setState({
      inputValuePlayer1: Number(this.state.inputValuePlayer1) + 1
    });
    this.propagateStateChange(Number(this.state.inputValuePlayer1) + 1, true);
  }

  handleDefenderScoreDown() {
    this.setState({
      inputValuePlayer1:
        this.state.inputValuePlayer1 > 0 &&
        Number(this.state.inputValuePlayer1) - 1
    });
    this.propagateStateChange(Number(this.state.inputValuePlayer1) - 1, true);
  }

  handleChallengerScoreUp() {
    this.setState({
      inputValuePlayer2: Number(this.state.inputValuePlayer2) + 1
    });
    this.propagateStateChange(Number(this.state.inputValuePlayer2) + 1, false);
  }

  handleChallengerScoreDown() {
    this.setState({
      inputValuePlayer2:
        this.state.inputValuePlayer2 > 0 &&
        Number(this.state.inputValuePlayer2) - 1
    });
    this.propagateStateChange(Number(this.state.inputValuePlayer2) - 1, false);
  }

  render() {
    const { matchPlatform, matchData, challenger, challengee } = this.props;

    return (
      <FlexBox flexDirection="column">
        <FlexBox
          margin="0 auto"
          padding={{ base: "0", md: "2em 2em" }}
          gap={{ base: "0.5rem", md: "2rem" }}
          justifyContent="center"
          alignItems="center"
        >
          <FlexBox
            alignItems="center"
            flexDirection={{ base: "column", md: "row" }}
          >
            {matchData.isChampionsMode ? (
              <PlayerIconChampionMatch
                player={challenger}
                matchPlatform={matchPlatform}
                matchData={matchData}
                challenger={true}
              />
            ) : (
              <PlayerIconXpId player={challenger} matchData={matchData} />
            )}
          </FlexBox>

          <FlexBox alignItems="center">
            <FlexBox
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
            >
              <FlexBox
                backgroundColor="#F5F5F5"
                hoverBackgroundColor="#fbfbfb"
                width="3.125rem"
                height="3.125rem"
                alignItems="center"
                justifyContent="center"
                borderRadius="3.5rem"
                onClick={this.handleDefenderScoreUp}
              >
                <Image
                  src="/img/icons/ic_chevron_up-24px.svg"
                  width="1.5rem"
                  height="0.8rem"
                />
              </FlexBox>
              <ScoreWrapper
                type="number"
                min="0"
                max="999"
                value={this.state.inputValuePlayer1}
                onChange={e => {
                  this.setState({ inputValuePlayer1: e.target.value });
                }}
                onKeyUp={() => {
                  this.handleValueInput(this.state.inputValuePlayer1, true);
                }}
              />
              <FlexBox
                backgroundColor="#F5F5F5"
                hoverBackgroundColor="#fbfbfb"
                width="3.125rem"
                height="3.125rem"
                alignItems="center"
                justifyContent="center"
                borderRadius="3.5rem"
                onClick={this.handleDefenderScoreDown}
              >
                <Image
                  src="/img/icons/ic_chevron_down_grey.svg"
                  width="1.5rem"
                  height="0.8rem"
                />
              </FlexBox>
            </FlexBox>
            <FlexBox
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
            >
              <FlexBox
                backgroundColor="#F5F5F5"
                hoverBackgroundColor="#fbfbfb"
                width="3.125rem"
                height="3.125rem"
                alignItems="center"
                justifyContent="center"
                borderRadius="3.5rem"
                onClick={this.handleChallengerScoreUp}
              >
                <Image
                  src="/img/icons/ic_chevron_up-24px.svg"
                  width="1.5rem"
                  height="0.8rem"
                />
              </FlexBox>
              <ScoreWrapper
                type="number"
                min="0"
                max="999"
                value={this.state.inputValuePlayer2}
                onChange={e => {
                  this.setState({ inputValuePlayer2: e.target.value });
                }}
                onKeyUp={() => {
                  this.handleValueInput(this.state.inputValuePlayer2, false);
                }}
              />
              <FlexBox
                backgroundColor="#F5F5F5"
                hoverBackgroundColor="#fbfbfb"
                width="3.125rem"
                height="3.125rem"
                alignItems="center"
                justifyContent="center"
                borderRadius="3.5rem"
                onClick={this.handleChallengerScoreDown}
              >
                <Image
                  src="/img/icons/ic_chevron_down_grey.svg"
                  width="1.5rem"
                  height="0.8rem"
                />
              </FlexBox>
            </FlexBox>
          </FlexBox>

          <FlexBox
            alignItems="center"
            flexDirection={{ base: "column", md: "row" }}
          >
            {matchData.isChampionsMode ? (
              <PlayerIconChampionMatch
                player={challengee}
                matchPlatform={matchPlatform}
                matchData={matchData}
                challenger={false}
              />
            ) : (
              <PlayerIconXpId player={challengee} matchData={matchData} />
            )}
          </FlexBox>
        </FlexBox>
      </FlexBox>
    );
  }
}

export default SelectScore;
