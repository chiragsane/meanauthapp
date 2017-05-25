const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/database');

//connect to db
mongoose.connect(config.database);
//On connection
mongoose.connection.on('connected', function(){
    console.log("Connected to mongoose "+config.database);
});
//On connection
mongoose.connection.on('error', function(err){
    console.log("Database error: "+err);
});

const app = express();

//PORT
const port = 3000;

const users = require('./routes/users');
const qualifications = require('./routes/qualifications');

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//CORS Middleware
app.use(cors());

//Bodyparser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Index route
app.get('/', function(req, res){
    res.send("Invalid");
});

//user route
app.use('/users', users);

//qualification route
app.use('/qualification',qualifications);

//random routes
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

//Start server
app.listen(port, function(){
    console.log("Server started on port " + port);
});