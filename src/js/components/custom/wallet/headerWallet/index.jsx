import React from "react";
import { withTheme } from "~theme";
import { WalletDiv } from "./walletDiv";
import { WalletText } from "./walletText";
import { Button, Icon } from "~components/atoms";
import { withRole } from "~hocs";
import { ROLES } from "~service/constants";

const HeaderWallet = ({ url, theme, availableAmount }) => {
  return (
    <Button
      backgroundColor="transparent"
      padding="0"
      to={url}
      borderRadius="100px"
    >
      <WalletDiv>
        <WalletText>{availableAmount}</WalletText>
      </WalletDiv>
    </Button>
  );
};

HeaderWallet.Roles = [ROLES.PLAYER];

export default withRole(withTheme(HeaderWallet));
