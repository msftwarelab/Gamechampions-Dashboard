import React from "react";
import { useTranslation } from "react-i18next";
import { withTheme } from "~theme";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import DynamicForm from "~components/molecules/dynamicForm";
import { PROMOTE_AFFILIATE } from "~containers/affiliates/constants";
import { ErrorInfo } from "../errorInfo";

const PromoteAffiliateForm = ({
  page,
  history,
  returnUrl,
  selectedAffiliate,
  onPromoteAffiliate,
  promotionsList,
  error
}) => {
  const { t } = useTranslation();
  return (
    <Modal onClick={() => history.push(returnUrl)}>
      <Card
        htmlProps={{
          margin: "1rem 0"
        }}
        padding="1rem 0.5rem"
        title={page.get("title")}
        closeUrl={returnUrl}
      >
        <DynamicForm
          formFields={PROMOTE_AFFILIATE({
            promotionsList: promotionsList
          })}
          returnUrl={returnUrl}
          onSubmit={e => {
            let data = { ...e };
            data.affiliateId = selectedAffiliate && selectedAffiliate.get("id");
            return onPromoteAffiliate(data)
              .then(() => {
                history.push(returnUrl);
              })
              .catch();
          }}
          extraContents={error && <ErrorInfo>{t(error)}</ErrorInfo>}
        />
      </Card>
    </Modal>
  );
};

export default withTheme(PromoteAffiliateForm);
