//dependencies or imports
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

//calling connect function for mongoose to connect to database
const config = require('./config/database');
mongoose.connect(config.database);

// On connection to database
mongoose.connection.on('connected', function(){
   console.log('Connected to database: '+config.database); 
});

// On connection error to database
mongoose.connection.on('error', function(err){
   console.log('Database error: '+err); 
});

// Refer book
const users = require('./routes/users');

//initializing app variable with express
const app = express();

//Port number
const port = 3000;

// CORS middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname,'public')));

// Body Parser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Refer book
app.use('/users', users);

// Index route
// Refer https://expressjs.com/en/guide/routing.html regarding app.get
// Refer https://stackoverflow.com/questions/4696283/what-are-res-and-req-parameters-in-express-functions regarding req and res
app.get('/', function(req,res){
   res.send("Hello World!"); 
});

// Start server
//Starts a UNIX socket and listens for connections on the given path. This method is identical to Node’s http.Server.listen().
//ie., takes the port and starts our server
app.listen(port, function(){
    console.log("Server started on port "+port);
});