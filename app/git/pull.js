const nodegit = require('nodegit')

module.exports = function(item) {
    return new Promise(resolve => {
        let repository = null
        nodegit.Repository.open(item.path).then(Repository => {
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
