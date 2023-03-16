<template>
    <div>
        <!-- <myComponent v-model:title="???"></myComponent> -->
        <!-- 默认情况使用的都是modelValue作为prop 也可以使用指定参数来更改名字 :title  对应修改事件update:title -->
        {{ title }}
    </div>
</template>

<script setup>
// v-model的接收与绑定
// const props = defineProps(['modelValue'])
// const emit = defineEmits(['update:modelValue']);
const value = computed({
    get() {
        return prop.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
}
)
//v-model.capitalize 修饰符可以通过modelModifiers prop在组件中访问到
//console.log(props.modelModifiers) // { capitalize: true }
// const props1 = defineProps({
//     modelValue: 'string',
//     modelModifiers: {
//         default: () => ({})
//     }
// })


// <MyComponent v-model:title.capitalize="myText">
// 重命名的v-model带有修饰符的 生成的prop名将是arg+'Modifiers'
const props2 = defineProps(['title', 'titleModifiers'])
const emit2 = defineEmits(['update:title'])
function emitCapitalizeValue(value) {
    if (props.titleModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
        emit('update:title', value)
    }
}
</script>

<style lang="scss" scoped></style>