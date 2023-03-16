/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false
    // 关闭默认基本样式
  },
}
// 只是为了配合tailwindcss插件使用  安装到项目开发依赖不引入
// unocss兼容其语法  
//  both ml-3 (Tailwind), ms-2 (Bootstrap), ma4 (Tachyons), mt-10px (Windi CSS) are valid.