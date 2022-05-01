const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const { EnvironmentPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
  mode: 'production',
  entry: ['./src/Frontend/EntryPoints/index.tsx'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle-[contenthash].min.js',
    publicPath: '/',
    clean: true,
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',
  devServer: {
    port: 8081,
    historyApiFallback: true,
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '...'],
    // Used to reference packages in the monorepo by their package name
    symlinks: false,
  },

  module: {
    rules: [
      // Still depends on raw-loader here, with the javascript/auto content type,
      // because otherwise the module can't be imported in PluginManager
      {
        test: /\.[jt]sx?$/,
        include: /embedded_plugins/,
        type: 'javascript/auto',
        use: ['raw-loader', 'ts-loader'],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /(node_modules|embedded_plugins|plugins)/,
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [styledComponentsTransformer],
          }),
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      // Any non-JS files from other packages in the monorepo should be loaded
      // as a plain file so we `include` only the `@darkforest_eth` namespace here
      {
        test: /\.(wasm|zkey|json)$/,
        type: 'asset/resource',
        include: /@darkforest_eth/,
      },
      // All output '.js' files will have any sourcemaps
      // re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        options: {
          filterSourceMappingUrl(url, resourcePath) {
            // The sourcemaps in react-sortable are screwed up
            if (resourcePath.includes('react-sortablejs')) {
              return false;
            }

            return true;
          },
        },
      },
    ],
  },
  plugins: [
    // The string values are fallbacks if the env variable is not set
    new EnvironmentPlugin({
      NODE_ENV: 'development',
      DEFAULT_RPC: 'https://rpc-df.xdaichain.com/',
      // This must be null to indicate to webpack that this environment variable is optional
      DF_WEBSERVER_URL: null,
      DF_TWITTER_URL: null
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'public', to: 'public' }],
    }),
  ],
};
