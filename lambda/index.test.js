const index = require('./index')

index.handler({'markdown':'# HELLO!'},null).then(function(output){
    console.log(output)
})
