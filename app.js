var express = require('express.io');
var path = require('path');
var app = express().http().io();

app.configure(function(){
	app.use(express.cookieParser());  
	app.use(express.bodyParser());    //for handling post data
	app.use(express.static(path.join(__dirname, 'public'))); //for handling static contents
	app.use(express.session({secret: 'monkey'})); //for using sessions
	app.set('view engine', 'ejs');
});

var route = require('./routes/index.js')(app);
app.listen(6790);