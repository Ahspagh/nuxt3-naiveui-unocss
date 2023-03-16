<template>
  <div>
    <!-- <p>{{ router.params.id }}</p> -->
    <div v-if="pending">Loading……</div>
    <div v-if="error">{{ errorMsg }}</div>
    <div v-else>
      <div class="p-5">
        <div class="text-2xl">{{ data?.title }}</div>
        <div v-html="data?.content" ref="content"></div>
        <!-- {{ content }} -->
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { NuxtError } from '#app';
import { useUser } from '~~/stores/user';
const router = useRoute()
const fetchPost = () => $fetch(`/api/detail/${router.params.id}`)
// const { title, content } = await $fetch(`/api/detail/${router.params.id}`)
const { data, pending, error } = await useAsyncData("post", fetchPost)
// 获取服务端返回的错误信息
const errorMsg = computed(() => (error.value as NuxtError).statusMessage)

// Nuxt提供了showError方法显示全屏错误，传递字符串或错误对象
watchEffect(() => {
  if (unref(error)) {
    // 如果参数是 ref，则返回内部值，否则返回参数本身。这是 val = isRef(val) ? val.value : val 计算的一个语法糖。
    showError(errorMsg.value as string)
  }
});

// 获取状态，转换为Ref 
const store = useUser()
const { isLogin } = storeToRefs(store)
useHead({
  title: router.params.id as string,
  //   meta: [
  //     { name: 'description', content: 'My amazing site.' }
  //   ],
  bodyAttrs: {
    class: 'test'
  },
  //   script: [ { children: "console.log('Hello world')" } ]
})
</script>

<style lang="scss" scoped></style>