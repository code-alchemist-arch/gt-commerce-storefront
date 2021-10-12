import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MaskedInput from "react-text-mask";
import {
  ErrorMessageComponent,
  FormGroup,
  FormInput,
  TextLabel,
} from "../../layouts/layout.style";
import AlertIcon from "../../assets/icons/AlertIcon";

const defaultPaymentData = {
  cvc: "",
  expiry: "",
  name: "",
  number: "",
};

const PaymentForm = ({ onFieldChange, focus, initialData }) => {
  let numberInput;

  // React.useEffect(() => {
  //   focus && numberInput.focus();
  // }, [focus]);

  const handleOnChange = (field, value) => {
    onFieldChange && onFieldChange(field, value);
  };
  console.log({ initialData });
  return (
    <div id="PaymentForm">
      <Formik
        initialValues={initialData || defaultPaymentData}
        validationSchema={Yup.object({
          cvc: Yup.number().required("Required"),
          expiry: Yup.string().required("Required"),
          name: Yup.string().required("Required"),
          number: Yup.string()
            .min(16, "Please check credit card number")
            .max(16, "Please check credit card number")
            .required("Required"),
        })}
        onSubmit={(values) => console.log(values)}
      >
        {({ errors, touched, isValid, setFieldValue }) => (
          <Form>
            <FormInput
              className={errors.number && touched.number ? "hasErrors" : ""}
            >
              <Field
                name="number"
                type="text"
                innerRef={(input) => {
                  numberInput = input;
                }}
              >
                {({ form, field }) => (
                  <MaskedInput
                    placeholder="Credit card number"
                    mask={[
                      /[0-9]/,
                      /[0-9]/,
                      /[0-9]/,
                      /[0-9]/,
                      " ",
                      /[0-9]/,
                      /[0-9]/,
                      /[0-9]/,
                      /[0-9]/,
                      " ",
                      /[0-9]/,
                      /[0-9]/,
                      /[0-9]/,
                      /[0-9]/,
                      " ",
                      /[0-9]/,
                      /[0-9]/,
                      /[0-9]/,
                      /[0-9]/,
                    ]}
                    {...field}
                    onChange={(event) => {
                      const value = event.target.value
                        .replace(/_/g, "")
                        .replace(/ /g, "")
                        .trim();
                      handleOnChange("number", value);
                      form.setFieldValue(field.name, value);
                      console.log(value);
                    }}
                  />
                )}
              </Field>
            </FormInput>
            <ErrorMessage
              name="number"
              render={(msg) => (
                <ErrorMessageComponent>
                  <AlertIcon />
                  <TextLabel>{msg}</TextLabel>
                </ErrorMessageComponent>
              )}
            />

            <FormGroup>
              <FormInput
                className={errors.name && touched.name ? "hasErrors" : ""}
              >
                <Field
                  name="name"
                  placeholder="Name on Card"
                  type="text"
                  onChange={(event) => {
                    setFieldValue("name", event.target.value);
                    handleOnChange("name", event.target.value);
                  }}
                />
              </FormInput>
              <ErrorMessage
                name="name"
                render={(msg) => (
                  <ErrorMessageComponent>
                    <AlertIcon />
                    <TextLabel>{msg}</TextLabel>
                  </ErrorMessageComponent>
                )}
              />
            </FormGroup>

            <FormGroup>
              <FormInput
                className={errors.expiry && touched.expiry ? "hasErrors" : ""}
              >
                <Field name="expiry" type="text">
                  {({ form, field }) => (
                    <MaskedInput
                      placeholder="Valid thru"
                      mask={[/[0-9]/, /[0-9]/, "/", /[0-9]/, /[0-9]/]}
                      {...field}
                      onChange={(event) => {
                        handleOnChange(
                          field.name,
                          event.target.value.replace(/_/g, "").trim()
                        );
                        form.setFieldValue(
                          field.name,
                          event.target.value.replace(/_/g, "").trim()
                        );
                      }}
                    />
                  )}
                </Field>
              </FormInput>
              <ErrorMessage
                name="expiry"
                render={(msg) => (
                  <ErrorMessageComponent>
                    <AlertIcon />
                    <TextLabel>{msg}</TextLabel>
                  </ErrorMessageComponent>
                )}
              />
            </FormGroup>

            <FormGroup>
              <FormInput
                className={errors.cvc && touched.cvc ? "hasErrors" : ""}
              >
                <Field name="cvc" type="number">
                  {({ form, field }) => (
                    <MaskedInput
                      placeholder="CVC"
                      mask={[/[0-9]/, /[0-9]/, /[0-9]/]}
                      {...field}
                      onChange={(event) => {
                        handleOnChange(
                          field.name,
                          event.target.value.replace(/_/g, "").trim()
                        );
                        form.setFieldValue(
                          field.name,
                          event.target.value.replace(/_/g, "").trim()
                        );
                      }}
                    />
                  )}
                </Field>
              </FormInput>
              <ErrorMessage
                name="cvc"
                render={(msg) => (
                  <ErrorMessageComponent>
                    <AlertIcon />
                    <TextLabel>{msg}</TextLabel>
                  </ErrorMessageComponent>
                )}
              />
            </FormGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentForm;
