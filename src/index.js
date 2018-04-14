import React from "react";
import { Field, FastField } from "formik";
import get from "lodash.get";

export const createField = (fields = {}) => {
  const {
    input: Input = "input",
    select: Select = "select",
    textarea: TextArea = "textarea",
    checkbox: Checkbox = "input",
    formGroup: FormGroup = "div",
    label: Label = "label",
    helpText: HelpText = "span",
    selectPathSpec = "target.value",
    fastMode = false
  } = fields;

  const helpText = (name, touched, errors) =>
    touched[name] &&
    errors[name] && <HelpText variant="danger">{errors[name]}</HelpText>;

  const CustomFormGroup = ({
    label,
    touched,
    errors,
    name,
    showLabel,
    children
  }) => (
    <FormGroup>
      {showLabel && <Label>{label}</Label>}
      {children}
      {helpText(name, touched, errors)}
    </FormGroup>
  );

  const CustomInput = ({ field, form, showLabel = true, label, ...props }) => (
    <CustomFormGroup
      {...form}
      label={label}
      showLabel={showLabel}
      name={field.name}
    >
      <Input {...field} {...props} label={label} />
    </CustomFormGroup>
  );

  const CustomTextarea = ({
    field,
    form,
    showLabel = true,
    label,
    ...props
  }) => (
    <CustomFormGroup
      {...form}
      label={label}
      showLabel={showLabel}
      name={field.name}
    >
      <TextArea {...field} {...props} label={label} />
    </CustomFormGroup>
  );

  const CustomSelect = ({
    field,
    form: { setFieldValue, ...formOthers },
    showLabel = true,
    label,
    ...props
  }) => (
    <CustomFormGroup
      {...formOthers}
      label={label}
      showLabel={showLabel}
      name={field.name}
    >
      <Select
        {...field}
        {...props}
        onChange={evt => setFieldValue(field.name, evt ? evt.value : "")}
        label={label}
      />
    </CustomFormGroup>
  );

  const CustomCheckBox = ({
    field,
    form,
    showLabel = true,
    label,
    ...props
  }) => (
    <CustomFormGroup
      {...form}
      label={label}
      showLabel={showLabel}
      name={field.name}
    >
      <Checkbox
        {...field}
        {...props}
        label={label}
        checked={get(form, `values.${field.name}`, false)}
      />
    </CustomFormGroup>
  );

  const inputs = {
    text: CustomInput,
    number: CustomInput,
    email: CustomInput,
    password: CustomInput,
    tel: CustomInput,
    url: CustomInput,
    color: CustomInput,
    date: CustomInput,
    month: CustomInput,
    range: CustomInput,
    search: CustomInput,
    time: CustomInput,
    week: CustomInput,
    checkbox: CustomCheckBox,
    "datetime-local": CustomInput,
    select: CustomSelect,
    textarea: CustomTextarea
  };

  const excludedFastTypes = ["select"];

  const FieldComponet = fastMode ? FastField : Field;

  return ({ type = "text", ...props }) => {
    const InputComponent = inputs[type];
    return <FieldComponet component={InputComponent} type={type} {...props} />;
  };
};
