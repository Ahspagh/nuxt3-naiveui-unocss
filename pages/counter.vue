<script lang="ts" setup>
import { useCounterG } from '~~/stores/counter'

const count2 = ref(1)
const count = useCounterG()
const { value: countG } = storeToRefs(count)
const counter = useCounter()
const { double } = storeToRefs(counter)
// 用作监听action行为 action中可以使用异步 或者添加到执行前后或错误时的回调
const unSubscribe = counter.$onAction(
  ({
    name, // action 名称
    store, // store 实例，类似 `someStore`
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或解决后的钩子
    onError, // action 抛出或拒绝的钩子
  }) => {
    // 为这个特定的 action 调用提供一个共享变量
    const startTime = Date.now()
    // 这将在执行 "store "的 action 之前触发。
    console.log(`Start "${name}" with params [${args.join(', ')}].`)

    // 这将在 action 成功并完全运行后触发。
    // 它等待着任何返回的 promise
    after((result) => {
      console.log(
                `Finished "${name}" after ${Date.now() - startTime
                }ms.\nResult: ${result}.`,
      )
    })

    // 如果 action 抛出或返回一个拒绝的 promise，这将触发
    onError((error) => {
      console.warn(
                `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`,
      )
    })
  },
)
onUnmounted(() => {
  // 手动删除监听器
  unSubscribe()
  console.log('onUnMounted', '// 手动删除监听器')
})
</script>

<template>
  <div class="pt-4">
    Counter2:{{ count2 }}
    CounterG:{{ countG }}
    <div class="mt-2">
      <NButton @click="count2++; countG++">
        +
      </NButton>
      <NButton @click="count2--; countG--">
        -
      </NButton>
    </div>
  </div>
  <p>
    This is an example store to test out devtools. Try one of the following
    with the devtools open:
    <br>
  </p>

  <ol>
    <li>Use the different increment actions</li>
    <li>Change the counter directly from the devtools</li>
    <li>Use decrement to zero to see how action groups work</li>
    <li>
      Click
      <b>Test Errors</b> and immediately after <b>increment</b> the store
    </li>
    <li>
      While the dev server is running, try changing counter.changeMe, adding,
      and removing new state properties
    </li>
  </ol>

  <h2>Counter Store</h2>

  <p data-testid="counter-values">
    Counter: {{ counter.n }}. Double: {{ double }}
  </p>

  <p>Increment the Store:</p>

  <NButton data-testid="increment" @click="counter.increment()">
    +1
  </NButton>
  <NButton @click="counter.increment(10)">
    +10
  </NButton>
  <NButton @click="counter.increment(100)">
    +100
  </NButton>
  <NButton @click="counter.n++">
    Direct Increment
  </NButton>
  <NButton
    @click="
      counter.$patch((state) => {
        state.n = 0
        state.incrementedTimes = 0
        state.numbers = []
        state.decrementedTimes = 0
      })
    "
  >
    Direct patch
  </NButton>

  <p>Other actions:</p>

  <NButton @click="counter.fail">
    Test Errors
  </NButton>
  <NButton @click="counter.decrementToZero()">
    Decrement to zero
  </NButton>
  <NButton @click="counter.changeMe()">
    <code>counter.changeMe()</code>
  </NButton>

  <hr>

  <p>
    Complete store state via
    <code>store.$state</code>:
  </p>

  <pre>{{ counter.$state }}</pre>

  <pre>{{ storeToRefs(counter) }}</pre>
</template>
