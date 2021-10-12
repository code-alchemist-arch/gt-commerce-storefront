import React from "react";
import { HomeSubtitle, HomeTitle as HomeTitleDiv } from "./home-title.style";

interface HomeTitleProps {
  title: string;
  subtitle?: string;
}

export const HomeTitle: React.FC<HomeTitleProps> = ({ title, subtitle }) => {
  return (
    <>
      <HomeTitleDiv>
        <div className="line"></div>
        <span>{title}</span>
        <div className="line"></div>
      </HomeTitleDiv>
      {subtitle && <HomeSubtitle>{subtitle}</HomeSubtitle>}
    </>
  );
};
