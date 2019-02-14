const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

const commonsChunkConfig = (config, test = /\.css$/) => {
    config.plugins = config.plugins.map(plugin => {
        if (
            plugin.constructor.name === 'CommonsChunkPlugin' &&
            // disable filenameTemplate checks here because they never match
            // (plugin.filenameTemplate === 'commons.js' ||
            //     plugin.filenameTemplate === 'main.js')
            // do check for minChunks though, because this has to (should?) exist
            plugin.minChunks != null
        ) {
            const defaultMinChunks = plugin.minChunks;
            plugin.minChunks = (module, count) => {
                if (module.resource && module.resource.match(test)) {
                    return true;
                }
                return defaultMinChunks(module, count);
            };
        }
        return plugin;
    });
    return config;
};

module.exports = withSass(withCSS({
  target: "serverless",
  // cssModules: true,
  webpack: function (config) {
    // config = commonsChunkConfig(config, /\.(sass|scss|css)$/);

    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    });
    return config
  }
}));
