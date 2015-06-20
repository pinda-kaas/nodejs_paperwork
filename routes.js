module.exports = function (app) {
    app.post('/api/postding',  function (req, res) {
        //do some schema validation
        console.log('api/postding posted');
        res.end('done');
    })
}