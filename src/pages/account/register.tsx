import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import SignUpForm from "features/account/signup";

const RegisterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Account – Craft Cellars</title>
      </Head>
      <SignUpForm />
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default RegisterPage;
