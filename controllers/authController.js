const _ = require('lodash');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'checkin'
});

let Controller = function(){}

Controller.index = function(req,res,next){
	res.render('auth');
};
Controller.signup = function(req, res, next){
    const email = req.body.email;
    const password = req.body.password;
    
    if (Controller.isAdmin(email, password)) {
        req.session.isLoggedIn = true;
        req.session.email = email;
        req.session.admin = true;
        res.redirect(301, '/main');

    } else {
            connection.query('SELECT * FROM teachers WHERE Email = ? AND Password = ?', [email, password],
            (err, result) => {

             if (result.length === 0) {
                 res.redirect(301, '/auth'); //TODO inform user that email/pass is invalid
             } else {

                req.session.isLoggedIn = true;
                req.session.email = email;
                res.redirect(301, '/main');
             }
        });
    }

};

Controller.isAdmin = function(email, password) {
    return email === 'admin@gmail.com' && password === 'admin';
}

Controller.logout = function(req, res, next) {
    req.session.destroy((err) => res.redirect(301, '/auth'));
};

module.exports = Controller;