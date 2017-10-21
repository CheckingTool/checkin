var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'checkin'
});

connection.connect(function(err) {
    if (err) {
        console.log('Connection could not be established');
    } else {
        connection.query("SET SESSION wait_timeout = 604800");
        console.log('Connected to database');
    }
})

let Controller = function(){}

Controller.index = function(req, res, next){
    res.render('reg');
};
Controller.register = function(req, res, next) {
    console.log('welcome to register controller');
    if (req.body.password == req.body.confirm) {
        
    }
};



module.exports = Controller;

