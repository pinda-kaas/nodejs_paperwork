// set up ======================================================================
    var express  = require('express');
var app      = express();                               // create our app w/ express
var port     = process.env.PORT || 8080;                // set the port
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

app.use(function(req, res, next) {
    //the code hits this point!
    var data = '';
    req.on('data', function(chunk) {
        data += chunk;
    });
    req.on('end', function() {
        req.rawBody = data;
        console.log('from req.on',data);

    });
    console.log(data);
    next();
});
app.use(bodyParser.json());
app.use(methodOverride());

// routes ======================================================================
require('./routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);