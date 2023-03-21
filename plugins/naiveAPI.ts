import {
    createDiscreteApi,
    ConfigProviderProps,
    darkTheme,
    lightTheme,
} from 'naive-ui'

export default defineNuxtPlugin((nuxtApp) => {
    const themeRef = ref<'light' | 'dark'>('light')
    const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
        theme: themeRef.value === 'light' ? lightTheme : darkTheme
    }))
    const { message, notification, dialog, loadingBar } = createDiscreteApi(
        ['message', 'dialog', 'notification', 'loadingBar'],
        {
            configProviderProps: configProviderPropsRef
        }
    )
    nuxtApp.provide('themeChange', (isDark?: boolean) => {
        if (typeof isDark == 'undefined') {
            if (themeRef.value === 'light') themeRef.value = 'dark'
            else themeRef.value = 'light'
        } else {
            themeRef.value = isDark ? 'dark' : 'light'
        }

    })
    nuxtApp.provide('message', message)
    nuxtApp.provide('notification', notification)
    nuxtApp.provide('dialog', dialog)
    nuxtApp.provide('loadingBar', loadingBar)
})

// 使用：
// 1.通过const nuxtApp=useNuxtApp()获得全局实例
// 2.nuxtApp.$format(data,template)调用 //const { $format } = useNuxtApp()
// 3.帮助函数类型声明在types/index.d.ts