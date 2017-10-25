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
            res.render('profile', {userinfo: results, message: req.session.profMes});
        }
    })
};

Controller.newlogin = function(req, res, next) {
    connection.query('SELECT Login from teachers WHERE Login = ?', [req.body.login], function(err, results) {
        if (results.length > 0) {
            console.log('here we are');
            req.session.profMes = 'falselog';
            res.redirect(301, '/profile');
        } else {
            connection.query('UPDATE teachers SET login = ? WHERE email = ?', [req.body.login, req.session.email], 
            function(err, results) {
               if (err) {
                   console.log(err);
               } else {
                   req.session.profMes = 'truelog';
                   res.redirect(301, '/profile');
               }
            });
        }
    });
    
};

Controller.newname = function(req, res, next) {
    connection.query('UPDATE teachers SET name = ? WHERE email = ?', [req.body.name, req.session.email], 
    function(err, results) {
       if (err) {
           console.log(err);
       } else {
           req.session.profMes = 'truename';
           res.redirect(301, '/profile');
       }
    });    
};

Controller.newemail = function(req, res, next) {
    connection.query('SELECT Email from teachers WHERE Email = ?', [req.body.email], function(err, results){
        if (results.length > 0) {
            req.session.profMes = 'falsemail';
            res.redirect(301, '/profile');
        } else {
            connection.query('UPDATE teachers SET email = ? WHERE email = ?', [req.body.email, req.session.email], 
            function(err, results) {
               if (err) {
                   console.log(err);
               } else {
                   req.session.email = req.body.email;
                   req.session.profMes = 'truemail';
                   res.redirect(301, '/profile');
               }
            }); 
        }
    });
       
};

Controller.newpass = function(req, res, next) {
    connection.query('UPDATE teachers SET password = ? WHERE email = ?', [req.body.password, req.session.email], 
    function(err, results) {
       if (err) {
           console.log(err);
       } else {
           req.session.profMes = 'truepass';
           res.redirect(301, '/profile');
       }
    });    
};
module.exports = Controller;

