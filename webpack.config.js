const path = require('path');

const { EnvironmentPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'production',
  entry: ['react-hot-loader/patch', './src/Frontend/EntryPoints/index.tsx'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle-[hash:6].min.js',
    publicPath: '/',
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',
  devServer: {
    port: 8081,
    historyApiFallback: true,
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    // we need this to reference files in the symlinked src/circuits directory
    symlinks: false,
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: /embedded_plugins/,
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
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      // Any non-JS files from other packages in the monorepo should be loaded as a plain file
      // so we `include` only the `@darkforest_eth` namespace here.
      {
        test: /\.(zkey|wasm|json)$/i,
        type: 'javascript/auto',
        include: /@darkforest_eth/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: [
    // The string values are fallbacks if the env variable is not set
    new EnvironmentPlugin({
      NODE_ENV: 'development',
      DEFAULT_RPC: 'https://rpc-df.xdaichain.com/',
      CONVERSATION_API_HOST: isProd ? 'https://api.dark-forest.online' : 'http://localhost:3000',
      LEADERBOARD_API: isProd ? 'https://api.dark-forest.online' : 'http://localhost:3000',
      WEBSERVER_URL: isProd ? 'https://api.dark-forest.online' : 'http://localhost:3000',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyPlugin([{ from: 'public', to: 'public' }]),
  ],

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {},
};
