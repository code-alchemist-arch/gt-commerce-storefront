import { GTInspirationForm } from "components/@gt-components/inspiration-form-typesense";
import React from "react";
import { ExploreLink as ExploreLinkInterface } from "../../interfaces";
import { HomeTitle } from "../home-title/home-title";
import {
  InstantSearch as TypesenseInstantSearch,
  Configure,
  connectInfiniteHits,
} from "react-instantsearch-dom";
import NavLink from "../nav-link/nav-link";
import { LinksContainer, LinksGrid, ResultsSection } from "./links.style";
import { useContext } from "react";
import { TypesenseContext } from "contexts/typesense/typesense.context";
import { useState } from "react";
import { GTProductCarousel } from "components/@gt-components/gt-carousel";
import { ProductCard as GTProductCard } from "components/@gt-components/product-card";
import { useRef } from "react";
import { useCart } from "contexts/cart/use-cart";

interface Props {
  title: string;
  links: ExploreLinkInterface[];
  columns: number;
  linkLayout: "horizontal" | "vertical";
  showSearch?: boolean;
}

export const Links: React.FC<Props> = ({
  title,
  links,
  columns,
  linkLayout,
  showSearch,
}) => {
  const {
    state: { client, defaultIndexName },
  } = useContext(TypesenseContext);

  const resultsRef = useRef<HTMLDivElement>();

  const [facetFilters, setFacetFilters] = useState<string[]>([]);
  const [dataSelected, setDataSelected] = useState<boolean>();
  const onFindHandler = (formData) => {
    const filters = [];
    Object.keys(formData).map((key) => {
      filters.push(`${key}:-${!formData[key] ? "" : formData[key]}`);
    });

    setFacetFilters(filters);
    setDataSelected(true);

    window.scrollTo({
      top: resultsRef.current.offsetTop - 60,
      behavior: "smooth",
    });
  };
  return (
    <LinksContainer>
      <TypesenseInstantSearch
        searchClient={client}
        indexName={defaultIndexName}
      >
        <Configure
          facetFilters={facetFilters}
          hitsPerPage={20}
          analytics={false}
          enablePersonalization={true}
          distinct
        />

        {title && <HomeTitle title={title} />}
        {showSearch && (
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
              {
                name: "price_range_bucket",
                label: "Price Range",
                isMain: false,
              },
            ]}
            onFind={onFindHandler}
          />
        )}
        <div
          style={{
            padding: "20px 0",
          }}
          ref={resultsRef}
        >
          {dataSelected && <ConnectedHits />}
        </div>
        <LinksGrid columns={columns}>
          {links.map((item, i) => {
            return (
              <NavLink
                href={item.url || "/"}
                label={item.label}
                iconPosition={linkLayout}
                iconName={item.icon_slug}
                iconClass="icon"
                iconSpacing="15px"
                key={i}
              />
            );
          })}
        </LinksGrid>
      </TypesenseInstantSearch>
    </LinksContainer>
  );
};

const InfiniteHits = ({ hits }) => {
  const { add } = useCart();

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

  /**
   * Product Card Add Cart Handler
   *
   * @param {Any} product Product to add to cart
   */
  const onClickCartHandler = (product: any) => {
    // Cart Product Type is Product Type
    const productItem = {
      ...product,
      metadata: [
        {
          __typeName: "MetadataItem",
          key: "image_srcset_primary",
          value: product?.image_srcset,
        },
      ],
      variants: [
        {
          pricing: {
            priceUndiscounted: {
              gross: {
                amount: product.retail_price,
              },
            },
            price: {
              gross: {
                amount: product.retail_price,
              },
            },
          },
        },
        {
          __typeName: "ProductVariants",
          id: product.id,
          metadata: [
            {
              __typeName: "MetadataItem",
              key: "deposit",
              value: "0.1",
            },
          ],
        },
      ],
    };

    add(productItem, 1);
  };

  return (
    <GTProductCarousel responsive={responsive}>
      {hits.map((hit) => (
        <GTProductCard
          key={hit.id}
          link={`/products/${hit.slug}`}
          data={hit}
          status={
            !hit.in_stock
              ? {
                  name: "sold_out",
                  text: "Sold Out",
                }
              : undefined
          }
          attribute={{
            name: "points",
            text: "points",
            amount: hit?.rating.replace(/[^\d.]/g, ""),
          }}
          variant="grid"
          subComponentAttrIcon={false}
          subComponentAttribute="region"
          subComponentHoverAttribute="vintage"
          onClickCartButton={() => onClickCartHandler(hit)}
        />
      ))}
    </GTProductCarousel>
  );
};

const ConnectedHits = connectInfiniteHits(InfiniteHits);
