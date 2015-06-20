// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var port  	 = process.env.PORT || 8080; 				// set the port
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

app.use(bodyParser.urlencoded({
    extended: true
}));
//app.use(bodyParser.json());

app.use(function(err, req, res, next){
   console.log(err);
    res.send(err);
});
// logic
// }); after app.use(bodyParser());

app.use(methodOverride());

// routes ======================================================================
require('./routes.js')(app);


// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
