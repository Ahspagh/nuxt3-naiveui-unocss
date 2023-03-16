import { useGraphqlAPI } from '~/composables/useGraphql'
export default defineEventHandler(async e => {


  const query = `query($locale:I18NLocaleCode!){
    articles(locale:$locale,sort:"id:desc") {
      data{
        id
        attributes{
          title
          locale
          publishedDate
        }
      }
    }
  }`
  let locale = getQuery(e)?.locale || 'en'
  const variables = { locale }
  const res = await useGraphqlAPI({ query, variables })
  // defineEventHandler中event内容可用方法
  // https://github.com/unjs/h3
  // console.log('API:news', getQuery(e), getHeaders(e))
  return res.articles.data
})