<script setup lang="ts">
const { messageInfo } = await $fetch('/api/hello');

const posts = await $fetch('/api/posts');
let testComposables = useFoo();
console.log('testComposables', testComposables);
const { x, y } = useMouse();
useHead({
  title: '文章列表',
});

// const ins = getCurrentInstance();
let show = ref(true);
onMounted(() => {
  // ins?.proxy?.$alert('component mounted!')
  show.value = false;
  // window.$message.success(
  //   'Cause you walked hand in hand With another man in my place'
  // )
  const { $message } = useNuxtApp();
  $message.success(
    'Cause you walked hand in hand With another man in my place'
  );
});
</script>
<style></style>

<template>
  <div class="flex items-center flex-col gap-2">
    <h1>Index Page</h1>
    <NButton>hello naive</NButton>
    <Nuxt-link to="/detail/async">async post detail</Nuxt-link>
    <div v-for="post in posts" :key="post.id">
      <Nuxt-link :to="`detail/${post.id}`">
        {{ post.title }}
      </Nuxt-link>
      <p class="text-slate-500 w">发布于：{{ post.date }}</p>
    </div>
    <modelTest v-model:title="messageInfo"></modelTest>
    <div>pos: {{ x }}, {{ y }}</div>
    <div>
      <NButton type="error">hello</NButton>
      <NButton type="info">hello</NButton>
      <NButton type="primary">hello</NButton>
      <NButton>hello</NButton>
      <NButton type="warning">hello</NButton>
    </div>

    <n-image
      width="100"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
    <n-image width="100" src="test.jpg" />
    <!-- <n-image width="100" src="" /> -->
    <!-- <img src="~/assets/avatar.jpg" alt=""> -->
    <!-- <img src="~/assets/avatar.jpg" /> -->

    <n-image
      width="100"
      src="http://localhost:1337/uploads/Fn_JR_Zn_Sa_UA_Abs_EC_203995dbc0.jpg"
      class="pa-4"
    />
  </div>
</template>
