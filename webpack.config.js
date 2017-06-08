const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const path = require('path');
const NODE_DIR = path.resolve(__dirname, 'node_modules');
const config = {
  context: path.resolve(__dirname, "app"),
  entry: path.resolve(__dirname, './src/modules/codeCloud/app.js'),
  output: {
  	path: path.resolve(__dirname, "dist"),
  	filename: "js/[name].js",
  	// publicPath: "/assets/",
    // library: "MyLibrary",
  	// libraryTarget: "jsonp",
  },
  module: {
    noParse: /react-dom|react|react-router-dom|superagent/,
	  loaders: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel-loader',
	      query: {
	        presets: ["es2015", "react"]
	      }
	    }, {
	    	test: /\.css/,
	    	use: ExtractTextPlugin.extract({
	    		use: [{
            loader: "css-loader", // translates CSS into CommonJS
            options: {
            	importLoaders: 1,
            }
          }, {
            loader: "sass-loader?outputStyle=expanded" // compiles Sass to CSS
          }, {
          	loader: 'postcss-loader'
          }]
	    	})
	    }, {
         // 小于2KB的图片使用base64内联
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'images/[name][hash].[ext]',
        },
      }
	  ]
	},
  resolve: {
    // 优先从 node_modules 搜索模块
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    alias: {
      'react': path.join(NODE_DIR, 'react/dist/react.min.js'),
      'react-dom': path.join(NODE_DIR, 'react-dom/dist/react-dom.min.js'),
      'react-router-dom': path.join(NODE_DIR, 'react-router-dom/umd/react-router-dom.min.js'),
    },
    extensions: [".js", ".json"]
  },
	externals: [{
    react: 'React',
	}, {
		'react-dom': 'ReactDOM',
	}, {
		'react-router-dom': 'ReactRouterDOM',
	}, {
    'react-codemirror': 'CodeMirror',
  }],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 5000,
  },
  plugins: [
	  new HtmlWebpackPlugin({
	  	title: '胡明飞',
	  	template: path.resolve(__dirname, './src/modules/codeCloud/index.html'),
	  }),
	  new ExtractTextPlugin("css/styles.css"),
		new OpenBrowserPlugin({ url: 'http://localhost:5000' }),
    // new webpack.optimize.UglifyJsPlugin(),
	]
}

module.exports = config;
