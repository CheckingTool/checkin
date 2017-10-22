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

Controller.index = function(req,res,next){
    connection.query('SELECT * FROM teachers WHERE Email=?', [req.session.email], function(err, results){
        if (err) {
            console.log(err);
        } else {
            res.render('profile', {userinfo: results});
        }
    })
};

Controller.newlogin = function(req, res, next) {
    connection.query('UPDATE teachers SET login = ? WHERE email = ?', [req.body.login, req.session.email], 
    function(err, results) {
       if (err) {
           console.log(err);
       } else {
           console.log('succeded');
           res.redirect(301, '/profile');
       }
    });
};

Controller.newname = function(req, res, next) {
    connection.query('UPDATE teachers SET name = ? WHERE email = ?', [req.body.name, req.session.email], 
    function(err, results) {
       if (err) {
           console.log(err);
       } else {
           console.log('succeded');
           res.redirect(301, '/profile');
       }
    });    
};

Controller.newemail = function(req, res, next) {
    connection.query('UPDATE teachers SET email = ? WHERE email = ?', [req.body.email, req.session.email], 
    function(err, results) {
       if (err) {
           console.log(err);
       } else {
           req.session.email = req.body.email;
           console.log('succeded');
           res.redirect(301, '/profile');
       }
    });    
};

Controller.newpass = function(req, res, next) {
    connection.query('UPDATE teachers SET password = ? WHERE email = ?', [req.body.password, req.session.email], 
    function(err, results) {
       if (err) {
           console.log(err);
       } else {
           console.log('succeded');
           res.redirect(301, '/profile');
       }
    });    
};
module.exports = Controller;

