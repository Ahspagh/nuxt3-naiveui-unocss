


import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
// import { remark } from 'remark'
// import html from 'remark-html'
// import hljs from 'highlight.js/lib/core'
// import javascript from 'highlight.js/lib/languages/javascript';
// hljs.registerLanguage('javascript', javascript)
import hljs from 'highlight.js'
import markdown from 'markdown-it'
const md = new markdown({
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code class="hljs">' +
                    hljs.highlight(str, { language: lang }).value +
                    '</code></pre>'
            } catch (error) {

            }
        }
        return ''
    }
})
const postDir = path.join(process.cwd(), 'content')
export default defineEventHandler(async e => {
    try {
        const fileName = getRouterParam(e, 'id') + '.md'

        const filePath = path.join(postDir, fileName)
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const mdOut = md.render(fileContent)
        const matterInfo = matter(fileContent)
        // // 转换Markdown为html
        // const processedContent = await remark().use(html).process(matterInfo.content)
        // const content = processedContent.toString()


        console.log('content')

        return {
            title: matterInfo.data.title,
            content: mdOut

            //hljs.highlightAuto(mdOut).value
        }
    } catch (error) {
        // 没有此文件或没有访问权限
        throw createError({
            statusCode: 400,
            statusMessage: '文章不存在'
        })
    }

})