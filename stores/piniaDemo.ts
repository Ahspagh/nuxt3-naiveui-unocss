const delay = (t: number) => new Promise(r => setTimeout(r, t))
export const useCounter = defineStore('PiniaDemo', {
  state: () => ({
    n: 2 as number,
    incrementedTimes: 0 as number,
    decrementedTimes: 0 as number,
    numbers: [] as number[],
  }),

  getters: {
    // 自动推断出返回类型是一个 number
    double: state => state.n * 2,
    // 这里我们需要自己添加类型(在 JS 中使用 JSDoc)
    // 可以用 this 来引用 getter
    /**
         * 返回 count 的值乘以 2 加 1
         *
         * @returns {number}
         */
    // 返回类型**必须**明确设置
    doublePlusOne(): number {
      // 整个 store 的 自动补全和类型标注 ✨
      return this.double + 1
    },
  },

  actions: {
    increment(amount = 1) {
      this.incrementedTimes++
      this.n += amount
    },

    changeMe() {
      console.log('change me to test HMR')
    },

    async fail() {
      const n = this.n
      await delay(1000)
      this.numbers.push(n)
      await delay(1000)
      if (this.n !== n)
        throw new Error('Someone changed n!')

      return n
    },

    async decrementToZero(interval = 300) {
      if (this.n <= 0)
        return

      while (this.n > 0) {
        this.$patch((state) => {
          state.n--
          state.decrementedTimes++
        })
        await delay(interval)
      }
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCounter, import.meta.hot))
