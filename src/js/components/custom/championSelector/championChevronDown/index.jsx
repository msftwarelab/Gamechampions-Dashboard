import React from "react";
import { styled, withTheme } from "~theme";

const ChampionChevronDown = () => {
  return (
    <div
      style={{
        position: "absolute",
        right: "-5px",
        height: "63.8px",
        width: "57px",
        borderBottomRightRadius: "100px",
        borderTopRightRadius: "100px",
        backgroundColor: "#00A826"
      }}
    >
      <DownArrow />
    </div>
  );
};

const DownArrow = styled("div")`
  background: url(/img/icons/ic_chevron_down.svg) center center no-repeat;
  width: 20px;
  height: 11px;
  margin: 1.65rem 0px 0px 1rem;
`;

export default withTheme(ChampionChevronDown);
