<template>
	<nav class="flex items-center justify-between" p="x5 y2" border="0 b solid  slate-200">
		<h1 class="text-2xl font-bold">
			<nuxt-link to="/">Nuxt 3 in Action</nuxt-link>
		</h1>
		<div class="bg-white dark:bg-slate-600 dark:text-slate-200">
			<label>
				dark mode:
				<NSwitch id="toggle" v-model:value="isDark" @update:value="globalState.handleChangeTheme" />
			</label>
			<Avatar></Avatar>
			<NButton @click="showModal = true">show Modal</NButton>
		</div>
	</nav>

	<ClientOnly>
		<!-- 服务端渲染期间找不到_nuxt内部的节点 一般为body -->
		<!-- 传送这个内容到ID :appContainer节点 n-config-provider里面-->
		<Teleport to="#appContainer">
			<!-- 使用这个 modal 组件（已自动从components目录导入），传入 prop -->
			<modal :show="showModal" @close="showModal = false">
				<!-- 具名插槽 -->
				<template #header>
					<h3>custom header</h3>
				</template>
			</modal>
		</Teleport>
	</ClientOnly>
</template>
<script setup lang="ts">
// const appConfig = useAppConfig();
const showModal = ref(false);

const globalState = useUser();
const { isDark } = storeToRefs(globalState);
// const handleChangeTheme = (value: boolean) => {
//   const { $themeChange } = useNuxtApp();
//   $themeChange(value);
// };
</script>
