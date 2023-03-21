import { computed, ref } from 'vue'
import {
    createDiscreteApi,
    ConfigProviderProps,
    darkTheme,
    lightTheme,
} from 'naive-ui'

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

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:created', (vueApp) => {
        if (process.client) {
            window.$message = message
            window.$notification = notification
            window.$loadingBar = loadingBar
            window.$dialog = dialog
        }

        vueApp.config.globalProperties.$alert = (msg: string) => {
            // const message = useMessage()
            // message.warning(msg)

        }
    })
    // nuxtApp.vueApp.config.globalProperties.$alert 这样获取vue全局实例方法也行
})