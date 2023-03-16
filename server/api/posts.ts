import path from 'path'
import matter from 'gray-matter'
import fs from 'fs'
// 文章目录 
const postDir = path.join(process.cwd(), 'content');

export default defineEventHandler(e => {
    const fileNames = fs.readdirSync(postDir)
    const posts = fileNames.map(fileName => {
        // 获取文件名作为文章标题
        const id = fileName.replace(/.md$/, '');
        const fullPath = path.join(postDir, fileName)
        const fileContent = fs.readFileSync(fullPath, 'utf-8')
        // 获取文章标题和创建日期--文件添加的元数据
        const matterInfo = matter(fileContent)
        const fileInfo = fs.statSync(fullPath)
        return {
            id,
            title: matterInfo.data,
            date: fileInfo.ctime

        }
    })
    // 降序排列
    return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
})