import React from "react";
import { useTranslation } from "react-i18next";
import { withTheme } from "styled-components";
import { FlexBox, Paragraph, Image, Link } from "~components/atoms";
import Card from "~components/card/card";
import Modal from "~components/modal/modal";

const TournamentPaywallPurchaseFailed = ({
  theme,
  history,
  match,
  selectedLanguage
}) => {
  const { t } = useTranslation();
  const gameId = match.params.gameId;
  const returnUrl = `/${selectedLanguage}/game-lobby/${gameId}/tournaments`;
  return (
    <Modal onClick={() => history.push(returnUrl)}>
      <Card closeUrl={returnUrl} footer={<ModalFooter returnUrl={returnUrl} />}>
        <Paragraph
          fontSize="1.4rem"
          fontWeight="800"
          color={theme.colors.greyDark}
        >
          {t("TournamentPaywallFailedLabel")}
        </Paragraph>

        <Paragraph
          fontSize="1.2rem"
          fontWeight="500"
          color={theme.colors.greyDark}
          textAlign="center"
          margin="4rem 0"
        >
          {t("TournamentPaywallPurchaseFailedRetryLabel")}
        </Paragraph>

        <FlexBox justifyContent="center">
          <Image
            src="/img/icons/cancel-circle-24px.svg"
            width={{ base: "8rem", md: "10rem" }}
            margin="12px 0 0 0"
          />
        </FlexBox>

        <Paragraph
          color={theme.colors.grey}
          fontSize={{ base: "1.2rem", md: "1.2rem" }}
          margin="4rem 0"
          fontWeight="400"
          textAlign="center"
        >
          {t("TournamentPaywallFailedMessage")}
        </Paragraph>
      </Card>
    </Modal>
  );
};

const ModalFooter = ({ returnUrl }) => {
  const { t } = useTranslation();

  return (
    <FlexBox>
      <Link
        to={returnUrl}
        className={"button form__buttons__button form__buttons__button--cancel"}
        title="Cancel"
        onClick={() => {}}
      >
        {t("TournamentPaywallBackButton")}
      </Link>
    </FlexBox>
  );
};

export default withTheme(TournamentPaywallPurchaseFailed);
