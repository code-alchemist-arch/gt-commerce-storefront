import { ReactElement } from "react";

/**
 * Product Icon Props Interface
 */
export interface ProductIconProps {
  /**
   * Icon Width
   */
  width?: number;
  /**
   * Icon Height
   */
  height?: number;
  /**
   * Ionn Color
   */
  color?: string;
  /**
   * Icon Attribute
   */
  componentAttr?:
    | "none"
    | "region"
    | "subregion"
    | "product_size"
    | "product_brand"
    | "vintage"
    | "varietal"
    | "product_category"
    | "product_subcategory"
    | "product_subsubcategory"
    | "age";
}

export const ProductIcon = ({
  width = 22,
  height = 22,
  color = "#2A2D34",
  componentAttr = "vintage",
}: ProductIconProps): ReactElement => {
  switch (componentAttr) {
    case "vintage":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.3 29.28h-4.84v-7.29a9.77 9.77 0 004.33-1.8 8.28 8.28 0 003.4-6.94c0-4.92-1.52-9.35-2.17-11.02A1.87 1.87 0 0020.27 1h-9.5c-.79 0-1.5.5-1.77 1.26-.6 1.68-2 6.1-2 11 0 3.65 1.85 5.8 3.4 6.94a9.84 9.84 0 004.4 1.8v7.28H9.97a.85.85 0 00-.84.86c0 .47.38.86.84.86H21.3c.46 0 .83-.39.83-.86a.85.85 0 00-.83-.86zM10.56 2.86a.22.22 0 01.2-.14h9.51c.1 0 .17.05.2.14a32.1 32.1 0 011.62 5.77H9.07a33.8 33.8 0 011.5-5.77zm4.91 17.47c-.7 0-2.47-.32-4.1-1.52a6.54 6.54 0 01-2.7-5.56c0-.99.06-1.96.16-2.9h13.51c.1.93.18 1.9.18 2.9 0 2.36-.91 4.23-2.7 5.56a7.67 7.67 0 01-4.1 1.52h-.25zM24.04 31c.53 0 .96-.44.96-.99a.97.97 0 00-.96-.98.97.97 0 00-.96.98c0 .55.43.99.96.99z"
            fill={color}
          ></path>
        </svg>
      );
    case "region":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 60.62 62.66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Layer_2" data-name="Layer 2">
            <g
              id="shopping_and_e-commerceicons"
              data-name="shopping and e-commerceicons"
            >
              <polygon
                points="59.59 61.63 1.03 61.63 10.99 41.54 49.63 41.54 59.59 61.63"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.06"
              ></polygon>
              <path
                d="M46.93,19.72A16.7,16.7,0,0,0,24.06,4.24a15.56,15.56,0,0,0-9,8.7A16.9,16.9,0,0,0,15.92,28h0L28.16,49.24a2.48,2.48,0,0,0,4.3,0L44.7,28h0A16.44,16.44,0,0,0,46.93,19.72Z"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.06"
              ></path>
              <path
                d="M46.93,19.72A16.7,16.7,0,0,0,24.06,4.24a15.56,15.56,0,0,0-9,8.7A16.9,16.9,0,0,0,15.92,28h0L28.16,49.24a2.48,2.48,0,0,0,4.3,0L44.7,28h0A16.44,16.44,0,0,0,46.93,19.72Z"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.06"
              ></path>
              <path
                d="M38.42,19.72a8.11,8.11,0,1,1-8.11-8.11A8.11,8.11,0,0,1,38.42,19.72Z"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.06"
              ></path>
            </g>
          </g>
        </svg>
      );
    default:
      return null;
  }
};
