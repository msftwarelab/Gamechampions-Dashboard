import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { withTheme } from "styled-components";
import { FlexBox, Paragraph, Image, Button } from "~components/atoms";
import Card from "~components/card/card";
import Modal from "~components/modal/modal";
import TournamentPaywallPurchaseSuccess from "./purchaseComplete";
import TournamentPaywallPurchaseFailed from "./purchaseFailed";

const TournamentPaywall = ({
  theme,
  history,
  match,
  selectedLanguage,
  tournament,
  onEnergyRecharge,
  showTransactionResult,
  isSuccessfullTransaction,
  onSubmitChallenge,
  submitting
}) => {
  const { t } = useTranslation();
  const [selectedEnergyPackage, setSelectedEnergyPackage] = useState(
    tournament?.energyPackages[0] || null
  );
  const gameId = match.params.gameId;

  useEffect(() => {}, [
    tournament,
    selectedEnergyPackage,
    showTransactionResult,
    isSuccessfullTransaction
  ]);

  return (
    <>
      {tournament && !showTransactionResult && (
        <Modal
          onClick={() =>
            history.push(
              `/${selectedLanguage}/game-lobby/${gameId}/tournaments`
            )
          }
        >
          <Card
            closeUrl={`/${selectedLanguage}/game-lobby/${gameId}/tournaments`}
            footer={
              <ModalFooter
                onClick={() => onEnergyRecharge(selectedEnergyPackage)}
              />
            }
          >
            <Paragraph
              fontSize="1.4rem"
              fontWeight="800"
              fontStyle="italic"
              color={theme.colors.greyDark}
            >
              {t("TournamentPaywallTitle")}
            </Paragraph>
            <FlexBox alignItems="center" justifyContent="center">
              <Image
                src="/img/energy-package-recharge.svg"
                width="12.5rem"
                margin="12px 0 0 0"
              />
            </FlexBox>
            <FlexBox margin="2rem 0">
              <Paragraph
                color={theme.colors.grey}
                fontSize={{ base: "0.875rem", md: "1rem" }}
                fontWeight="400"
                textAlign="center"
              >
                {t("TournamentPaywallCaption")}
              </Paragraph>
            </FlexBox>

            <FlexBox
              flexDirection="column"
              alignItems="center"
              justifyContent="space-evenly"
              gap="16px"
            >
              {tournament?.energyPackages.map((energyPackage, index) => (
                <FlexBox
                  key={index}
                  alignItems="center"
                  justifyContent="space-between"
                  padding="17px"
                  borderRadius="6px"
                  borderStyle="solid"
                  borderColor={
                    selectedEnergyPackage === energyPackage
                      ? theme.colors.energyColor
                      : theme.colors.greySoft
                  }
                  borderWidth={
                    selectedEnergyPackage === energyPackage ? "3px" : "1px"
                  }
                  width="100%"
                  onClick={() => {
                    setSelectedEnergyPackage(energyPackage);
                  }}
                  cursor="pointer"
                >
                  <FlexBox alignItems="center" justifyContent="center">
                    <Image
                      src={
                        selectedEnergyPackage === energyPackage
                          ? "/img/icons/energy-hexagon.svg"
                          : "/img/icons/energy-hexagon-disabled.svg"
                      }
                      height="40px"
                      width="40px"
                    />
                    <Paragraph
                      fontSize="2.5rem"
                      fontWeight="800"
                      color={
                        selectedEnergyPackage === energyPackage
                          ? theme.colors.energyColor
                          : "#BABABA"
                      }
                    >
                      {energyPackage.numberOfMatches}
                    </Paragraph>
                  </FlexBox>
                  <FlexBox
                    alignItems="center"
                    justifyContent="center"
                    gap="12px"
                  >
                    <Paragraph
                      fontWeight="600"
                      fontSize="1.125rem"
                      color={
                        selectedEnergyPackage === energyPackage
                          ? theme.colors.energyColor
                          : "#BABABA"
                      }
                    >
                      &#36;{energyPackage.fee}
                    </Paragraph>
                    <FlexBox
                      width="17px"
                      height="17px"
                      borderRadius="100%"
                      borderColor={
                        selectedEnergyPackage === energyPackage
                          ? theme.colors.energyColor
                          : "#BABABA"
                      }
                      borderWidth={
                        selectedEnergyPackage === energyPackage ? "5px" : "2px"
                      }
                      borderStyle="solid"
                    />
                  </FlexBox>
                </FlexBox>
              ))}
            </FlexBox>
          </Card>
        </Modal>
      )}
      {showTransactionResult && (
        <>
          {isSuccessfullTransaction ? (
            <TournamentPaywallPurchaseSuccess
              match={match}
              selectedLanguage={selectedLanguage}
              onSubmitChallenge={onSubmitChallenge}
              numberOfMatches={selectedEnergyPackage.numberOfMatches}
              tournamentTitle={tournament.title}
              submitting={submitting}
            />
          ) : (
            <TournamentPaywallPurchaseFailed
              history={history}
              match={match}
              selectedLanguage={selectedLanguage}
            />
          )}
        </>
      )}
    </>
  );
};

const ModalFooter = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <Button
      fontStyle="italic"
      fontWeight="700"
      margin="20px 0 0 0"
      width="100%"
      onClick={onClick}
    >
      {t("TournamentPaywallButton")}
    </Button>
  );
};

export default withTheme(TournamentPaywall);
