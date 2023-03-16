<template>
    <div>
        <NButton type="error" @click="throwError">点一个试试</NButton>
    </div>
</template>

<script setup lang="ts">
const throwError = () => {
    throw new Error('來自throwErrow組件的异常')
}
// 修复 Naive UI 和 Tailwind 样式优先级引起的样式错误问题 @vueuse/nuxt 需要仅client运行
// process.browser &&
//     useMutationObserver(
//         document.head,
//         () => {
//             const naiveStyles = Array.from(
//                 document.head.querySelectorAll('style[cssr-id]')
//             );

//             if (
//                 naiveStyles.find((style) =>
//                     style.nextElementSibling
//                         ? !style.nextElementSibling.hasAttribute('cssr-id')
//                         : false
//                 )
//             ) {
//                 naiveStyles.forEach((style) => {
//                     document.head.appendChild(style);
//                 });
//             }
//         },
//         {
//             childList: true,
//         }
//     );
</script>

<style scoped></style>