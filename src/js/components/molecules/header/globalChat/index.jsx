import React from "react";
import { Link } from "react-router-dom";
import { styled, withTheme } from "~theme";
import { Icon } from "~components/atoms";

const GlobalChat = ({ lan, theme }) => {
  return (
    <GlobalChatStyles>
      <Link to={`/${lan}/global-chat`}>
        <Icon
          color={`${theme.colors.white}`}
          icon={"discord_icon"}
          scale="1.6"
          viewBox="0 0 16 16"
        />
      </Link>
    </GlobalChatStyles>
  );
};

export default withTheme(GlobalChat);

const GlobalChatStyles = styled.div`
  transform: scaleX(-1);
  position: relative;
  top: 5px;
`;
