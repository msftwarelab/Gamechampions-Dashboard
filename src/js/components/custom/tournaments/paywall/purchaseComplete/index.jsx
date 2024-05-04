import React from "react";
import { useTranslation } from "react-i18next";
import { withTheme } from "styled-components";
import { FlexBox, Paragraph, Image, Link, Button } from "~components/atoms";
import Card from "~components/card/card";
import Modal from "~components/modal/modal";

const TournamentPaywallPurchaseComplete = ({
  theme,
  match,
  selectedLanguage,
  onSubmitChallenge,
  numberOfMatches,
  tournamentTitle,
  submitting
}) => {
  const { t } = useTranslation();
  const gameId = match.params.gameId;
  const returnUrl = `/${selectedLanguage}/game-lobby/${gameId}/tournaments`;
  return (
    <Modal returnUrl={returnUrl} onClick={onSubmitChallenge}>
      <Card
        closeUrl={returnUrl}
        footer={
          <ModalFooter
            returnUrl={returnUrl}
            onSubmitChallenge={onSubmitChallenge}
            submitting={submitting}
          />
        }
      >
        <Paragraph
          fontSize="1.4rem"
          fontWeight="800"
          color={theme.colors.greyDark}
        >
          {t("TournamentPaywallPurchaseCompleteLabel")}
        </Paragraph>

        <Paragraph
          fontSize="1.2rem"
          fontWeight="500"
          color={theme.colors.greyDark}
          textAlign="center"
          margin="4rem 0"
        >
          {t("TournamentPaywallSuccessLabel")}
        </Paragraph>

        <FlexBox justifyContent="center">
          <Image
            src="/img/energy-package-recharge-success.svg"
            width={{ base: "20rem", md: "24rem" }}
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
          {t("TournamentPaywallSuccessMessage", {
            numberOfMatches,
            tournamentTitle
          })}
        </Paragraph>
      </Card>
    </Modal>
  );
};

const ModalFooter = ({ returnUrl, onSubmitChallenge, submitting }) => {
  const { t } = useTranslation();

  return (
    <FlexBox flexDirection={"column"} justifyContent="center">
      <Button onClick={onSubmitChallenge} isLoading={submitting}>
        {t("TournamentCardButton")}
      </Button>

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

export default withTheme(TournamentPaywallPurchaseComplete);
