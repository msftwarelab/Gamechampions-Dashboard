import React, { useEffect } from "react";
import { withTheme } from "~theme";
import { FlexBox, Paragraph } from "~components/atoms";
import { useTranslation } from "react-i18next";
import SecureInfo from "../secureInfo/index";
import TextInput from "~components/molecules/dynamicForm/form/textInput";

const Amount = ({
  selectedAmount,
  commission,
  minimunAmountCommission,
  paymentSecure,
  register,
  errors,
  setValue,
  onRadioChange,
  watch
}) => {
  const { t } = useTranslation();
  const finalCommission =
    selectedAmount > 3 ? commission : minimunAmountCommission;
  const finalAmount = selectedAmount * (parseFloat(finalCommission) / 100 + 1);
  useEffect(() => {
    setValue("amount", selectedAmount);
  }, [selectedAmount]);
  return (
    <FlexBox
      justifyContent="center"
      flexWrap="wrap"
      height={{ base: "auto", md: "10rem" }}
      margin="1.5rem 0"
    >
      <FlexBox
        display={{ base: "none", md: "flex" }}
        flex={{ base: "1" }}
        justifyContent="center"
        margin={{ base: "0 2rem" }}
      >
        <SecureInfo rows={paymentSecure}></SecureInfo>
      </FlexBox>
      <FlexBox
        display="flex"
        height="fit-content"
        padding={{ base: "0", md: "0 0 0 1em" }}
        flexDirection="column"
        justifyContent="flex-start"
        alignContent="center"
        flex={{ base: "1" }}
      >
        <Paragraph textAlign="center">{t("AmountToPay")}</Paragraph>
        <FlexBox justifyContent="center">
          <Paragraph
            margin="0"
            padding={{ base: "0.5rem 0", md: "0.25rem 0" }}
            fontSize="1.5rem"
            fontWeight="500"
            textAlign="center"
          >
            {!isNaN(finalAmount) && `$${finalAmount.toFixed(2)}`}
          </Paragraph>
        </FlexBox>
        <TextInput
          register={register}
          watch={watch}
          errors={errors}
          setValue={setValue}
          name="amount"
          validation={{ required: "ChooseAmountRequired" }}
          fieldProps={{
            className: "single promo-code",
            label: "AmountLabel",
            type: "number",
            autoComplete: "amount",
            material: true,
            onChange: onRadioChange
          }}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default withTheme(Amount);
