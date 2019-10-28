const Koa = require('koa');
const path = require('path')
const fs = require('fs')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const compress = require('koa-compress')
const getPort = require('./port')
const ipv4 = require('./ipv4')
const error = require('./error')
const router = require('../app/index')

const app = new Koa();

const resolve = (dir) => path.join(__dirname, '../', dir)

app.on('error', (err) => {
    console.log(err)
})
// 静态目录
app.use(serve(resolve('public')))
// 允许跨域
app.use(cors())
// A body parser for koa, support json, form and text type body.
app.use(bodyParser())
// 开启gz
app.use(compress({ threshold: 2048 }))
// 错误处理
app.use( error )

app.use( async (ctx, next) => {
    const headers = ctx.request.headers
    if(headers.accept && headers.accept.includes('text/html')){
        ctx.type = 'html';
        ctx.body = fs.createReadStream(resolve('public/index.html'));
    } 
    return next()
})

app.use(router.routes())


getPort(3000).then(port => {
    app.listen(port);
    console.log(`open http://${ipv4}:${port} or http://localhost:${port}`)
}).catch(e => {
    console.log(e)
})

module.exports = app

  
