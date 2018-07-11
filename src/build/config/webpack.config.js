const path   = require( 'path' );
const config = require( '../config.json' );

module.exports = {
  context: path.resolve( 'src/js/' ),
  entry: {
    main: './main.js'
  },
  output: {
    path      : path.resolve( 'dist' ),
    filename  : '[name].bundle.js',
    publicPath: config.publicPath
  },
}
