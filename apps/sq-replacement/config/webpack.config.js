const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const { isWebpack5 } = require('@nrwl/web/src/webpack/entry');
const { dependencies } = require('../../../package.json');
const deps = require('../../../package.json').dependencies;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Add React-specific configuration
function getWebpackConfig(config) {
    var _a;
    // TODO(jack): Remove in Nx 13
    config.module.rules.push({
        test: /\.(png|jpe?g|gif|webp)$/,
        loader: require.resolve('url-loader'),
        options: {
            limit: 10000,
            name: '[name].[hash:7].[ext]',
        },
    }, {
        test: /\.svg$/,
        oneOf: [
            // If coming from JS/TS file, then transform into React component using SVGR.
            {
                issuer: isWebpack5 ? /\.[jt]sx?$/ : { test: /\.[jt]sx?$/ },
                use: [
                    {
                        loader: require.resolve('@svgr/webpack'),
                        options: {
                            svgo: false,
                            titleProp: true,
                            ref: true,
                        },
                    },
                    {
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: '[name].[hash:7].[ext]',
                            esModule: false,
                        },
                    },
                ],
            },
            // Fallback to plain URL loader.
            {
                use: [
                    {
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: '[name].[hash:7].[ext]',
                        },
                    },
                ],
            },
        ],
    });
    if (config.mode === 'development' && ((_a = config['devServer']) === null || _a === void 0 ? void 0 : _a.hot)) {
        // add `react-refresh/babel` to babel loader plugin
        const babelLoader = config.module.rules.find((rule) => rule.loader.toString().includes('babel-loader'));
        if (babelLoader) {
            babelLoader.options['plugins'] = [
                ...(babelLoader.options['plugins'] || []),
                [
                    require.resolve('react-refresh/babel'),
                    {
                        skipEnvCheck: true,
                    },
                ],
            ];
        }
        // add https://github.com/pmmmwh/react-refresh-webpack-plugin to webpack plugin
       // config.plugins.push(new ReactRefreshPlugin());

        config.plugins.push(
            new ReactRefreshPlugin(),
            new ModuleFederationPlugin({
              name: "sq-replacement",
              library: { type: "var", name: "sq_replacement" },
              filename: "remoteEntry.js",
              exposes: {
                './pokemonList': './app/pokemon/pokemonList.ts',
                './PokemonListView': './app/pokemon/PokemonListView.tsx',
              },
            })
          );
          config.output.publicPath = 'http://localhost:5300/';
          config.output.uniqueName = 'sq-replacement';
    }
    return config;
}
module.exports = getWebpackConfig;
//# sourceMappingURL=webpack.js.map