import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  CancelButton,
  ErrorMessageComponent,
  FormGroup,
  FormInput,
  FormSelect,
  FormWrapper,
  SubmitButton,
  TextLabel,
} from "../../layouts/layout.style";
import AlertIcon from "../../assets/icons/AlertIcon";
import Label from "../../components/label/label";
import { defaultTheme } from "../../site-settings/site-theme/default";
import Select from "../../components/select/select";
import AsyncSelect from "../../components/select/async-select";

const shippingCountryOptions = [{ value: "CA", label: "Canada" }];

const findCountryByName = async (name): Promise<any> => {
  const response = await fetch(`https://restcountries.eu/rest/v2/name/${name}`);
  const data = await response.json();
  return data.map((i) => ({ value: i.alpha2Code, label: i.name }));
};

const normalizeData = (addressData) => {
  const {
    firstName,
    lastName,
    companyName,
    streetAddress1,
    streetAddress2,
    city,
    countryArea,
    postalCode,
    phone,
    country,
    isDefaultShippingAddress,
    isDefaultBillingAddress,
  } = addressData;

  const { code } = country;
  return {
    firstName,
    lastName,
    companyName,
    streetAddress1,
    streetAddress2,
    city,
    countryArea,
    postalCode,
    phone,
    country: code,
    isDefaultShippingAddress,
    isDefaultBillingAddress,
  };
};

const emptyValues = {
  firstName: "",
  lastName: "",
  companyName: "",
  streetAddress1: "",
  streetAddress2: "",
  city: "",
  countryArea: "",
  postalCode: "",
  phone: "",
  country: {
    code: "CA",
  },
  // addressName: '',
  isDefaultShippingAddress: false,
  isDefaultBillingAddress: false,
};

type AddressProps = {
  initialValues?: any;
  onSubmit: Function;
  onCancel?: Function;
  focus?: boolean;
  loadingState?: boolean;
  mode?: "shippingAddress" | undefined;
  columns?: "one" | "two";
  setDefaultUsage?: boolean;
};

const AddressForm: React.FC<AddressProps> = ({
  initialValues = emptyValues,
  onSubmit,
  onCancel,
  focus = true,
  loadingState = false,
  mode,
  columns = "one",
  setDefaultUsage = false,
}: AddressProps) => {
  let firstNameInput;

  React.useEffect(() => {
    focus && firstNameInput.focus();
  }, [focus]);

  return (
    <FormWrapper className={`column-${columns}`}>
      <Formik
        initialValues={normalizeData(initialValues)}
        validationSchema={Yup.object({
          firstName: Yup.string().required("Required"),
          lastName: Yup.string().required("Required"),
          companyName: Yup.string(),
          streetAddress1: Yup.string().required("Required"),
          streetAddress2: Yup.string(),
          city: Yup.string(),
          country: Yup.string(),
          countryArea: Yup.string(),
          postalCode: Yup.string(),
          phone: Yup.string()
            // .matches(
            //   /^(\+?1\s)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
            //   'Phone number is not valid',
            // )
            .required("Required"),
          // addressName: Yup.string().required('Required'),
        })}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          const submitedValues = { ...values };
          if (!setDefaultUsage) {
            delete submitedValues.isDefaultShippingAddress;
            delete submitedValues.isDefaultBillingAddress;
          }
          onSubmit && onSubmit(submitedValues, { setErrors });
        }}
      >
        {({ values, errors, touched, isValid, setFieldValue }) => (
          <Form>
            <FormGroup>
              <FormInput
                className={
                  errors.firstName && touched.firstName ? "hasErrors" : ""
                }
              >
                <Field
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  innerRef={(input) => {
                    firstNameInput = input;
                  }}
                />
              </FormInput>
              <ErrorMessage
                name="firstName"
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
                className={
                  errors.lastName && touched.lastName ? "hasErrors" : ""
                }
              >
                <Field name="lastName" placeholder="Last Name" type="text" />
              </FormInput>
              <ErrorMessage
                name="lastName"
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
                className={
                  errors.companyName && touched.companyName ? "hasErrors" : ""
                }
              >
                <Field
                  name="companyName"
                  placeholder="Company (optional)"
                  type="text"
                />
              </FormInput>
              <ErrorMessage
                name="companyName"
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
                className={
                  errors.streetAddress1 && touched.streetAddress1
                    ? "hasErrors"
                    : ""
                }
              >
                <Field
                  name="streetAddress1"
                  placeholder="Address"
                  type="text"
                />
              </FormInput>
              <ErrorMessage
                name="streetAddress1"
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
                className={
                  errors.streetAddress2 && touched.streetAddress2
                    ? "hasErrors"
                    : ""
                }
              >
                <Field
                  name="streetAddress2"
                  placeholder="Apartment, suite, etc. (optional)"
                  type="text"
                />
              </FormInput>
              <ErrorMessage
                name="streetAddress2"
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
                className={errors.city && touched.city ? "hasErrors" : ""}
              >
                <Field name="city" placeholder="City" type="text" />
              </FormInput>
              <ErrorMessage
                name="city"
                render={(msg) => (
                  <ErrorMessageComponent>
                    <AlertIcon />
                    <TextLabel>{msg}</TextLabel>
                  </ErrorMessageComponent>
                )}
              />
            </FormGroup>
            <FormGroup>
              <FormSelect
                className={errors.country && touched.country ? "hasErrors" : ""}
              >
                {mode === "shippingAddress" ? (
                  <Field
                    name="country"
                    placeholder="Country"
                    component={Select}
                    options={shippingCountryOptions}
                  />
                ) : (
                  <Field
                    name="country"
                    placeholder="Country"
                    component={AsyncSelect}
                    // defaultOptions={billingCountryOptions}
                    defaultValue={
                      values.country
                        ? { value: values.country, label: values.country }
                        : { value: "CA", label: "Canada" }
                    }
                    loadFunction={findCountryByName}
                  />
                )}
              </FormSelect>
              <ErrorMessage
                name="country"
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
                className={
                  errors.countryArea && touched.countryArea ? "hasErrors" : ""
                }
              >
                <Field name="countryArea" placeholder="Province" type="text" />
              </FormInput>
              <ErrorMessage
                name="countryArea"
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
                className={
                  errors.postalCode && touched.postalCode ? "hasErrors" : ""
                }
              >
                <Field
                  name="postalCode"
                  placeholder="Postal Code"
                  type="text"
                />
              </FormInput>
              <ErrorMessage
                name="postalCode"
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
                className={errors.phone && touched.phone ? "hasErrors" : ""}
              >
                <Field name="phone" placeholder="Phone" type="text" />
              </FormInput>
              <ErrorMessage
                name="phone"
                render={(msg) => (
                  <ErrorMessageComponent>
                    <AlertIcon />
                    <TextLabel>{msg}</TextLabel>
                  </ErrorMessageComponent>
                )}
              />
            </FormGroup>

            {setDefaultUsage && (
              <FormGroup className="defaultUsage">
                <Field
                  name="isDefaultShippingAddress"
                  type="checkbox"
                  component={() => (
                    <Label
                      iconName={`${
                        values.isDefaultShippingAddress
                          ? "checkSquare"
                          : "square"
                      }`}
                      iconColor={
                        values.isDefaultShippingAddress
                          ? defaultTheme.primary.color
                          : defaultTheme.colors.black
                      }
                      text="Use this as default shipping address."
                      fontSize={13}
                      fontWeight={400}
                      iconWidth={20}
                      iconHeight={20}
                      onClick={() =>
                        setFieldValue(
                          "isDefaultShippingAddress",
                          !values.isDefaultShippingAddress
                        )
                      }
                    />
                  )}
                />
                <Field
                  name="isDefaultBillingAddress"
                  type="checkbox"
                  component={() => (
                    <Label
                      iconName={`${
                        values.isDefaultBillingAddress
                          ? "checkSquare"
                          : "square"
                      }`}
                      iconColor={
                        values.isDefaultBillingAddress
                          ? defaultTheme.primary.color
                          : defaultTheme.colors.black
                      }
                      text="Use this as default billing address."
                      fontSize={13}
                      fontWeight={400}
                      iconWidth={20}
                      iconHeight={20}
                      onClick={() =>
                        setFieldValue(
                          "isDefaultBillingAddress",
                          !values.isDefaultBillingAddress
                        )
                      }
                    />
                  )}
                />
              </FormGroup>
            )}
            {/* <FormInput className={errors.addressName && touched.addressName ? 'hasErrors' : ''}>
              <Field name="addressName" placeholder="Name this address" type="text" />
            </FormInput>
            <ErrorMessage
              name="addressName"
              render={(msg) => (
                <ErrorMessageComponent>
                  <AlertIcon />
                  <TextLabel>{msg}</TextLabel>
                </ErrorMessageComponent>
              )}
            /> */}
            <FormGroup className="actions">
              <SubmitButton type="submit" disabled={!isValid || loadingState}>
                {loadingState ? "Saving Address.." : "Save Address"}
              </SubmitButton>
              {onCancel && (
                <CancelButton
                  onClick={(event) => {
                    event.preventDefault();
                    onCancel();
                  }}
                >
                  Cancel
                </CancelButton>
              )}
            </FormGroup>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default AddressForm;
