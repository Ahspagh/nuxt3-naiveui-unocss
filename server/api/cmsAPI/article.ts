import { useGraphqlAPI } from '~~/composables/useGraphql'
export default defineEventHandler(async e => {
  const query = `query($id: ID!) {
      post:article(id: $id) {
        data {
          id
          attributes {
            title
            publishedDate
            content
            locale
            localizations {
              data {
                id
                attributes {
                  title
                  publishedDate
                  content
                  locale
                }
              }
            }
          }
        }
      }
    }`
     

  let queryid = getQuery(e)?.id || '4'
 // 参数有问题抛出异常
  // const errorID =parseInt(e.context.params.id) as number
  // if(Number.isInteger(errorID)){
  //   throw  createError({
  //     statusCode:400,
  //     statusMessage:'ID 应该是个整数'
  //   })
  // }

  const variables = { id:queryid }
  const data = await useGraphqlAPI({ query, variables })
  let {id,localizations, publishedDate,title,content,locale}=data.post
  interface contentAttr {
    // 文章返回属性类型定义
    id: string;
    publishedDate: string;
    title:string,
    content:string,
    locale:string
  }
  interface localizations{
    // 内容返回语言对象
    [key:string]:contentAttr
  }
  let res:localizations ={}
  let tmp = localizations?.data || []
  // type tmpArrayType =Array<contentAttr>;
  // 过度变量类型定义
      tmp.push({
        id,
        publishedDate,
        title,
        content,
        locale,
      })
      tmp.forEach((item:contentAttr) => {
        res[item.locale] = item
      })
  return res
})
  // e的方法
  // getRouterParam()、readBody()、getQuery()
  // getCookie()、 getMethod()、getHeader() 
    // post:article 查询数据库article表返回改名为post