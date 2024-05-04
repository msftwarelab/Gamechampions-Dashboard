import React from "react";
import { useTranslation } from "react-i18next";
import { styled, withTheme, media } from "~theme";
import { PaddingStyle, SizeStyle, SpaceStyle } from "~components/styles";
import { FlexBox } from "~components/atoms";

const SecureInfo = ({ rows }) => {
  const { t } = useTranslation();

  return (
    <SecureInfoStyle>
      <FlexBox
        position="relative"
        flexDirection="column"
        alignItems="center"
        padding="1.5em 0.5em 1.5em 0.5em"
        display="flex"
        justifyContent="center"
        maxWidth="30em"
        flexWrap="wrap"
      >
        {rows && rows.length && (
          <>
            {rows &&
              rows.length &&
              rows.map((i, k) => {
                return (
                  <ImageStyled key={k} width="60%" height="auto" src={i.img} />
                );
              })}
            <SecureTextStyle padding="0.5em">
              {t("DepositAmountSecurePayment")}
            </SecureTextStyle>
          </>
        )}
      </FlexBox>
    </SecureInfoStyle>
  );
};

const SecureInfoStyle = styled("div")`
  border: solid 1px ${({ theme }) => theme.colors.black};
  margin: 1rem 0 0;
  ${media.md`
    margin: 0;
  `};
`;

const SecureTextStyle = styled.p`
  ${PaddingStyle};
  position: relative;
  border: solid 1px ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
  margin: 0;
  top: -1.25rem;
  position: absolute;
`;

const ImageStyled = styled.img`
  ${SizeStyle};
  ${SpaceStyle};
  object-fit: contain;
`;
export default withTheme(SecureInfo);
