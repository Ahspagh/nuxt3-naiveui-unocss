// export const useLogin = () => useState(() => false)
// import {parse,stringify} from 'zipson' persist-serializer-deserialize,serialize
export const useUser = defineStore({
    // id: 必须的，在所有 Store 中唯一
    id: "GlobalState",
    state: () => ({
        isLogin: false,
        isDark: false
    }),
    actions: {
        handleChangeTheme(value: boolean) {
            this.isDark = value
            const { $themeChange } = useNuxtApp();
            $themeChange(value);
        }
    },
    persist: {
        // 持久化开关 默认存储在cookie上
        // storage:persistedState.sessionStorage
        // 仅限persistedState提供的storage方法
        storage: persistedState.cookiesWithOptions({
            sameSite: 'strict',
            // https://prazdevs.github.io/pinia-plugin-persistedstate/zh/frameworks/nuxt-3.html
            // https://nuxt.com/docs/api/composables/use-cookie#samesite
            // 使用 cookiesWithOptions() 允许你配置 cookies。不传递任何选项将默认与使用 cookies 相同
        }),
        beforeRestore: (ctx) => {
            console.log(`即将恢复 '${ctx.store.$id}'`)
        },
        afterRestore: (ctx) => {
            console.log(`刚刚恢复完 '${ctx.store.$id}'`)
        },
    }

})