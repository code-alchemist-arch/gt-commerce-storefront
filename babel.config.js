module.exports = function (api) {
  api.cache(true);

  const presets = ["next/babel"];
  const plugins = [
    [
      "styled-components",
      {
        ssr: true,
        displayName: true,
        minify: false,
        transpileTemplateLiterals: false,
        pure: true,
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
