export default defineNuxtPlugin((nuxtApp) => {
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
})