const Router = require('koa-router')
const router = new Router()
const fs = require('fs')
const path = require('path')

const {start, end, update} = require('./cps')
const list = [
    {
        "name": "VFR前端",
        "path": "F:/math/fitting-test",
        "command": "npm run test",
        "start": false,
        "port": "5001",
        "pid": ""
    },
    {
        "name": "VFR接口服务",
        "path": "F:/math/fitting-service",
        "command": "npm run dev",
        "start": false,
        "port": "7001",
        "pid": ""
    },
    {
        "name": "VFR模型管理",
        "path": "F:/math/model-management",
        "command": "npm run test",
        "start": false,
        "port": "5006",
        "pid": ""
    }
]



router.post('/list', async (ctx) => {
    ctx.body = list
})

router.post('/command', async (ctx) => {
    const {state, index}  = ctx.request.body
    if(state === 'start'){
        start(list[index])
    } else {
        end(list[index])
    }
    ctx.body = '1'
})

router.post('/update', async (ctx) => {
    const {index}  = ctx.request.body
    try {
        await update(list[index])
        ctx.body = 1
    }catch(e) {
        ctx.body = 0
    }
    
})

module.exports = router



// const child_process = require('child_process');
// const kill = require('tree-kill');

// let cp1 = child_process.spawn('npm run dev', ['--prefix F:/commond/'], {shell: true})
// // let cp2 = child_process.spawn('npm run dev', ['--prefix F:/commond/'], {shell: true})

// cp1.stdout.on('data', function (data) {
//     console.log('out1', data.toString());
// });

// cp1.stderr.on('data', function (data) {
//     console.log('err1', data.toString());
// });

// cp2.stdout.on('data', function (data) {
//     console.log('out2', data.toString());
// });

// cp2.stderr.on('data', function (data) {
//     console.log('err2', data.toString());
// });


