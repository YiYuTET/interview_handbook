import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/interview_handbook/",
  title: "HarmonyOS",
  description: "鸿蒙应用 面试手册 开发文档",
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
	logo: "logo.png",
	
	outlineTitle: "文章目录",
	outline: [2, 6],
	
    nav: [
	  { text: '项目文档', link: '/project/index' },
	  { text: 'HarmonyOS文档', link: 'https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V2/development-intro-0000001478061813-V2' },
      { text: '关于我', link: 'https://github.com/YiYuTET' },
    ],

    sidebar: [
      {
        text: '面试手册 开发文档',
        items: [
          { text: '面试手册APP-项目介绍', link: '/project/index' },
		  { text: '面试手册APP-通用模块', link: '/project/common' },
          { text: '面试手册APP-首页模块', link: '/project/home' },
		  { text: '面试手册APP-我的模块', link: '/project/mine' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/YiYuTET/interview-handbook-project/tree/main' }
    ],
	
	footer: {
		copyright: "Copyright@ 2024 By YiYuTET"
	},
	
	// 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
  }
})
