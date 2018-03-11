const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../'),
      },
      {
        loader: 'url-loader?limit=10000',
        test: /\.(gif|jpg|png|svg)$/,
        include: path.resolve(__dirname, '../'),
      },
      {
        test: /\.ttf$|\.woff$|\.woff2$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },
};
