import { ProductStyleDisplayInterface } from "./interface";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import styled from "styled-components";

export const ProductStyleWrapper = styled.div`
  width: 40rem;
  height: 7.5rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;
export const ProductStyleContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: space-around;
  text-align: center;
  line-height: normal;
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export const ProductStyleItem = styled.div`
  margin: 10px 20px;
  flex: 0 1 auto;
  line-height: normal;

  @media screen and (max-width: 767px) {
    margin: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 25%;
    flex-basis: 25%;
    max-width: 25%;
  }
`;

export const ProductStyleInnerCircle = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  color: #fff;
  margin-top: -15%;
  background-color: ${(props: { innerCircleColor: string }) =>
    props.innerCircleColor};
  span {
    margin-top: -1px;
  }
`;

export const ProductStyleName = styled.p`
  color: #808080;
  font-size: 12px;
  padding-top: 5px;
  text-transform: uppercase;
  font-weight: 700;
  line-height: normal;
  font-family: Lato, sans-serif;
  width: 100%;
`;

export const ProductStyle = ({
  styleName,
  outerCircleFillColor,
  outerCircleBackgroundColor,
  innerCircleColor,
  dataFillQuantity,
  dataTotalQuantity,
}: ProductStyleDisplayInterface): JSX.Element => {
  if (isNaN(dataFillQuantity) || dataFillQuantity === undefined) {
    return null;
  }
  return (
    <ProductStyleItem>
      <div style={{ width: 60, height: 60 }}>
        {/*<div>*/}
        <CircularProgressbarWithChildren
          value={dataFillQuantity}
          maxValue={dataTotalQuantity}
          className="circular-progress-bar"
          styles={buildStyles({
            rotation: 1,
            strokeLinecap: "butt",
            textSize: "25px",
            pathTransitionDuration: 0.5,
            pathColor: `${outerCircleFillColor}`,
            textColor: `${outerCircleBackgroundColor}`,
            trailColor: `${outerCircleBackgroundColor}`,
            backgroundColor: `${innerCircleColor}`,
          })}
        >
          <ProductStyleInnerCircle innerCircleColor={innerCircleColor}>
            <span style={{ fontSize: `16px` }}>{dataFillQuantity}</span>
          </ProductStyleInnerCircle>
        </CircularProgressbarWithChildren>
      </div>
      <ProductStyleName>{styleName}</ProductStyleName>
    </ProductStyleItem>
  );
};

export default ProductStyle;
