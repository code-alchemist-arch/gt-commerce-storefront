const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");

const nextConfig = {
  env: {
    API_URL: "https://craft.myglobaltill.com/graphql/",
    API_CHANNEL: "craft-cellars",
    API_CMS_URL: "https://craft-strapi.herokuapp.com",
    STOREFRONT_URL: "https://craftdemo.myglobaltill.com",
    STRIPE_API_KEY: "pk_test_m4CY11V84r58jp5ftfIC24A6",
    TYPESENSE_HOSTS:
      "pmj37rh06u1g4xqbp-1.a1.typesense.net,pmj37rh06u1g4xqbp-2.a1.typesense.net,pmj37rh06u1g4xqbp-3.a1.typesense.net",
    TYPESENSE_API_KEY:
      "OXNJdGpHMmxJcW1VQVFLYmxMMHJta0tiY3hXSnZVNGRDSmRCZVd4VkM1ND1DSEljeyJmaWx0ZXJfYnkiOiAic3RvcmVfaWQ6MTcwIn0=",
    SENTRY_URL:
      "https://3edef813fb534460b7a8bc62db1e03f4@o15213.ingest.sentry.io/5711988",
    SQUARE_APPLICATION_ID: "sq0idp-X4uW1O_kClLSKINmuazQ8w",
    SQUARE_LOCATION_ID: "L590DYXCYJWC1",
    GT_URL: "https://office.globaltill.com/v5/",
    GT_TOKEN: "Token 8468cbf4371c44aaf11e4268e70d36c1ded40287",
    COUNTRY_CODE: "CA",
    CURRENCY_CODE: "CAD",
    SHOW_FACET_ICONS: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    deviceSizes: [320, 375, 420, 768, 1024, 1200, 1600],
    domains: [
      "www.thewhiskyexchange.com",
      "gte-media.s3.amazonaws.com",
      "craft-strapi.herokuapp.com",
      "gtc-strapi.s3.ca-central-1.amazonaws.com",
      "gtc-images.imgix.net",
      "via.placeholder.com",
      "globaltill-public-resources.s3-ca-central-1.amazonaws.com",
    ],
  },
  crossOrigin: "anonymous",
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  presets: ["next/babel"],
  plugins: [["styled-components", { ssr: true }]],
};

module.exports = withPlugins([withOptimizedImages], nextConfig);
