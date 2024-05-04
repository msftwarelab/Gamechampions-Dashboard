import React, { useState } from "react";
import { styled, media, withTheme } from "~theme";
import { FlexBox, List, Button } from "~components/atoms";
import BoyMatch from "../boyMatch";

const BoyMatchesBox = ({
  boyMatches,
  profile,
  games,
  onLoadBoyMatches,
  selectedLanguage,
  history,
  t
}) => {
  const [pageSize, setPageSize] = useState(5);
  const [matchesLength, setMatchesLength] = useState(
    boyMatches ? boyMatches.size : 0
  );
  const [isDisabledShowMore, setIsDisabledShowMore] = useState(false);

  const handleClickShowMore = () => {
    onLoadBoyMatches({
      userId: profile.get("id"),
      page: 1,
      pageSize: pageSize + 5,
      games: games.toJS()
    }).then(response => {
      if (response.length === matchesLength) {
        setIsDisabledShowMore(true);
      } else {
        setMatchesLength(response.length);
      }
    });
    setPageSize(prev => prev + 5);
  };

  return (
    <BoyMatchesBoxStyle>
      <List>
        {boyMatches &&
          boyMatches.size > 0 &&
          boyMatches.get(0) != null &&
          boyMatches.map(n => (
            <BoyMatch
              boyMatch={n}
              selectedLanguage={selectedLanguage}
              history={history}
              key={n.get("id")}
            />
          ))}
      </List>
      <FlexBox width="100%" justifyContent={"center"}>
        <Button
          to="#"
          isDisabled={isDisabledShowMore}
          onClick={handleClickShowMore}
          margin="0.5em auto"
          padding={{ base: "12px 24px", md: "12px 24px" }}
          width={{ base: "100%", md: "auto" }}
        >
          {t("ShowMore")}
        </Button>
      </FlexBox>
    </BoyMatchesBoxStyle>
  );
};

export default withTheme(BoyMatchesBox);

const BoyMatchesBoxStyle = styled.div`
  padding: 16px 10px;
  border-radius: 2px;
  background-color: #e6e6e6;
  ${media.md`
    padding: 24px 48px;
  `};
`;
