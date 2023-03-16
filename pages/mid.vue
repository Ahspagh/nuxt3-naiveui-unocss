<template>
    <div>
        路由中间件测试页
    </div>
</template>

<script setup lang="ts">
// definePageMeta({
//   middleware(to, from) {
//     console.log('匿名中间件，具体页面执行');
//   }
// })
definePageMeta({
    middleware: ['amid', 'bmid']
})
</script>

<style scoped></style>