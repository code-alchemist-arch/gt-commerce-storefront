import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import Link from "next/link";
import ArrowRightIcon from "../../assets/icons/ArrowRightIcon";

const GoToWrapper = styled.a`
  background: ${themeGet("primary.color")};
  border: none;
  padding: 15px 25px;
  color: #fff;
  border-radius: 250px;
  font-weight: 500;
  font-size: 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.25);
  }

  @media screen and (max-width: 464px) {
    font-size: 15px;
    padding: 10px 20px;
  }
`;

const GoToButton = ({ href, textLink, className }) => {
  return (
    <Link href={href} passHref>
      <GoToWrapper className={className}>
        {textLink}
        <ArrowRightIcon color={"#FFF"} />
      </GoToWrapper>
    </Link>
  );
};

export default GoToButton;
