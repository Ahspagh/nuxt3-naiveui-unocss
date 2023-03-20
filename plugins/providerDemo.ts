import dayjs from 'dayjs'
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('format', (data?: Date, template = 'DD/MM/YYYY' as string) => {
        return dayjs(data).format(template)
    })
})

// 使用：
// 1.通过const nuxtApp=useNuxtApp()获得全局实例
// 2.nuxtApp.$format(data,template)调用
// 3.帮助函数类型声明在types/index.d.ts