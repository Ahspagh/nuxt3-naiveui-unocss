<template>
    <NuxtErrorBoundary>
        <!-- 默认插槽显示正常内容 -->
        <p>一切正常</p>
        <!-- 触发一个错误 -->
        <ThrowError></ThrowError>
        <template #error="{ error }">
            <p class="my-4 text-xl text-gray-500">
                发生了一些错误{{ error }}
            </p>
            <NButton type="success" @click="error.value = null">修正错误</NButton>
        </template>
    </NuxtErrorBoundary>
</template>

<script setup lang="ts">
</script>

<style ></style>