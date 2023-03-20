<template>
  <n-config-provider
    :theme="theme.dark ? darkTheme : undefined"
    :theme-overrides="
      theme.dark ? theme.naiveDarkOverrides : theme.naiveLightOverrides
    "
    preflight-style-disabled
    inline-theme-disabled
    abstract
  >
    <!-- 
    inline-theme-disabled：组件行内样式去除，
    abstract：主题配置不再嵌套 
    preflight-style-disabled:禁用默认样式以完全控制全局样式
    namespace:组件外可卸载元素的provier命名空间 如modal tooltip- 
             独立API组件useDialog、useMessage、useNotification、useLoadingBar
  -->
    <!--  :locale="zhCN"  :date-locale="dateZhCN" 	; zhTW 	dateZhTW-->
    <n-message-provider>
      <NScrollbar
        id="appContainer"
        :class="['max-h-screen', { dark: theme.dark }]"
      >
        <NuxtLayout>
          <NuxtPage></NuxtPage>
        </NuxtLayout>
      </NScrollbar>
    </n-message-provider>
    <n-global-style />
    <!--n-global-style 主题样式可添加到body上  -->
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme, useOsTheme } from 'naive-ui'
import { useStorage } from '@vueuse/core'
// import { darkTheme, zhCN, dateZhCN } from 'naive-ui';
useHead({
  // 设置meta的标题模板 子页面usehead设置title时可以传入s
  titleTemplate: s => {
    return s ? `${s} - My Nuxt3 APP` : 'My Nuxt3 APP'
  },
})
const { theme } = useAppConfig()
// theme需要本地持久化
// localStorage.setItem('theme',JSON.stringify(theme))
// const { value: storeTheme } = useStorage('theme', theme)
// 当前操作系统的主题是
const osTheme = useOsTheme()
// const message = useMessage()
// // 搭配在app.vue中或者外部需要使用messageProvider 
// 或者离开setup使用createDiscreteApi来对应创建脱离上下文的UI-API 但不会被创建在主题下 
// 或者在setup顶层中挂载到window下 在window下使用API
// message.warning('这是一条warning message')
// const ins = getCurrentInstance();
// onMounted(() => {
//   ins?.proxy?.$alert('component mounted!')
// });
</script>

<style scoped></style>