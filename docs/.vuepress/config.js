/**
 * Created by Administrator on 2018/8/20/020
 */
module.exports = {
  home: true,
  title: 'Vue UI',
  description: '简单 好用 的Vue UI 框架',
  themeConfig: {
    sidebar: [
      {
        title: '简单组件',
        children: [
          '/components/easy/button',
          '/components/easy/input',
          '/components/easy/layout',
          '/components/easy/col',
        ]
      },
      {
        title: '复杂组件',
        children: []
      },
    ],// 自动生成侧边栏
    // activeHeaderLinks: false,
    repo: 'https://github.com/wangkaiwd/self_UI', // github地址
    docsBranch: 'master', // 项目分支
    lastUpdated: 'Last Updated', // 最后更新时间
    // activeHeaderLinks: false
    // refresh按钮可以立即激活新的Service Worker
    serviceWorker: {
      updatePopup: true
    }
  }
}