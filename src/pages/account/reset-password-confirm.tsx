import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import ResetPasswordConfirmForm from "features/account/reset-password-confirm";

const ResetPasswordPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Reset Password Confirmation – Craft Cellars</title>
      </Head>
      <ResetPasswordConfirmForm />
    </>
  );
};

export default ResetPasswordPage;
