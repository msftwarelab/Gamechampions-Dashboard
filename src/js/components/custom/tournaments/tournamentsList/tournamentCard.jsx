import React from "react";
import { withTheme } from "styled-components";
import { Button, FlexBox, Paragraph, Image } from "~components/atoms";
import Countdown from "../countdown";
import Label from "./label";
import { styled } from "~theme";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TournamentCard = ({
  id,
  thumbnailUrl,
  totalPrize,
  dateTo,
  theme,
  isOngoing,
  gameId,
  selectedLanguage
}) => {
  const tournamentInfoUrl =
    `/${selectedLanguage}/game-lobby/${gameId}/tournaments/leaderboard/${id}` ||
    "";
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <Link to={tournamentInfoUrl}>
      <CardContainer isOngoing={isOngoing}>
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            width="100%"
            maxHeight="8rem"
            minHeight="8rem"
          />
        ) : (
          <FlexBox
            flexDirection="column"
            width={"100%"}
            height="8rem"
            minHeight="8rem"
            maxHeight={"8rem"}
            flex={1}
          />
        )}
        <Paragraph
          color={theme.colors.secondary}
          fontWeight="800"
          fontSize="4.375rem"
          lineHeight="normal"
        >
          &#36;{totalPrize}
        </Paragraph>
        <Label>{t("TournamentCardLabel")}</Label>
        <FlexBox
          justifyContent="center"
          alignItems="center"
          margin="30px 0"
          padding="0 16px 0 16px"
          width="100%"
          gap="20px"
          maxWidth="35rem"
        >
          <FlexBox
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="50%"
          >
            <FlexBox
              minHeight="2rem"
              justifyContent="center"
              alignItems="center"
            >
              <EqualHeightContainer>
                <Countdown dateTo={dateTo} isOngoing={isOngoing} />
              </EqualHeightContainer>
            </FlexBox>
            <Label>{t("TournamentCardCountDownLabel")}</Label>
          </FlexBox>
        </FlexBox>
        <FlexBox padding="0 14px 14px 14px" width="100%">
          <Button
            fontStyle="italic"
            width="100%"
            fontWeight="bold"
            isDisabled={!isOngoing}
            onClick={() => history.push(tournamentInfoUrl)}
          >
            {t("TournamentCardButton")}
          </Button>
        </FlexBox>
      </CardContainer>
    </Link>
  );
};

export default withTheme(TournamentCard);

const EqualHeightContainer = styled.div`
  display: flex;
  min-height: 2.2rem;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  width: 100%;
`;

const CardContainer = styled.div`
  display: flex;
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.boxShadows.primary};
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  flex-grow: 1;
  width: 100%;
  filter: grayscale(${({ isOngoing }) => (isOngoing ? 0 : 1)});
`;
