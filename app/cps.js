const child_process = require('child_process');
const kill = require('tree-kill');
const pull = require('./git/pull')


function start(item) {
    let cp = child_process.spawn(item.command, ['--prefix', item.path], {shell: true})
    item.start = true;
    item.pid = cp.pid
    cp.stdout.on('data', function (data) {
        console.log(data.toString());
    });
    
    cp.stderr.on('data', function (data) {
        console.log(data.toString());
        end(cp.pid)
    });
}

function end(item){
    kill(item.pid)
    item.start = false
}

async function update(item) {
    return await pull(item)
}

module.exports.start = start

module.exports.end = end

module.exports.update = update