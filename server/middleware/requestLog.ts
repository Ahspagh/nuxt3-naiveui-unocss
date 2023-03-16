export default defineEventHandler((event) => {
    console.log('New Request:' + event.node.req.url);
    // 拓展上下文对象
    event.context.userInfo = { user: 'LRF' }
    // console.log(event.node);

    // 审查请求信息
    const params = getQuery(event)
    // const id =parseInt(event.context.params.id) as number
    // if(!Number.isInteger(params?.id)){
    // 抛出错误
    // return sendError(createError({
    //     statusCode: 400,
    //     statusMessage: '400错误哦'
    // }))
    // }




})