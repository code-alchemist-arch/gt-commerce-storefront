import React from "react";

import { render } from "../test-utils";
import { ProductCard } from "components/product-card/product-card-four";

describe("ProductCardFour", () => {
  let expectedProps;

  beforeEach(() => {
    expectedProps = {
      name: "Test product",
      variants: [],
      slug: "test-product",
      discountInPercent: 0,
      isAvailable: true,
      metadata: [],
    };
  });

  test("should render product card with all the data", () => {
    const { getByText } = render(<ProductCard data={expectedProps} />);
    const name = getByText(expectedProps.name);

    expect(name).toBeVisible();
  });
});
