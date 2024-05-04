import React from "react";
import PlatformTag from "~components/custom/matchLobby/matchLobbyBanner/platformTag";
import { FlexBox, Thumbnail, Paragraph } from "~components/atoms";
import { withTheme } from "styled-components";
import { fromJS } from "immutable";

const PlayerIconXpId = ({ player, theme, matchData }) => {
  const isHost = player?.id === matchData?.hosterId ? true : false;
  return (
    <FlexBox flexDirection="column" alignItems="center">
      <Thumbnail
        margin="25px 0 0 0"
        src={player?.thumbnailUrl}
        height={{ base: "60px", md: "80px" }}
        width={{ base: "60px", md: "80px" }}
      />
      <FlexBox
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Paragraph
          fontSize={{
            base: theme.fonts.fontSizeNormal,
            md: theme.fonts.xLarge
          }}
          color={theme.colors.black}
          textAlign="center"
        >
          {player?.userName}
        </Paragraph>
      </FlexBox>
      {player && matchData && (
        <>
          <PlatformTag
            player={fromJS(player)}
            theme={theme}
            match={fromJS(matchData)}
          />
          {isHost && (
            <FlexBox
              backgroundColor={theme.colors.brightturquoise}
              hoverBackgroundColor={theme.colors.brightturquoise}
              color={theme.colors.black}
              fontSize="12px"
              borderRadius="200px"
              width="50px"
              height="24px"
              justifyContent="center"
              borderWidth="1px"
              borderStyle="solid"
              borderColor={theme.colors.primary}
              margin="0.5rem 0 0 0"
              alignItems="center"
            >
              <Paragraph>HOST</Paragraph>
            </FlexBox>
          )}
        </>
      )}
    </FlexBox>
  );
};

export default withTheme(PlayerIconXpId);
