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
    var unique = true;
    console.log('welcome to register controller');
    if (req.body.password == req.body.confirm) {
        connection.query('SELECT Login, Email from teachers', function(err, results) {
           if (err) {
               console.log(err);
           } else {
               console.log(results);
               for (var i in results) {
                   if (results[i].Login == req.body.login || results[i].Email == req.body.email) {
                       unique = false;
                   }
               }
               if (unique == true) {
                   var id;
                   connection.query('SELECT ID from teachers ORDER BY ID DESC LIMIT 1', function(err, results) {
                       if (err) {
                           console.log(err);
                       } else {                        
                           id = results[0].ID+1;
                       }
                       connection.query('INSERT INTO teachers (ID, Name, Login, Email, Password) VALUES(?, ?, ?, ?, ?)', 
                                        [id, req.body.name, req.body.login, req.body.email, req.body.password], function(err, results) {
                           if (err) {
                               console.log(err);
                           } else {
                               console.log('succeded');
                               res.redirect(301, '/main');
                           }
                       });
                   })
                        
               } else {
                   console.log('your login or email is not unique. Please pick a new one');
                   res.render('reg');
               }
           }
        });
    } else {
        console.log('you couldnt confirm your password');
        res.render('reg');
    }
};



module.exports = Controller;

