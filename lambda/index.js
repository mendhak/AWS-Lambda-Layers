


// Handler
exports.handler = async function(event, context) {

    // if (event && event.Records){
    //     event.Records.forEach(record => {
    //         console.log(record.body)
    //     })
    // }
    
    // console.log('## ENVIRONMENT VARIABLES: ' + JSON.stringify(process.env))
    // console.log('## CONTEXT: ' + JSON.stringify(context))
    // console.log('## EVENT: ' + JSON.stringify(event.name))

    var md = require('markdown-it')();
    var result = md.render(event.markdown);
    return result;
}
