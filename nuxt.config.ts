// https://nuxt.com/docs/api/configuration/nuxt-config
import transformerDirectives from "@unocss/transformer-directives";
export default defineNuxtConfig({
	modules: [
		"@huntersofbook/naive-ui-nuxt",
		"@unocss/nuxt",
		"@vueuse/nuxt",
		[
			"@pinia/nuxt",
			{
				autoImports: [
					// 自动引入defineStore(),storeToRefs()
					"defineStore",
					"storeToRefs",
					// 自动引入 `usePinia()` 并重命名为 `usePiniaStore()`
					//   ['defineStore', 'definePiniaStore'],
					"acceptHMRUpdate",
				],
			},
		],
		"@pinia-plugin-persistedstate/nuxt",
	],
	unocss: {
		// presets
		uno: true, // enabled `@unocss/preset-uno`
		icons: true, // enabled `@unocss/preset-icons`
		attributify: true, // enabled `@unocss/preset-attributify https://github.com/unocss/unocss/tree/main/packages/preset-attributify`,

		// core options
		shortcuts: [],
		rules: [],

		transformers: [
			// UnoCSS transformer for @apply、@screen and theme() directive
			transformerDirectives(),
		],
	},
	imports: {
		dirs: [
			// Nuxt3 默认只扫描根目录中模块
			// 扫描目录中的模块
			"composables",
			// 扫描内嵌一层深度的模块，指定特定文件名和后缀名
			"composables/*/index.{js,ts,mjs,mts}",
			// 所有模块
			"composables/**",
			"stores",
		],
	},
	css: ["~/assets/css/global.css", "~/assets/css/oceanicnext.min.css"],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					// additionalData: '@import "~/assets/_variables.scss"'
				},
			},
		},
	},
	runtimeConfig: {
		// Private config that is only available on the server
		strapiToken:
			"27d4a8239774c714dee0885b4407a91270db37354fd2a98a4fd54b5eef63ea16754ac31876d212d51002ebf84ddbd91cf9cab5c702a70b29b8d6253566287e242a8afec8c192ae3c4dfd78b0b9289f2e63ace50bd0893a26cbba661ca9d918626d0d6474e000b9c95ca30a8a5f8efa917cf10c6ba703310fec654d8d779c6792",
		// Config within public will be also exposed to the client
		public: {
			apiBase: "/api",
			strapi_base_url:
				process.env.NODE_ENV === "development"
					? "http://localhost:1337"
					: "https://strapicms.hkbcs.com/",
			graphql_url:
				process.env.NODE_ENV === "development"
					? "http://localhost:1337/graphql"
					: "https://strapicms.hkbcs.com/graphql",
		},
	},
	devServer: {
		port: 6725,
	},
	server: {
		port: process.env.PORT || 6725,
	},
	app: {
		head: {
			viewport: "width=750",
			// 设置meta的标题模板 子页面usehead设置title时可以传入s 这里配置无效 写在APP.vue
			titleTemplate: s => {
				return s ? `${s} - My Nuxt3 APP` : "My Nuxt3 APP";
			},
			// meta: [
			//     { name: 'naive-ui-style' }
			// ]
			// link: [{
			//     rel: 'preload',
			//     href: './fonts/Lato-Regular.ttf',
			//     as: "font",
			//     type: "font/ttf"
			// }]
		},
	},
	nitro: {
		prerender: {
			// routes:[] //服务端预渲染路径
		},
	},
	extends: "@nuxt-themes/docus",
});
