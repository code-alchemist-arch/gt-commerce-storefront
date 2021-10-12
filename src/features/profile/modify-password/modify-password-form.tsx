import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useToasts } from "react-toast-notifications";

import { useMutation } from "@apollo/client";
import { PASSWORD_CHANGE } from "graphql/mutation/user";
import {
  FormWrapper,
  FormInputsWrapper,
  FormErrorsWrapper,
} from "./modify-password.style";
import {
  FormGroup,
  FormInput,
  SubmitButton,
} from "../../../layouts/layout.style";
import HideEyeIcon from "../../../assets/icons/HideEyeIcon";
import ShowEyeIcon from "../../../assets/icons/ShowEyeIcon";
import AlertIcon from "../../../assets/icons/AlertIcon";
import ErrorCircleIcon from "../../../assets/icons/ErrorCircleIcon";
import CheckCircleIcon from "../../../assets/icons/CheckCircleIcon";
import {
  ErrorMessageComponent,
  InteractiveErrorMessageComponent,
  PasswordToggleButton,
  TextLabel,
} from "../../account/signinout-form";

const validationMessages = {
  password: {
    min: "Must contain more than 6 characters.",
    // lowercase: 'At least one lowercase char',
    // uppercase: 'At least one uppercase char',
    // number: 'At least one number',
    required: "Password is required",
  },
};

const FormSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Required"),
  newPassword: Yup.string()
    .min(6, validationMessages.password.min)
    // .matches(/[a-z]/, validationMessages.password.lowercase)
    // .matches(/[A-Z]/, validationMessages.password.uppercase)
    // .matches(/[0-9]/, validationMessages.password.number)
    .required(validationMessages.password.required),
});

const ModifyPasswordForm = () => {
  const { addToast } = useToasts();

  const [passwordErrors, setPasswordErrors] = useState(
    Object.values(validationMessages.password)
  );
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordChangeMutation, { loading }] = useMutation(PASSWORD_CHANGE);

  const handlePasswordChange = (event, { setTouched }) => {
    try {
      FormSchema.validateSync(
        { newPassword: event.target.value },
        { abortEarly: false }
      );
    } catch (error) {
      const { errors } = error;
      setPasswordErrors(errors);
      setTouched({ oldPassword: true, newPassword: true });
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { oldPassword, newPassword } = values;
      const {
        data: {
          passwordChange: { user, accountErrors },
        },
      } = await passwordChangeMutation({
        variables: { oldPassword, newPassword },
      });

      if (accountErrors.length) {
        addToast(
          "There was an error trying to update your password. Try Again.",
          {
            appearance: "error",
            autoDismiss: true,
          }
        );
      } else {
        addToast("Your Password was updated successfully.", {
          appearance: "success",
          autoDismiss: true,
        });
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{ oldPassword: "", newPassword: "" }}
      validationSchema={FormSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, errors, touched, setTouched }) => (
        <Form>
          <FormWrapper>
            <FormInputsWrapper>
              <FormInput
                className={
                  errors.oldPassword && touched.oldPassword ? "hasErrors" : ""
                }
              >
                <Field
                  name="oldPassword"
                  type={showCurrentPassword ? "" : "password"}
                  placeholder="Current Password"
                />

                <PasswordToggleButton
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <HideEyeIcon height={25} width={25} />
                  ) : (
                    <ShowEyeIcon height={25} width={25} />
                  )}
                </PasswordToggleButton>
              </FormInput>
              <ErrorMessage
                name="oldPassword"
                render={(msg) => (
                  <ErrorMessageComponent>
                    <AlertIcon />
                    <TextLabel>{msg}</TextLabel>
                  </ErrorMessageComponent>
                )}
              />
              <FormInput>
                <Field
                  name="newPassword"
                  type={showPassword ? "" : "password"}
                  placeholder="New Password"
                  onKeyUp={(e) => handlePasswordChange(e, { setTouched })}
                />

                <PasswordToggleButton
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <HideEyeIcon height={25} width={25} />
                  ) : (
                    <ShowEyeIcon height={25} width={25} />
                  )}
                </PasswordToggleButton>
              </FormInput>
            </FormInputsWrapper>
            <FormErrorsWrapper>
              {Object.values(validationMessages.password)
                .filter(
                  (message) => message !== validationMessages.password.required
                )
                .map((message, index) => (
                  <InteractiveErrorMessageComponent
                    key={index}
                    touched={!!touched.newPassword}
                    success={!passwordErrors.includes(message)}
                  >
                    {touched.newPassword && passwordErrors.includes(message) ? (
                      <ErrorCircleIcon />
                    ) : (
                      <CheckCircleIcon />
                    )}
                    <TextLabel>{message}</TextLabel>
                  </InteractiveErrorMessageComponent>
                ))}
            </FormErrorsWrapper>
            <FormGroup className="actions">
              <SubmitButton type="submit" disabled={!isValid || loading}>
                {loading ? "Saving Address.." : "Save Password"}
              </SubmitButton>
            </FormGroup>
          </FormWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default ModifyPasswordForm;
