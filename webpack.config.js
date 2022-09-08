const path = require('path');
const dotenvWebpack = require('dotenv-webpack');

const resolvePackage = require('resolve-package-path');
const { EnvironmentPlugin, ProvidePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// This code is used to lookup where the `@darkforest_eth` packages exist in the tree
// whether they are in a monorepo or installed as packages
function findScopeDirectory() {
  // Just chose the most likely package to be here, it could really be anything
  const pkg = '@darkforest_eth/contracts';
  const contractsPackageJson = resolvePackage(pkg, __dirname);
  if (!contractsPackageJson) {
    throw new Error(`Unable to find the @darkforest_eth scope. Exiting...`);
  }
  const contractsDirectory = path.dirname(contractsPackageJson);
  const scopeDirectory = path.dirname(contractsDirectory);

  return scopeDirectory;
}

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
    // Adding an alias for the `@darkforest_eth` packages, whether in a monorepo or packages
    alias: {
      '@darkforest_eth': findScopeDirectory(),
    },
  },

  module: {
    rules: [
      // Still depends on raw-loader here, with the javascript/auto content type,
      // because otherwise the module can't be imported in PluginManager
      {
        test: /\.[jt]sx?$/,
        include: [path.join(__dirname, './embedded_plugins/')],
        type: 'javascript/auto',
        use: ['raw-loader', 'babel-loader'],
      },
      {
        test: /\.ts(x?)$/,
        include: [path.join(__dirname, './src/')],
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        include: [path.join(__dirname, './src/')],
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      // Any wasm, zkye, or json files from other packages should be loaded as a plain file
      {
        test: /\.(wasm|zkey|json)$/,
        type: 'asset/resource',
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'
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
    // We use ForkTsChecker plugin to run typechecking on `src/`
    // in the background and report errors into the frontent UI
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'readonly',
      },
    }),
    new dotenvWebpack(),
    // The string values are fallbacks if the env variable is not set
    // note: Using dotenv-webpack instead of environment plugin here
    // new EnvironmentPlugin({
    //   NODE_ENV: 'development',
    //   DEFAULT_RPC: 'https://rpc-df.xdaichain.com/',
    //   // This must be null to indicate to webpack that this environment variable is optional
    //   DF_WEBSERVER_URL: null,
    // }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'public', to: 'public' }],
    }),
  ],
};
