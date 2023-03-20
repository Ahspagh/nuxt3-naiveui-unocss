export default defineNuxtPlugin((nuxtApp) => {
    // nuxtApp的一些重要属性和方法
    // provide (name, value)：定义全局变量和方法；

    // hook(name, cb)：定义 nuxt 钩子函数；

    // vueApp：获取 vue 实例；

    // ssrContext：服务端渲染时的上下文；

    // payload：从服务端到客户端传递的数据和状态；

    // isHydrating：用于检测是否正在客户端注水过程中

    // nuxtApp.vueApp.config.errorHandler = (...args) => {
    //     console.log('vue error handler')
    //     console.log()
    //     //  Vue 层面的处理方法 onErrorCaptured app.config.errorHandler = (error, context) => {}
    // }
    // app:error：整个应用层面的错误捕获；
    nuxtApp.hook('app:error', (...args) => {
        console.log('app:error')
    })

    // vue:error：仅 Vue 层面的错误捕获。
    nuxtApp.hook('vue:error', (...args) => {
        console.log('vue:error');

    })
    // 插件的执行顺序可以用数字来控制，因为插件之间可能有依赖关系。 1.plugin-step1.ts 2.plugin-step2.ts
    // 可在文件名上使用 .server 或 .client 后缀使插件仅作用于服务端或者客户端
})