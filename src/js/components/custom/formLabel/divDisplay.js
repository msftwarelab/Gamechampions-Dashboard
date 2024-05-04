import React from "react";
import { withTheme } from "~theme";
import { withTranslation } from "react-i18next";
import { useTranslation } from "react-i18next";
import { FlexBox } from "~components/atoms";

const DivDisplay = () => {
  const { t } = useTranslation();
  return (
    <>
      <FlexBox>
        <hr style={{ width: "43%" }} />
        OR
        <hr style={{ width: "43%" }} />
      </FlexBox>
      <h2>{t("SwiftDetailsTitle")}</h2>
    </>
  );
};

export default withTheme(withTranslation()(DivDisplay));
