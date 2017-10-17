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
	res.render('auth');
};
Controller.signup = function(req,res,next){
    var email = req.body.email;
    var password = req.body.password;
    console.log(email, ' ', password);
    connection.query('SELECT * FROM teachers WHERE Email = ? AND Password = ?', [email, password],
        function(err, results, fields) {
         if (err) {
             console.log(err);
         } else {
             res.redirect(301, '/main');
             console.log('Results are: ', results);

         }
    });
}
module.exports = Controller;


