import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FlexBox } from "~components/atoms";
import { styled, media, withTheme } from "~theme";
import { TabContentContainer } from "./tabStyled";

function ScrollableTabs({ tabs, match, isLinkWidthFull = false }) {
  const tabContainerRef = React.useRef();
  const [hasLoadedUplay, setHasLoadedUplay] = useState(false);
  useEffect(() => {
    if (!tabContainerRef.current) return;
    tabContainerRef.current.style.maxWidth = `${window.innerWidth - 8}px`;
    window.onresize = function() {
      tabContainerRef.current.style.maxWidth = `${window.innerWidth - 8}px`;
    };
  }, [tabContainerRef]);
  const active = tabs.find(each => {
    return each.url === match.url;
  });

  useEffect(() => {
    if (active.title == "STREAMS" && !hasLoadedUplay) {
      setHasLoadedUplay(true);
    }
  }, [active]);

  return (
    <MainContainer>
      <TabContainer ref={tabContainerRef}>
        <FlexBox justifyContent="space-around">
          {tabs.map((each, key) => (
            <LinkContainer
              key={key}
              active={each.url === match.url}
              isLinkWidthFull={isLinkWidthFull}
            >
              <Link
                key={each.url}
                to={each.url}
                title={each.title}
                className={
                  "nav__link tabs__link " +
                  (each.url === match.url ? " tab-selected " : "") +
                  (isLinkWidthFull
                    ? " nav__link__fullwidth tabs__link__fullwidth "
                    : "") +
                  "tab__nav__link"
                }
              >
                {each.title}
              </Link>
            </LinkContainer>
          ))}
        </FlexBox>
      </TabContainer>
      {active && <TabContentContainer>{active.element}</TabContentContainer>}
    </MainContainer>
  );
}

const MainContainer = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;

  ${media.md`
    justify-content: center;
    align-items: center;
    padding: 0;
`};
`;

export const TabContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};

  & > div {
    justify-content: flex-start;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    ${media.md`
      overflow-x: unset;
      justify-content: space-evenly;
    `};
  }

  ${media.md`

  `};
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: center;
  ${({ isLinkWidthFull }) => (isLinkWidthFull ? `width: 100%;` : ``)}
  ${media.md`

  `};
`;

export default withTheme(ScrollableTabs);
