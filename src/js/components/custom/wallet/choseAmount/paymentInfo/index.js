import React from "react";
import { useTranslation } from "react-i18next";
import { styled, withTheme } from "~theme";
import { FlexBoxStyle, PaddingStyle } from "~components/styles";
import { Paragraph, FlexBox, Image, Heading } from "~components/atoms";

const PaymentInfo = ({ rows }) => {
  const { t } = useTranslation();

  return (
    <PaymentInfoStyle padding={{ base: "2em 0 0.5em", md: ".5em 0" }}>
      {rows &&
        rows.map((row, idx) => {
          return (
            <FlexBox alignItems="center" flexDirection="column" key={idx}>
              <Image
                width="5rem"
                height="5rem"
                src={row.img}
                margin={{
                  base: "0 0 1rem 0",
                  md: "0"
                }}
              />
              <Heading
                textTransform="uppercase"
                fontSize="1.25em"
                color="#3e8395"
                textAlign="center"
                margin="0.375rem"
              >
                {t(row.title)}
              </Heading>
              <Paragraph
                textAlign="center"
                margin={{ base: "0", md: "0.5rem" }}
                color="#3e8395"
              >
                {t(row.content)}
              </Paragraph>
            </FlexBox>
          );
        })}
    </PaymentInfoStyle>
  );
};

export const PaymentInfoStyle = styled("div")`
  ${FlexBoxStyle};
  ${PaddingStyle};
`;

export default withTheme(PaymentInfo);
