/**
 * Created by Administrator on 2018/8/20/020
 */
module.exports = {
  base: '/self_UI/',
  home: true,
  title: '前端知识记录(wk)',
  description: 'Enjoy what you are doing!',
  head: [
    ['link', {rel: 'icon', href: '/favicon.ico'}], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  themeConfig: {
    sidebar: [
      {
        title: '简单组件',
        children: [
          '/components/easy/button',
          '/components/easy/input',
          '/components/easy/layout',
          '/components/easy/grid',
        ]
      },
      {
        title: '复杂组件',
        children: []
      },
    ],
    nav: [
      {text: 'Vue组件库', link: '/components/'},
      {text: '积累', link: '/front_end_record'},
      {text: 'Node', link: '/node_relevant'}
    ],
    // activeHeaderLinks: false,
    repo: 'https://github.com/wangkaiwd/self_UI', // github地址
    docsBranch: 'master', // 项目分支
    lastUpdated: 'Last Updated', // 最后更新时间
    // activeHeaderLinks: false,
    // refresh按钮可以立即激活新的Service Worker
    serviceWorker: {
      updatePopup: true
    }
  }
}