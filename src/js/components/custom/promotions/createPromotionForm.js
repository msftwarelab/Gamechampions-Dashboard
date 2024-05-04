import React from "react";
import { useTranslation } from "react-i18next";

import { withTheme } from "~theme";
import { FlexBox } from "~components/atoms";
import {
  CREATE_PROMOTION_FORM_FIELDS,
  PROMOTION_ACTION_TYPE,
  PROMOTION_COMMISSION_TYPE
} from "~containers/promotions/constants";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import DynamicForm from "~components/molecules/dynamicForm";

const CreatePromotionForm = ({
  onCreatePromotion,
  fixed,
  commission,
  commissionTypeChange,
  page,
  history,
  returnUrl
}) => {
  const { t } = useTranslation();
  const actionList = {
    0: "ACTION TYPE",
    1: t(PROMOTION_ACTION_TYPE[1]),
    3: t(PROMOTION_ACTION_TYPE[3]),
    4: t(PROMOTION_ACTION_TYPE[4])
  };
  const commissionTypeList = {
    0: "COMMISSION TYPE",
    ...PROMOTION_COMMISSION_TYPE
  };

  return (
    <Modal onClick={() => history.push(returnUrl)}>
      <Card
        htmlProps={{
          margin: "1rem 0"
        }}
        padding="1rem 0.5rem"
        title={page.get("title")}
        closeUrl={returnUrl}
        className="player-matches-table-card"
      >
        <FlexBox flexDirection={{ md: "row-reverse", base: "column" }}>
          <DynamicForm
            formFields={CREATE_PROMOTION_FORM_FIELDS({
              actionList: actionList,
              commissionTypeList: Object.keys(commissionTypeList).map(item => {
                return (commissionTypeList[item] = t(commissionTypeList[item]));
              }),
              onCommissionTypeChange: commissionTypeChange,
              fixed: fixed,
              commission: commission
            })}
            returnUrl={returnUrl}
            onSubmit={e => {
              let data = { ...e };
              return onCreatePromotion(data)
                .then(() => {
                  history.push(returnUrl + "?success=true");
                })
                .catch(() => history.push(returnUrl + "?success=false"));
            }}
          />
        </FlexBox>
      </Card>
    </Modal>
  );
};

export default withTheme(CreatePromotionForm);
