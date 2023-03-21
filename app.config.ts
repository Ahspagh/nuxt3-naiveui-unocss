
import { GlobalThemeOverrides } from 'naive-ui'
const bodyCommon = {
    // lato无中文字体时试用下一个字体
    fontFamily: "lato,'Smiley Sans Oblique', v-sans, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
    fontSize: 'unset',
    lineHeight: 'unset',

}
const naiveDarkOverrides: GlobalThemeOverrides = {
    common: {
        ...bodyCommon,
        primaryColor: '#ff0000',
        primaryColorHover: '#ec00ec',

    },
    Button: {

    },
    // ...
}
const naiveLightOverrides: GlobalThemeOverrides = {
    common: {
        ...bodyCommon
    }
}
export default defineAppConfig({
    // 这些变量是响应式的，不仅在运行时可以访问，还可以改变
    title: 'hello nuxt',
    theme: {
        // dark: false,
        naiveDarkOverrides,
        naiveLightOverrides
    }
})
