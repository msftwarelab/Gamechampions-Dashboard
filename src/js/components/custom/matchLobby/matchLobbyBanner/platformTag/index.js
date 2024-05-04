import { FlexBox } from "~components/atoms";
import React from "react";
import { PLATFORM } from "~containers/matchLobby/constants";

const PlatformTag = ({ player, theme, match }) => {
  return (
    <FlexBox
      width="fit-content"
      backgroundColor="#FEE74E"
      borderRadius="6px"
      borderColor={theme.colors.primary}
      borderStyle="solid"
      borderWidth="1px"
      padding="5px 5px"
      margin="10px 0 0 0"
      fontSize="0.875rem"
      gap="0.3rem"
      color={theme.colors.black}
      hoverBackgroundColor="#FEE74E"
    >
      {match && match?.get("platform")?.toUpperCase() === PLATFORM.XBOX && (
        <img
          src={"/img/icons/games/xbox_logo_PlatformId.svg"}
          style={{ width: "1.82rem" }}
        />
      )}
      {match && match?.get("platform")?.toUpperCase() === PLATFORM.PS4 && (
        <img
          src={"/img/icons/games/PlayStation_logo_new.svg"}
          style={{ width: "1.82rem" }}
        />
      )}
      {match &&
        (match?.get("platform")?.toUpperCase() === PLATFORM.PS4XBOX ||
          match?.get("platform")?.toUpperCase() === PLATFORM.NEXTGEN ||
          match?.get("platform")?.toUpperCase() === PLATFORM.NEXTGEN1) && (
          <img
            src={"/img/icons/games/sports_esports.svg"}
            style={{ width: "1.52rem" }}
          />
        )}
      {`${player?.get("platformId")}`}
    </FlexBox>
  );
};

export default PlatformTag;
