// #region Imports
const packageJson = require("./package.json");
const path = require("path");
const webpack = require("webpack");
const NodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const crypto = require("crypto");
const buildId = crypto.randomBytes(16).toString("hex");
// #endregion

/* brand */
const brandName =
  process.env.BRAND_NAME == undefined
    ? "gamechampions".toLowerCase()
    : process.env.BRAND_NAME.toLowerCase();

/* constants */
const isDev = process.env.NODE_ENV !== "production";
const outputFolder = "dist";

const aliases = {
  modernizr$: path.resolve(__dirname, "./.modernizrrc"),
  joi: "joi-browser",
  "~util": path.resolve(__dirname, "./src/js/util"),
  "~service": path.resolve(__dirname, "./service"),
  "~models": path.resolve(__dirname, "./src/js/models"),
  "~components": path.resolve(__dirname, "./src/js/components"),
  "~containers": path.resolve(__dirname, "./src/js/containers"),
  "~hocs": path.resolve(__dirname, "./src/js/hocs/index"),
  "~hooks": path.resolve(__dirname, "./src/js/hooks/index"),
  "~routes": path.resolve(__dirname, "./src/js/routes/index"),
  "~theme": path.resolve(__dirname, "./src/js/theme/index"),
  "~config": path.resolve(__dirname, "./configuration/index")
};

const ENVIRONMENT_VARIABLES = {
  OUTPUT_FOLDER: outputFolder,
  BUILD_ID: buildId,
  NODE_ENV: "development",
  NODE_TLS_REJECT_UNAUTHORIZED: 0,
  UNDER_MAINTENANCE: false,
  IS_DEV: isDev,
  IS_HTTPS: true,
  NAME: packageJson.name,
  DESCRIPTION: packageJson.description,
  AUTHOR_NAME: packageJson.author.name,
  AUTHOR_EMAIL: packageJson.author.email,
  AUTHOR_URL: packageJson.author.url,
  SYSPAY_RETURN_URL:
    "SYSPAY_RETURN_URL",
  SYSPAY_PUBLIC_URL: "SYSPAY_PUBLIC_URL",
  SYSPAY_PUBLIC_KEY: "SYSPAY_PUBLIC_KEY",
  PAYPAL_CLIENT_ID:
    "PAYPAL_CLIENT_ID",
  FACEBOOK_APP_ID: "FACEBOOK_APP_ID",
  API_TOKEN_DURATION: 20,
  TIME_TO_BEGIN_MATCH: 15,
  ALLOW_PUSH_NOTIFICATON: false,
  SHOW_HEADER_LOGO: true,
  SHOW_NAVIGATION_LOGO: true,
  RECAPTCHA_SITE_KEY: "RECAPTCHA_SITE_KEY",
  REDIS_CACHE_KEY: "REDIS_CACHE_KEY",
  REDIS_CACHE_HOSTNAME: "REDIS_CACHE_HOSTNAME",
  BRAND_NAME: "gamechampions"
};

// #region Node server
const node = {
  name: "node",
  devtool: isDev ? "eval-source-map" : "hidden-source-map",
  target: "node",
  node: {
    __dirname: true
  },
  externals: [NodeExternals()],
  entry: ["./app.babel.js"],
  output: {
    path: __dirname,
    filename: "app.js"
  },
  plugins: [
    new webpack.EnvironmentPlugin(ENVIRONMENT_VARIABLES),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            ["@babel/preset-env", { targets: { node: "current" } }],
            "@babel/preset-react"
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: aliases
  }
};
// #endregion

// #region Web Client
const web = {
  name: "web",
  devtool: isDev ? "cheap-source-map" : "hidden-source-map",
  context: path.join(__dirname, "src"),
  externals: [
    {
      xmlhttprequest: "{XMLHttpRequest:XMLHttpRequest}"
    }
  ],
  entry: {
    [`${buildId}-main`]: ["@babel/polyfill", "./js/index.jsx"],
    style: `./scss/brands/${brandName}/style.scss`,
    inline: `./scss/brands/${brandName}/inline.scss`,
    vendor: `./scss/brands/${brandName}/vendor.scss`
  },
  output: {
    path: path.join(__dirname, outputFolder),
    chunkFilename: "[hash].js"
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new webpack.EnvironmentPlugin(ENVIRONMENT_VARIABLES),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin(),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        path.resolve(__dirname, "src", "brands", brandName, "favicon.ico"),
        path.resolve(__dirname, "src", "brands", brandName, "manifest.json"),
        path.resolve(__dirname, "src", "OneSignalSDKUpdaterWorker.js"),
        path.resolve(__dirname, "src", "OneSignalSDKWorker.js"),
        {
          from: path.resolve(__dirname, "src", "img"),
          to: "img/"
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: { browsers: ["last 2 versions", "ie >= 11"] },
                useBuiltIns: "entry",
                corejs: "3.4"
              }
            ],
            "@babel/preset-react"
          ]
        }
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: { hash: "sha512", digest: "hex", name: "[hash].text" }
          },
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true,
              optimizationLevel: 7,
              interlaced: false
            }
          }
        ]
      },
      {
        test: /\.(mp3|wav|ogg)$/,
        include: path.resolve(__dirname, "src/audio"),
        use: [
          {
            loader: "file-loader",
            options: {
              name: "audio/[name].[ext]",
              outputPath: "audio"
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 65000,
              mimetype: "image/svg+xml",
              name: "fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.woff$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 65000,
              mimetype: "application/font-woff",
              name: "fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.woff2$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 65000,
              mimetype: "application/font-woff2",
              name: "fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.[ot]tf$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 65000,
              mimetype: "application/octet-stream",
              name: "fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.eot$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 65000,
              mimetype: "application/vnd.ms-fontobject",
              name: "fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.modernizrrc.js$/,
        loader: "modernizr-loader"
      },
      {
        test: /\.modernizrrc(\.json)?$/,
        loader: "modernizr-loader"
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      hidePathInfo: true,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          name: `/vendors~${buildId}-main`
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: aliases
  }
};
// #endregion

module.exports = [node, web];
