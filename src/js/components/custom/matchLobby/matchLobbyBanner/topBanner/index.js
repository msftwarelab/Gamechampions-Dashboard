import React from "react";
import { withTheme, styled } from "~theme";
import { useSelector } from "react-redux";
import { selectMatches } from "~containers/matches/reducer";
import { MatchState } from "~service/constants";
import { Paragraph } from "~components/atoms";
import Span from "~components/atoms/span";

const TopBanner = ({ match }) => {
  const prize = match && match.get("prize");
  const state = useSelector(state => state);
  const matches = selectMatches(state);
  const pending =
    matches && matches.find(match => match.get("state") === MatchState[1]);
  const lobby =
    matches && matches.find(match => match.get("state") === MatchState[3]);
  const live =
    matches && matches.find(match => match.get("state") === MatchState[2]);
  const inputScore =
    matches &&
    matches.find(
      match =>
        match.get("state") === MatchState[6] ||
        match.get("state") === MatchState[7]
    );
  const disputes =
    matches && matches.find(match => match.get("state") === MatchState[4]);
  const completed =
    matches && matches.find(match => match.get("state") === MatchState[5]);

  return (
    <BannerSizeWrapper
      style={{
        backgroundImage: `url(${match.get("bannerImageUrl")})`,
        backgroundSize: "cover"
      }}
    >
      {(pending && (
        <Paragraph color="white" fontSize="1rem" fontWeight="500">
          {pending?.get("title")}&nbsp;|&nbsp;{pending?.get("format")}
          &nbsp;|&nbsp;<Span color="#00FF3A">${prize}</Span>
        </Paragraph>
      )) ||
        (lobby && (
          <Paragraph color="white" fontSize="1rem" fontWeight="500">
            {lobby?.get("title")}&nbsp;|&nbsp;{lobby?.get("format")}
            &nbsp;|&nbsp;<Span color="#00FF3A">${prize}</Span>
          </Paragraph>
        )) ||
        (live && (
          <Paragraph color="white" fontSize="1rem" fontWeight="500">
            {live?.get("title")}&nbsp;|&nbsp;{live?.get("format")}
            &nbsp;|&nbsp;<Span color="#00FF3A">${prize}</Span>
          </Paragraph>
        )) ||
        (inputScore && (
          <Paragraph color="white" fontSize="1rem" fontWeight="500">
            {inputScore?.get("title")}&nbsp;|&nbsp;{inputScore?.get("format")}
            &nbsp;|&nbsp;<Span color="#00FF3A">${prize}</Span>
          </Paragraph>
        )) ||
        (disputes && (
          <Paragraph color="white" fontSize="1rem" fontWeight="500">
            {disputes?.get("title")}&nbsp;|&nbsp;{disputes?.get("format")}
            &nbsp;|&nbsp;<Span color="#00FF3A">${prize}</Span>
          </Paragraph>
        )) ||
        (completed && (
          <Paragraph color="white" fontSize="1rem" fontWeight="500">
            {completed?.get("title")}&nbsp;|&nbsp;{completed?.get("format")}
            &nbsp;|&nbsp;<Span color="#00FF3A">${prize}</Span>
          </Paragraph>
        ))}
    </BannerSizeWrapper>
  );
};

export default withTheme(TopBanner);

const BannerSizeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 0 0 0.6rem 1rem;
  width: 100%;
  margin: 0 18px;
  color: black;
  background-size: cover;
  border-radius: 1rem 1rem 0 0;
  min-height: 6.5rem;
`;
