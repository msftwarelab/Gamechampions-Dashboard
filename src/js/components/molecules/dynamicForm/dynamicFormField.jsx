import React from "react";

import TextInput from "./form/textInput";
import TextArea from "./form/textArea";
import CheckBox from "./form/checkBox";
import RadioGroup from "./form/radioGroup";
import DropDown from "./form/dropDown";
import SingleDatePickerWrapper from "./form/singleDatePickerWrapper";
import ImageUpload from "./form/imageUpload";
import CustomField from "./form/customField";

import { FIELD_TYPES } from "./constants";
import FileUpload from "./form/fileUpload";
import PhoneNumber from "./form/phoneNumber";
import DropdownDatePickerWrapper from "./form/dropdownDatePickerWrapper";

const DynamicFormField = ({
  item,
  initialValue,
  register,
  watch,
  setValue,
  errors,
  isReadOnly
}) => {
  switch (item.componentType) {
    case FIELD_TYPES.TEXT_BOX:
      return (
        <TextInput
          register={register}
          watch={watch}
          errors={errors}
          setValue={setValue}
          name={item.name}
          fieldProps={item.fieldProps}
          validation={item.validation}
          readOnly={isReadOnly}
        />
      );
    case FIELD_TYPES.TEXT_AREA:
      return (
        <TextArea
          register={register}
          watch={watch}
          errors={errors}
          name={item.name}
          fieldProps={item.fieldProps}
          validation={item.validation}
          readOnly={isReadOnly}
        />
      );
    case FIELD_TYPES.CHECK_BOX:
      return (
        <CheckBox
          register={register}
          watch={watch}
          errors={errors}
          name={item.name}
          initialValue={initialValue}
          fieldProps={item.fieldProps}
          validation={item.validation}
          readOnly={isReadOnly}
        />
      );
    case FIELD_TYPES.RADIO_GROUP:
      return (
        <RadioGroup
          register={register}
          watch={watch}
          errors={errors}
          setValue={setValue}
          name={item.name}
          options={item.options}
          initialValue={initialValue}
          fieldProps={item.fieldProps}
          validation={item.validation}
          readOnly={isReadOnly}
        />
      );
    case FIELD_TYPES.DROP_DOWN:
      return (
        <DropDown
          register={register}
          watch={watch}
          errors={errors}
          setValue={setValue}
          name={item.name}
          options={item.options}
          initialValue={initialValue}
          fieldProps={item.fieldProps}
          validation={item.validation}
          readOnly={isReadOnly}
        />
      );
    case FIELD_TYPES.SINGLE_DATE_PICKER:
      return (
        <SingleDatePickerWrapper
          register={register}
          watch={watch}
          errors={errors}
          setValue={setValue}
          name={item.name}
          initialValue={initialValue}
          fieldProps={item.fieldProps}
          validation={item.validation}
          readOnly={isReadOnly}
        />
      );
    case FIELD_TYPES.DROPDOWN_DATE_PICKER:
      return (
        <DropdownDatePickerWrapper
          register={register}
          watch={watch}
          errors={errors}
          setValue={setValue}
          name={item.name}
          initialValue={initialValue}
          fieldProps={item.fieldProps}
          validation={item.validation}
          readOnly={isReadOnly}
        />
      );
    case FIELD_TYPES.IMAGE_UPLOAD:
      return (
        <ImageUpload
          register={register}
          watch={watch}
          setValue={setValue}
          name={item.name}
          initialValue={initialValue}
          fieldProps={item.fieldProps}
          onImageLoad={item.onImageLoad}
          readOnly={isReadOnly}
        />
      );
    case FIELD_TYPES.FILE_UPLOAD:
      return (
        <FileUpload
          register={register}
          watch={watch}
          setValue={setValue}
          name={item.name}
          initialValue={initialValue}
          fieldProps={item.fieldProps}
          onFileLoad={item.onFileLoad}
          readOnly={isReadOnly}
        />
      );
    case FIELD_TYPES.PHONE_NUMBER:
      return (
        <PhoneNumber
          register={register}
          placeholder={item.placeholder}
          errors={errors}
          name={item.name}
          validation={item.validation}
          className={item.className}
          material={item.material}
          setValue={setValue}
          watch={watch}
          countryCode={item.fieldProps.countryCode}
        />
      );
    case FIELD_TYPES.CUSTOM_FIELD:
      return (
        <CustomField
          watch={watch}
          item={item}
          initialValue={initialValue}
          className={item.className}
          register={register}
          errors={errors}
          setValue={setValue}
          fieldProps={item.fieldProps}
        />
      );
  }
};

export default DynamicFormField;
