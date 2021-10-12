import React from "react";

import {
  ErrorCode,
  ErrorImageWrapper,
  ErrorInformation,
  ErrorMessage,
  ErrorTitle,
  ErrorWrapper,
} from "./error.style";

import Image from "next/image";
import GoToButton from "../go-to-button/go-to-button";
import { HOME_PAGE } from "../../site-settings/site-navigation";

const image404 = "/images/404.png";
const image500 = "/images/500.png";
const imageUnexpected = "/images/unexpected.png";

const Error = ({ statusCode }) => {
  return (
    <ErrorWrapper>
      <ErrorInformation>
        <ErrorTitle>Oops!</ErrorTitle>
        {statusCode === 404 ? (
          <ErrorMessage>
            We can&apos;t seem to find the page you&apos;re looking for. <br />
            Please try with a different search.
          </ErrorMessage>
        ) : statusCode === 500 ? (
          <ErrorMessage>
            Something went wrong. Please try again later.
          </ErrorMessage>
        ) : (
          <ErrorMessage>
            An unexpected error has occurred. Please reload the page and try
            again.
          </ErrorMessage>
        )}
        <ErrorCode>Error code: {statusCode}</ErrorCode>
        <GoToButton
          href={HOME_PAGE}
          textLink="Homepage"
          className="go-to-homepage"
        />
      </ErrorInformation>
      <ErrorImageWrapper>
        <Image
          src={
            statusCode === 404
              ? image404
              : statusCode === 500
              ? image500
              : imageUnexpected
          }
          alt="Error 404"
          priority
          layout="fill"
          quality={100}
        />
      </ErrorImageWrapper>
    </ErrorWrapper>
  );
};

export default Error;
