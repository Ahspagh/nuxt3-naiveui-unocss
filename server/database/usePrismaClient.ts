import {PrismaClient} from '@prisma/client'
import error from '~~/plugins/error';
const prisma = new PrismaClient()
export default prisma
// 长链接建议使用单例的PrismaClient
// async function main(){
//   const allUsers= await client.user.findMany()
//   console.log(allUsers);   
// }
// main().then(async ()=>{
//   await prisma.$disconnect()

// }).catch(async (e)=>{
//   console.error(e)
//   await prisma.$disconnect()
//   process.exit(1)
// })