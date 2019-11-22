const path = require('path')

function resolve (dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  devServer: {
    open: true
  },
  chainWebpack: (config) => {
    // 这里是对环境的配置，不同环境对应不同的BASE_API，以便axios的请求地址不同
    config.plugin('define').tap(args => {
      const argv = process.argv
      const mode = argv[argv.indexOf('--project-mode') + 1]
      args[0]['process.env'].MODE = `"${mode}"`
      args[0]['process.env'].BASE_API = '"http://47.94.138.75:8000"'
      return args
    })
    // svg loader
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  },
  configureWebpack: {
    module: {
      rules: [{
        test: /pixi\.js/,
        use: [{
          loader: 'expose-loader',
          options: 'PIXI'
        }]
      }, {
        test: /phaser-split\.js/,
        use: [{
          loader: 'expose-loader',
          options: 'Phaser'
        }]
      }, {
        test: /p2\.js/,
        use: [{
          loader: 'expose-loader',
          options: 'p2'
        }]
      }]
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'phaser': path.join(__dirname, './node_modules/phaser-ce/build/custom/phaser-split'),
        'pixi': path.join(__dirname, './node_modules/phaser-ce/build/custom/pixi'),
        'p2': path.join(__dirname, './node_modules/phaser-ce/build/custom/p2')
      }
    }

  }
}
