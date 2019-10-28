const nodegit = require('nodegit')
const path = require('path')

let test = nodegit.Clone('https://github.com/webzhd/zdkins.git', path.join( __dirname, '/test')).done(function(res) {
    console.log(res)
})
console.log(test)