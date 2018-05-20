var _ = require('lodash');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
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

Controller.index = function(req,res,next){
	res.render('auth');
};
Controller.signup = function(req,res,next){
    var email = req.body.email;
    var password = req.body.password;
    console.log(email, ' ', password);
    if (email === 'admin@gmail.com' && password === 'admin') {
        req.session.isLoggedIn = true;
        req.session.email = email;
        req.session.admin = true;
        res.redirect(301, '/main');
    } else {
            connection.query('SELECT * FROM teachers WHERE Email = ? AND Password = ?', [email, password],
            function(err, results, fields) {
             if (results.length == 0) {
                 console.log('your password or login is incorrect');
                 res.redirect(301, '/auth');
             } else {
                 req.session.isLoggedIn = true;
                 req.session.email = email;
                 res.redirect(301, '/main');
             }
        });
    }

};

Controller.logout = function(req, res, next) {
    req.session.destroy(function (err) {
          console.log('logout controller');
          res.redirect(301, '/auth');
    });
};

module.exports = Controller;


