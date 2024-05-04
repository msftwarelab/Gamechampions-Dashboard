import React from "react";
import { styled } from "~theme";
import { SpaceStyle } from "~components/styles";

const CustomeField = props => {
  const {
    className,
    item,
    material,
    watch,
    register,
    errors,
    setValue,
    initialValue,
    fieldProps
  } = props;
  const allFieldValues = watch();
  const Child = item.child;
  const { fieldStyle = {} } = item;
  return (
    <CustomeFieldStyle
      {...fieldStyle}
      className={`form-field ${className ? `form-field--${className}` : ""}
      ${material ? "form-field--material" : ""}`}
    >
      <Child
        allFieldValues={allFieldValues}
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
        initialValue={initialValue}
        fieldProps={fieldProps}
        {...item}
      />
    </CustomeFieldStyle>
  );
};

const CustomeFieldStyle = styled.div`
  ${SpaceStyle};
`;

export default CustomeField;
