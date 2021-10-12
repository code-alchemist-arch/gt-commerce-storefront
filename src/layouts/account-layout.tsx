import React from "react";
import {
  MainContainer,
  BrandSide,
  ActionContent,
  CloseAction,
} from "./layout.style";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import CloseIcon from "../assets/icons/CloseIcon";

type AccountProps = {
  children: React.ReactElement;
  deviceType: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };
};

const AccountLayout: React.FC<AccountProps> = ({
  children,
  deviceType,
}: AccountProps) => {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/images/grapes.png"></link>
      </Head>
      <MainContainer deviceType={deviceType}>
        <BrandSide style={{ backgroundImage: `url(/images/grapes.png)` }}>
          <Link href="/" passHref>
            <a>
              <Image
                src="/images/logo-white.svg"
                alt="SiteName"
                width={
                  deviceType?.desktop ? 175 : deviceType?.tablet ? 191 : 117
                }
                height={deviceType?.desktop ? 44 : deviceType?.tablet ? 48 : 29}
                priority
              />
            </a>
          </Link>
        </BrandSide>
        <Link href="/" passHref>
          <CloseAction>
            <CloseIcon />
          </CloseAction>
        </Link>
        <ActionContent>{children}</ActionContent>
      </MainContainer>
    </>
  );
};

export default AccountLayout;
