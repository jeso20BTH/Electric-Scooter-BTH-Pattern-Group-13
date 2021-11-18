const path = require('path');

module.exports = {
    mode: 'production',
    entry: './www/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'www/dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        },
                    },
                ]
            }
        ]
    }
};
