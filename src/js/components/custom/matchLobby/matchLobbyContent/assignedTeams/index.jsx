import React from "react";
import { styled, media, withTheme } from "~theme";
import { Heading, FlexBox, Paragraph, Link } from "~components/atoms";
import { useTranslation } from "react-i18next";
import { UMBRACO_API_URL } from "~service/constants";
import { SizeStyle } from "~components/styles";

const AssignedTeams = ({
  match,
  theme,
  challeneger,
  defender,
  showTeams,
  selectedLanguage
}) => {
  const { t } = useTranslation();
  return (
    <MatchInfoStyle>
      <Heading
        color={theme.colors.white}
        backgroundColor={theme.colors.tertiary}
        margin="0"
        padding="0 0 0 0.5em"
        fontSize={theme.fonts.fontSizeNormal}
        fontWeight={theme.fonts.semiBold}
        textTransform="uppercase"
        display="flex"
        alignItems="center"
        height="2rem"
      >
        {t("AssignedTeams")}
      </Heading>
      <FlexBox
        padding="0.5em"
        color={theme.colors.fontColor}
        flexWrap="wrap"
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-around"
      >
        <FlexBox alignItems="center" flexDirection="column">
          <Link
            to={`/${selectedLanguage}/player-details/${challeneger.get("id")}`}
            color={theme.colors.black}
          >
            <Paragraph fontSize={theme.fonts.large}>
              {challeneger.get("userName")}
            </Paragraph>
          </Link>
          <Paragraph fontSize={theme.fonts.small}>
            {challeneger.get("platformId")}
          </Paragraph>
          <ThumbnailStyle
            src={
              showTeams
                ? match &&
                  match.get("challengerTeam") &&
                  match.get("challengerTeam").get("thumbnailUrl")
                : `${UMBRACO_API_URL}media/1738/questionmark.png`
            }
            alt={`${challeneger.get("title")} thumbnail`}
            title={
              match &&
              match.get("challengerTeam") &&
              match.get("challengerTeam").get("title")
            }
            height="60px"
            width="60px"
          />
          <Paragraph fontSize={theme.fonts.fontSizeNormal}>
            {showTeams
              ? match &&
                match.get("challengerTeam") &&
                match.get("challengerTeam").get("title")
              : ""}
          </Paragraph>
        </FlexBox>
        <FlexBox margin="1em" alignItems="center">
          <Heading>VS</Heading>
        </FlexBox>
        <FlexBox alignItems="center" flexDirection="column">
          <Link
            to={`/${selectedLanguage}/player-details/${defender.get("id")}`}
            color={theme.colors.black}
          >
            <Paragraph fontSize={theme.fonts.large}>
              {defender.get("userName")}
            </Paragraph>
          </Link>
          <Paragraph fontSize={theme.fonts.small}>
            {defender.get("platformId")}
          </Paragraph>
          <ThumbnailStyle
            src={
              showTeams
                ? match &&
                  match.get("defenderTeam") &&
                  match.get("defenderTeam").get("thumbnailUrl")
                : `${UMBRACO_API_URL}media/1738/questionmark.png`
            }
            alt={`${challeneger.get("title")} thumbnail`}
            title={
              match &&
              match.get("defenderTeam") &&
              match.get("defenderTeam").get("title")
            }
            height="60px"
            width="60px"
          />
          <Paragraph fontSize={theme.fonts.fontSizeNormal}>
            {showTeams
              ? match &&
                match.get("defenderTeam") &&
                match.get("defenderTeam").get("title")
              : ""}
          </Paragraph>
        </FlexBox>
      </FlexBox>
      <Paragraph color={theme.colors.grey} fontSize={theme.fonts.xxSmall}>
        {t("MandatoryTeams")}
      </Paragraph>
    </MatchInfoStyle>
  );
};

export default withTheme(AssignedTeams);

const MatchInfoStyle = styled.div`
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.boxShadows.primary};

  ${media.md`
    margin: 0 0.5rem 1rem 1rem;
  `};
`;
const ThumbnailStyle = styled.img`
  object-fit: cover;
  ${SizeStyle};
`;
