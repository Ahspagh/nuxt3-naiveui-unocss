
export default defineNuxtRouteMiddleware((to, from) => {
    console.log('路由全局中间件c，影响所有路径', to.path);
    // abortNavigation(error)：跳过，留在 from；
    // navigateTo(route)：指定跳转目标。
})