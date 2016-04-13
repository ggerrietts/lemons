module.exports = {
    entry: "./src/client.js",
    output: {
        filename: "./src/public/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader', 
                exclude: /node_modules/,
                query: {
                    presets: ['node5', 'es2015', 'stage-0', 'react']
                }
            }
        ]
    }
};
