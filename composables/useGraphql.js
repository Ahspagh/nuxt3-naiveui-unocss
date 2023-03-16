
export const useGraphqlAPI = async ({ query, variables, operationName = null }) => {
    const runTimeConfig = useRuntimeConfig()
    const body = JSON.stringify({
        operationName,
        query,
        variables,
    })
    // ！！graphql的请求body格式为纯字符串而不是json或者仅query JSON.stringify化
    // let myheader = new Headers() //safari不支持……
    // myheader.set('Authorization', `Bearer ${runTimeConfig.strapiToken}`)
    // myheader.set('Content-Type', 'application/json')
    // myheader.set('Connection', 'keep-alive')
    const config = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${runTimeConfig.strapiToken}`,
            'Content-Type': 'application/json',
            'Connection': 'keep-alive'
        },
        body
    }
    const { data: res } = await $fetch(runTimeConfig.public.graphql_url, config)
    // 在strapi中的graphql去掉包装结构
    const removeAttributeWrapper = (data) => {
        if ('attributes' in data) {
            const _ = data.attributes
            delete data.attributes
            return removeAttributeWrapper({ ...data, ..._ })
        }
        if ('data' in data) {
            const _ = data.data
            if (Array.isArray(_)) {
                return data // 不去掉data字段
            }
            else {
                delete data.data
                return removeAttributeWrapper({ ...data, ..._ })
            }
        }
        return data
    }
    const removeStrapiWrapper = (data) => {
        if (Array.isArray(data)) {
            const _ = data.map((item) => {
                return removeStrapiWrapper(removeAttributeWrapper(item))
            })
            return _
        }
        else if (Object.prototype.toString.call(data) === '[object Object]') {
            const _ = removeAttributeWrapper(data)
            Object.entries(_).forEach(([k, v]) => {
                _[k] = removeStrapiWrapper(v)
            })
            return _
        }
        else {
            return data
        }
    }

    return removeStrapiWrapper(res)
} 