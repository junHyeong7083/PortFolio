const path = require("path");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  basePath: isProd ? "/PortFolio" : "",
  assetPrefix: isProd ? "/PortFolio/" : "",
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};
