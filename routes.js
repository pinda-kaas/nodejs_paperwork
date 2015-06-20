var bodyParser = require('body-parser')

module.exports = function (app) {

    // POST /api/users gets JSON bodies
    app.post('/api/postding',  function (req, res) {
        if (!req.body)
            res.send('inside post error');
        else
            res.send(req.body);

    })

}