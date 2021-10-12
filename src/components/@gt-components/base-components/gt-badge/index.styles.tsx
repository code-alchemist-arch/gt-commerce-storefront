import styled from "styled-components";

export const GTBadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 5px;
`;

export const BadgeContainer = styled.div<{
  bgColor?: string;
}>`
  background: ${({ bgColor }) => (bgColor ? bgColor : "rgb(143, 41, 40)")};
  padding: 8px;
  border-radius: 50px;
  z-index: 1;
  width: 65px;
  height: 65px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  flex-direction: column;

  overflow: hidden;
`;

export const BadgeTextOnly = styled.div`
  color: rgb(255, 255, 255);
  font-size: 15px;
  line-height: 15px;
  font-weight: 400;
  margin-bottom: 0px;

  text-transform: uppercase;
`;

export const BagdeAmount = styled.div`
  color: rgb(255, 255, 255);
  font-size: 18px;
  line-height: 24px;
  font-weight: 300;
  margin-bottom: 0px;
  border-bottom: 2px solid rgb(255, 255, 255);

  text-transform: uppercase;
`;

export const BadgeText = styled.div`
  color: rgb(255, 255, 255);
  font-size: 12px;
  font-weight: 300;
  margin-bottom: 0px;
  text-align: center;

  text-transform: uppercase;
`;
