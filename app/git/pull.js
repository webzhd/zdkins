const nodegit = require('nodegit')

module.exports = function() {
    return new Promise(resolve => {
        let repository = null
        nodegit.Repository.open('E:/math/egg').then(Repository => {
            repository = Repository
            return Repository.fetchAll()
        }).then(() => {
            return repository.mergeBranches("master", "origin/master");
        }).done(() => {
            console.log('done')
            resolve('done')
        })
    })
}
