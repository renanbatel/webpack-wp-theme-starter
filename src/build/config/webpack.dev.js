const webpack           = require( 'webpack' );
const path              = require( 'path' );
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' );
const merge             = require( 'webpack-merge' );
const webpackConfig     = require( './webpack.config' );
const config            = require( '../config.json' );

module.exports = merge( webpackConfig, {
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: path.resolve( 'node_modules' )
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    hot: true,
    proxy: {
      '/': {
        target: config.devUrl,
        changeOrigin: true,
        autoRewrite: true,
        secure: false,
      }
    }
  },
  module: {
    rules: [ {
      test: /\.scss$/,
      use: [ 'style-loader', 'css-loader', 'sass-loader' ]
    } ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin( {
      host: 'localhost',
      port: '4200',
      proxy: {
        target: 'http://localhost:8080'
      },
      files: [ {
        match: '**/*.php',
        fn: ( event, file ) => {
          if( event === 'change' ) {
            const browserSync = require( 'browser-sync' ).get( 'bs-webpack-plugin' );
            browserSync.reload();
          }
        }
      } ],
      watchOptions: {
        ignored: 'vendor/*'
      }
    }, { reload: false } )
  ]
} );
