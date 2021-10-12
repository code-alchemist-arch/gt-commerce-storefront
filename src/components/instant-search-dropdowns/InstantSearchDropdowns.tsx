import React, { useContext, useState } from "react";

import {
  InstantSearch as TypesenseInstantSearch,
  Configure,
  connectInfiniteHits,
} from "react-instantsearch-dom";

import { TouchScrollable } from "react-scrolllock";
import { TypesenseContext } from "contexts/typesense/typesense.context";

import { GTProductCarousel } from "components/@gt-components/gt-carousel";
import { ProductCard as GTProductCard } from "components/@gt-components/product-card";
import { GTInspirationForm } from "components/@gt-components/inspiration-form-typesense";

const InstantSearchDropdowns = () => {
  const {
    state: { client, defaultIndexName },
  } = useContext(TypesenseContext);

  const [facetFilters, setFacetFilters] = useState<string[]>([]);
  const [dataSelected, setDataSelected] = useState<boolean>(false);
  const onFindHandler = (formData) => {
    const filters = [];
    Object.keys(formData).map((key) => {
      filters.push(`${key}:-${!formData[key] ? "" : formData[key]}`);
    });

    setFacetFilters(filters);
  };
  return (
    <TouchScrollable>
      <div>
        <TypesenseInstantSearch
          searchClient={client}
          indexName={defaultIndexName}
        >
          <div
            style={{
              display: dataSelected ? "block" : "none",
            }}
          >
            <ConnectedHits />
          </div>
          <Configure
            facetFilters={facetFilters}
            hitsPerPage={6}
            analytics={false}
            enablePersonalization={true}
            distinct
          />

          <GTInspirationForm
            attributes={[
              {
                name: "product_category",
                label: "Product Category",
                isMain: true,
              },
              {
                name: "product_subcategory",
                label: "Product Subcategory",
                isMain: false,
              },
            ]}
            onFind={onFindHandler}
          />
        </TypesenseInstantSearch>
      </div>
    </TouchScrollable>
  );
};

const InfiniteHits = ({ hits }) => {
  if (!hits) return <></>;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 10,
    },
    desktop: {
      breakpoint: { max: 2999, min: 1440 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1439, min: 1120 },
      items: 5,
    },
    medium: {
      breakpoint: { max: 1119, min: 768 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 767, min: 576 },
      items: 3,
    },
    smallmobile: {
      breakpoint: { max: 575, min: 425 },
      items: 2,
    },
    xsmallmobile: {
      breakpoint: { max: 424, min: 0 },
      items: 1,
    },
  };

  return (
    <GTProductCarousel responsive={responsive}>
      {hits.map((hit) => (
        <GTProductCard
          key={hit.id}
          link={`/products/${hit.slug}`}
          data={hit}
          variant="grid"
          onClickCartButton={() => console.log(hit)}
        />
      ))}
    </GTProductCarousel>
  );
};

const ConnectedHits = connectInfiniteHits(InfiniteHits);

export default React.memo(InstantSearchDropdowns);
