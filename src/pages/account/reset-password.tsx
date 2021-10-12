import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import ResetPasswordForm from "features/account/reset-password";

const ResetPasswordPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Reset Account Password – Craft Cellars</title>
      </Head>
      <ResetPasswordForm />
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default ResetPasswordPage;
