import React from "react";
import { styled, media, withTheme } from "~theme";
import { Span, Paragraph, Overlay, FlexBox } from "~components/atoms";

const Score = ({ score, match, theme, isChampionsMode, showTeams }) => {
  return (
    <>
      {score && (
        <ScoreStyle>
          <Overlay light={true} opacity=".6" zIndex="-1" borderRadius="2px" />
          <FlexBox display="flex" flexDirection="column" alignItems="center">
            <Paragraph
              fontSize="50px"
              fontWeight={theme.fonts.bold}
              lineHeight="1"
              margin="0"
            >
              {`${score.get("challenger")} - ${score.get("challengee")}`}
            </Paragraph>
            {isChampionsMode && (
              <TeamsDiv
                DefenderTeamColor={
                  showTeams
                    ? match && match.get("defenderTeam").get("colour")
                    : theme.colors.primary
                }
                ChallengerTeamColor={
                  showTeams
                    ? match && match.get("challengerTeam").get("colour")
                    : theme.colors.primary
                }
              >
                <Span fontSize="2em">
                  {showTeams
                    ? `${match.get("challengerTeam").get("code")} - ${match
                        .get("defenderTeam")
                        .get("code")}`
                    : "? - ?"}
                </Span>
              </TeamsDiv>
            )}
          </FlexBox>
        </ScoreStyle>
      )}
    </>
  );
};

export default withTheme(Score);

const ScoreStyle = styled.div`
  position: relative;
  color: ${({ theme }) => theme.colors.white};
  margin: 0 2rem;
  padding: 0.5rem;
  width: 100%;

  ${media.md`
    width: auto;
  `};
`;

const TeamsDiv = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.white};
  width: 100%;
  justify-content: center;
  padding: 0.6em 1em 0.3em 1em;
  background-color: ${({ theme }) => theme.colors.primary};
  border-right: 5px solid ${({ DefenderTeamColor }) => DefenderTeamColor};
  border-left: 5px solid ${({ ChallengerTeamColor }) => ChallengerTeamColor};

  ${media.md`
    width: auto;
  `};
`;
