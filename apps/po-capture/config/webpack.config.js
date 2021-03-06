const { ModuleFederationPlugin } = require('webpack').container;
const { dependencies } = require('../../../package.json');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { isWebpack5 } = require('@nrwl/web/src/webpack/entry');
const deps = require('../../../package.json').dependencies;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Add React-specific configuration
function getWebpackConfig(config) {
    var _a;

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
        config.plugins.push(new ReactRefreshPlugin());

        console.log(dependencies);

        config.plugins.push(
          new ModuleFederationPlugin({
            name: "Calendar",
            library: { type: "var", name: "Calendar" },
            filename: "remoteEntry.js",
            exposes: {
              './Calendar': './app/calendar/calendar.tsx',
            // './MailboxModule': './apps/mailbox/src/app/mailbox/mailbox.module.ts',
            },
            
            shared: {
              ...deps,
            },
          })
        );
        config.output.publicPath = 'http://localhost:5400/';
        config.output.uniqueName = 'Calendar';
      
    }
    return config;
}
module.exports = getWebpackConfig;
//# sourceMappingURL=webpack.js.map


