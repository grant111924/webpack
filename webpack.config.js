const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//將JS中引入的CSS打包到文件中，然後<link>添加到html文件中
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Webpack = require('webpack');
const chokidar = require('chokidar');//此為是封装 Node.js監控文件變化功能的package 因為html-loader沒有提供熱加載的功能

const DEV_MODE = process.env.NODE_ENV === 'development'; //獲package.json script的參數 以便於控制開發或正式版
console.log(`DEV_MODE:${DEV_MODE}`);

module.exports = {
    context: path.resolve('src'), //在entry的路徑由src為開始
    mode:process.env.NODE_ENV, // 可以藉由 package.json srcipt  的指令 選擇打包模式
    devtool:DEV_MODE?'inline-source-map':false, //調控打包後的code 
    //如果為 development 能看到比較整齊code方便debug
    //模式有很多種 可以上官網找
    entry:{ //進入 打包的項目
        index:['js/index.js']
    },
    output:{//輸出 加入hash 發行後修改讓瀏覽器reload
        filename:DEV_MODE?'[name].js':'[name]-[chunkhash].js', //只自己開發的js
        chunkFilename: DEV_MODE ? '[name]-chunk.js' : '[name]-chunk-[chunkhash].js', //專門打包第三方的js 
        path: path.resolve('dist'), //生成儲存的位置
    },
    resolve:{ //設定import 的路徑別名
        modules:[  //優先搜尋這些地方
            path.resolve('src'),
            path.resolve('node_modules'),
        ],
        alias: {
          '@': path.resolve('src'),
        },
        //在import時 可以直接由src或node_modules為根目錄 
            //   node_modules => import $ from 'jquery';
            //   src => import abc from 'css/abc.css;

    },
    module: { //loader處理區
        rules: [
          {
            test: /\.(js|jsx)$/,
            use: { loader: 'babel-loader' },
            exclude: /node_modules/, //node_modules 除外 因為不太可能會改變
          },
          {
            test: /\.scss$/,
            use: [//處理都是由最後一個往前處理  sass-loader ＝> css-loader =>  MiniCssExtractPlugin.loader
              {
                loader: MiniCssExtractPlugin.loader, 
                options: {
                  hmr: process.env.NODE_ENV === 'development', //熱加載 開啟
                },
              },
              {
                loader: 'css-loader',
                options: { sourceMap: true },
              },
              {
                loader: 'sass-loader',
                options: { sourceMap: true },
              },
            ],
            include: [
                path.resolve('node_modules/bootstrap/scss'),//處理的位置
                path.resolve('src/css'), 
            ],
          },
          {
            test: /\.pug$/,
            use: [
              { loader: 'html-loader' },
              {
                loader: 'pug-html-loader',
                options: {
                  pretty: DEV_MODE,
                  data: {
                    DEV_MODE,
                    MY_DATA: 'milkmidi',
                  },
                },
              },
            ],
            include: path.resolve('src/html'),
          },
          {
            test: /\.(png|jpg|gif|svg|ico)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 2048,//2048k以下轉成base64
                  name: '[path][name].[ext]?[hash:10]',
                  esModule: false,
                },
              },
            ],
            include: path.resolve('src/img'),
          },
        ],
    },
    plugins: [
        // TODO
        new HtmlWebpackPlugin({
          template: './html/index.pug',
          filename: 'index.html',
          chunks: ['vendors', 'index'],//拆成兩支js
        }),
        new MiniCssExtractPlugin({
          filename: DEV_MODE ? '[name].css' : '[name]-[contenthash].css',
        }),
        // https://webpack.js.org/plugins/define-plugin/
        new Webpack.DefinePlugin({}),
        ...DEV_MODE
          ? []
          : [
            new OptimizeCSSAssetsPlugin(),
          ],
      ],
      devServer: {
        before(app, server) {;
          // hot reload for html, pug
          chokidar.watch('src/html/**/*').on('all', () => {
            server.sockWrite(server.sockets, 'content-changed');
          });
        },
        // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
        // HTML5 History API
        historyApiFallback: true,
        port: 3000,
        hot: true,
        // 可以用 ip 連線，預設是 localhost
        host: '0.0.0.0',
        stats: 'minimal',
      },
      optimization: {
        // https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendors: {
              name: 'vendors',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkscachegroupscachegroupenforce
              enforce: true,
            },
          },
        },
      },
}