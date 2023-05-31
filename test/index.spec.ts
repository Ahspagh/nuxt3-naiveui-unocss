import { describe, expect, test,it } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils'

describe ('My test', async () => {
  await setup({

  })
  test('index page should be work', async () => {
    const html = await $fetch('/')
    expect(html).toMatch('<h1>Index Page</h1>')
  })
})
// with concurrent will be run in parallel
describe('suite', () => {
  // 连续测试中使用.concurrent 并发运行
  it('serial test', async () => {
    // 
  })
  it.concurrent('concurrent test1', async () => {})
  it.concurrent('concurrent test2', async () => {})
  it.concurrent('concurrent test3', async () => {})
})
