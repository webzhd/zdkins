module.exports = async (ctx, next) => {
    try {
        await next()
    } catch(e) {
        console.log(e)
        ctx.body = {
            success: false,
            msg: '接口出错',
            data: e
        }
    }
}