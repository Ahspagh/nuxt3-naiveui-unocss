# Nuxt 3 + NaiveUI + UnoCSS 

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.


- 学习nuxt3的一些过程

- NaiveUI、UnoCss

- markdownit+hightlight 

- strapi4 使用 graphql 对接API

- Pinia 以及一些学习注释

- i18n相关待续……

# some issues 

1. 开发环境下 在head里多出来的<style cssr-id="n-global"></style> 会影响首屏body加载时的样式 打包生产后仅多出来此标签而无影响
2. 开发环境下 globalState中存储的isDark持久化恢复会有明显延迟 生产环境不明显
这两个问题也许和vite或者兼容ssr的naive插件@huntersofbook/naive-ui-nuxt 有关 暂未解决

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
