// import
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

// export
module.exports = {
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './js/main.js',
  // 결과물(번들)을 반환하는 설정
  output: {
    // path는 결과물이 반환될 디렉토리를 절대경로로 명시를 해야한다.
    path: path.resolve(__dirname, 'dist'), // dirname = 현재 폴더, 원래 결과물을 dist라는 폴더로 만들어준다.
    filename: 'main.js',  // 엔트리와 같은 네임이라 따로 지정안해줘도 된다.
    clean: true // 기존에 만들었던 파일을 '제거'하고 새로만들어질 수 있도록 한다.
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,  // .css로 끝나는 확장자를 찾는 정규표현식. $은 앞에있는 내용이 끝나는 내용을 찾는다. s?는 s가 있을수도 없을수도 있다.
        use: [
          'style-loader',  // 해석된 내용을 html style에 삽입해준다.
          'css-loader',  // js에서 css파일을 로드하면 js는 css파일을 해석할 수 없어서 필요하다.
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
       patterns: [  // 배열인 이유는 이러한 방식의 경로들을 여러개 해줄 수 있다는 거다.
         { from: 'favicon.ico'}
       ]
    })
  ],

  devServer: {
    host: 'localhost'
  }
}