import React from "react";
import { SlotContainer, FlexBox } from "~components/atoms";
const { Component } = React;
import { ROLLING_SECONDS } from "./constants";

import { styled } from "~theme";
import { SizeStyle, SpaceStyle } from "~components/styles";

// TODO : MAybee implemenet it in the begining of the teams array.
// const firstTeam = {
//   id: 0,
//   thumbnailUrl: "/media/1738/questionmark.png",
//   alt: "questionmark.png",
//   height: "60px",
//   width: "60px",
//   margin: "0.5rem 0.5rem 0.5rem 0",
//   title: "TeamSearch"
// };

class Slots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRendered: false,
      multipliedTeams: []
    };

    // Get ref of div on the element will roll.
    this.slotRef = React.createRef();
    this.searchTeamIndex = this.searchTeamIndex.bind(this);
    this.triggerSlotRotation = this.triggerSlotRotation.bind(this);
    this.executeAnimation = this.executeAnimation.bind(this);
    this.multiplyTeams = this.multiplyTeams.bind(this);
  }

  multiplyTeams(teams) {
    let multipliedTeams = teams;
    if (teams) {
      let teamMultiplyer = 0;
      if (teams.length / ROLLING_SECONDS > 4) {
        teamMultiplyer = 1;
      } else {
        teamMultiplyer = Math.floor((ROLLING_SECONDS * 4) / teams.length);
      }

      for (let i = 0; i < teamMultiplyer; i++) {
        multipliedTeams = multipliedTeams.concat(teams);
      }
    }

    return multipliedTeams;
  }

  executeAnimation() {
    const { onShowTeams } = this.props;
    // This will trigger rolling effect.
    this.triggerSlotRotation(this.slotRef.current);
    this.setState({ isRendered: true });
    setTimeout(onShowTeams, ROLLING_SECONDS * 1000);
  }
  componentDidMount() {
    const { teams } = this.props;
    let multipliedTeams = this.multiplyTeams(teams);

    this.setState({ multipliedTeams }, this.executeAnimation);
    // multipliedTeams.unshift(firstTeam);
  }

  // This will create a rolling effect and return random selected option.
  triggerSlotRotation(ref) {
    const { teams } = this.props;

    function setTop(top) {
      ref.style.top = `${top}px`;
    }
    let ChoosenTeamOptionIndex = this.searchTeamIndex();
    let childrenNumber = ref.children.length;
    if (childrenNumber > 0) {
      let options = ref.children;
      let choosenOption = options[ChoosenTeamOptionIndex];
      if (choosenOption) {
        setTop(-choosenOption.offsetTop);
      }
      return teams[ChoosenTeamOptionIndex];
    } else {
      this.triggerSlotRotation(this.slotRef.current);
    }
  }

  searchTeamIndex() {
    let { teams, selectedTeam } = this.props;
    let multipliedTeams = this.multiplyTeams(teams);

    let teamIndex = 0;
    if (multipliedTeams != null) {
      for (let i = multipliedTeams.length - 1; i > 0; i--) {
        if (
          multipliedTeams[i].title.toLowerCase() ==
          selectedTeam.get("title").toLowerCase()
        ) {
          teamIndex = i;
          return teamIndex;
        }
      }
    }
  }

  render() {
    const { multipliedTeams } = this.state;
    return (
      <SlotStyle>
        <SlotContainerStyle>
          <SlotContainer ref={this.slotRef} transitionTime={ROLLING_SECONDS}>
            {multipliedTeams &&
              multipliedTeams.length > 0 &&
              multipliedTeams.map((team, i) => (
                <FlexBox key={i} height="120px" width="86px" padding="15px 0">
                  <TeamsImageStyle
                    src={team.thumbnailUrl}
                    alt="barcelona.png"
                    height="76px"
                    width="76px"
                  />
                </FlexBox>
              ))}
          </SlotContainer>
        </SlotContainerStyle>
      </SlotStyle>
    );
  }
}
const SlotStyle = styled.div`
  position: relative;
  width: 90px;
  height: 100px;
  display: flex;
  justify-items: center;
  align-items: center;
`;

const SlotContainerStyle = styled.div`
  position: absolute;
  overflow: hidden;
  width: 100px;
  height: 105px;
`;

const TeamsImageStyle = styled.img`
  object-fit: cover;
  ${SpaceStyle};

  ${SizeStyle};
`;

export default Slots;
