import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  ErrorMessageComponent,
  FormInput,
  SubmitButton,
  TextLabel,
} from "../../layouts/layout.style";
import AlertIcon from "../../assets/icons/AlertIcon";

const ContactForm = ({ onSubmit, email, loadingState }) => {
  const initialValues = {
    email: email || "",
  };

  let emailInput;

  React.useEffect(() => {
    emailInput.focus();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        email: Yup.string()
          .required("Required")
          .email("Invalid email Address."),
      })}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit && onSubmit(values, setSubmitting);
      }}
    >
      {({ errors, touched, isValid, isSubmitting }) => (
        <Form>
          <FormInput
            className={errors.email && touched.email ? "hasErrors" : ""}
          >
            <Field
              name="email"
              placeholder="E-mail"
              type="text"
              autoComplete="off"
              innerRef={(input) => {
                emailInput = input;
              }}
              disabled={isSubmitting || loadingState}
            />
          </FormInput>
          <ErrorMessage
            name="email"
            render={(msg) => (
              <ErrorMessageComponent>
                <AlertIcon />
                <TextLabel>{msg}</TextLabel>
              </ErrorMessageComponent>
            )}
          />
          <SubmitButton
            type="submit"
            disabled={!isValid || isSubmitting || loadingState}
            className={
              !isValid || isSubmitting || loadingState ? "disabled" : ""
            }
          >
            {isSubmitting ? "Saving Contact..." : "Save Contact"}
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
