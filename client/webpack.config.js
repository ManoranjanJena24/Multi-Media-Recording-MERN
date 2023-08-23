const path = require('path');

module.exports = {
  // ... other configuration options ...

  

  resolve: {
    fallback: {
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
    },
  },

  plugins: [
    // ...
    new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
  ],
};
