export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: '乐吾乐 Topology - 开源免费绘图工具',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          '一个基于typescript + canvas的好用开源绘图工具和绘图引擎。易集成到自己的前端项目、还可以方便自定义图形库，支持微服务架构图、流程图、时序图、活动图、类图等'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_1113798_0532l8oa6jqp.css'
      },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_1331132_5lvbai88wkb.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/element-ui', '@/plugins/axios'],
  parserOptions: {},
  extends: ['@nuxtjs'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error'
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },
  proxy: {
    '/api/': 'http://topology.le5le.com/',
    '/image/': 'http://topology.le5le.com/'
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
