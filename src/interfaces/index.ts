export interface Product {
  attributes: any[];
  collections: any[];
  description: string;
  descriptionJson: string;
  id: string;
  images: {
    alt: string;
    url: string;
  }[];
  isAvailable: boolean;
  isAvailableForPurchase: boolean;
  metadata: {
    key: string;
    value: string;
  }[];
  name: string;
  pricing: {
    discount: any;
    onSale: boolean;
    priceRange: any;
    priceRamgeUndiscounted: any;
  };
  seoDescription: any;
  seoTitle: any;
  slug: string;
  thumbnail: {
    alt: string;
    url: string;
  };
  variants: {
    sku: string;
    id: string;
    pricing: any;
    quantityAvailable: number;
    priceUndiscounted: any;
    totalDeposits: string;
    totalGrams: string;
    metadata: {
      key: string;
      value: string;
    }[];
  }[];
  quantity?: number;
}

export interface CartProduct extends Product {
  quantity: number;
}

export interface Products {
  products: {
    edges: {
      cursor: string;
      node: Product;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export interface ExploreLink {
  label: string;
  icon_slug: string;
  url: string;
}

export interface CollectionHomeBanner {
  id: number;
  title: string;
  subtitle: string;
  imgSrc: any;
  iconName?: string;
  color?: "orange" | "yellow" | "gray";
  labelPosition?: "top" | "bottom";
  link: string;
}

export interface TaxedMoney {
  currency: string;
  gross: {
    amount: string;
  };
  net: {
    amount: string;
  };
  tax: {
    amount: string;
  };
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  streetAddress1: string;
  streetAddress2?: string;
  city: string;
  country: {
    code: string;
    country: string;
  };
  countryArea: string;
  postalCode: string;
  phone: string;
  isDefaultShippingAddress?: boolean;
  isDefaultBillingAddress?: boolean;
}

export interface Order {
  id: string;
  token: string;
  number: string;
  created: string;
  shippingAddress: Address;
  billingAddress: Address;
  lines: any[];
  subtotal: TaxedMoney;
  shippingPrice: TaxedMoney;
  discount?: {
    amount: number;
  };
  total: TaxedMoney;
  statusDisplay: string;
}

export interface DeviceType {
  desktop: boolean;
  tablet: boolean;
  mobile: boolean;
}

export interface Coupon {
  id?: number;
  code?: string;
  discountInPercent?: number;
}

export interface ProductTypesense {
  body_html: string;
  country: string;
  default_units_per_case: number;
  gtc_product: string;
  gtc_variant: string;
  id: string;
  image_srcset: string;
  image_thumbnail_100: string;
  image_thumbnail_250: string;
  image_thumbnail_500: string;
  in_stock: boolean;
  inventoried: boolean;
  on_sale_flag: boolean;
  on_sale_price: number;
  product_brand: string;
  product_category: string;
  product_id: number;
  product_name: string;
  product_size: string;
  product_sku: string;
  product_subcategory: string;
  product_subsubcategory: string;
  qty_available: number;
  region: string;
  retail_price: number;
  slug: string;
  store_id: number;
  subregion: string;
  taxable: true;
  varietal: string;
  vintage: string;
}
