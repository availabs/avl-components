const path = require("path");

module.exports = {
	entry: path.resolve("index.js"),

	output: {
		filename: 'index.js',
		path: path.resolve("dist")
	},

	module: {
  	rules: [
    		{ loader: 'babel-loader',
	        test: /\.jsx?$/,
	        exclude: /node_modules/,
  				options: {
  					presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
  				}
    		},
    		{ use: ['style-loader', 'css-loader'],
      		test: /\.css$/
    		}
  	]
	}
}
