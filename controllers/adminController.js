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

Controller.crud = function(req, res, next){
    var teachers = [];
    var lessons = [];
    var groups = [];
    connection.query('SELECT * FROM teachers', function(err, results){
        if (err) {
            console.log(err);
        } else {
            for (var i in results) {
                teachers.push(results[i]);
            }
                connection.query('SELECT * FROM lessons', function(err, results) {
                if (err) {
                    console.log(err);
                } else {
                    for (var j in results) {
                        lessons.push(results[j]);
                    }
                    connection.query('SELECT * FROM groups', function(err, results) {
                       if (err) {
                           console.log(err);
                       } else {
                           res.render('admin', {teachers: teachers, lessons: lessons, groups: results, message: req.session.admMes});
                       }
                    });
                }
            });
        }
        
    });  
};

Controller.addteacher = function(req, res, next) {
    var id = parseInt(req.body.id);
    
    connection.query('INSERT INTO teachers (ID, Name, Login, Email, Password) VALUES (?, ?, ?, ?, ?)', [id, req.body.name, req.body.login, req.body.email, req.body.password], function(err, results) {
        if (err) {
            console.log(err);
        } else {
            req.session.admMes = 'trueadd';
            res.redirect(301, '/admin');
        }
    });
};

Controller.addlesson = function(req, res, next) {
    var id = parseInt(req.body.id);
    connection.query('SELECT * FROM lessons WHERE ID = ?', [id], function(err, results){
        if (results.length > 0) {
            req.session.admMes = 'falseadd';
            res.redirect(301, '/admin');
        } else {
            connection.query('INSERT INTO lessons (ID, Name) VALUES (?, ?)', [id, req.body.name], function(err, results) {
                if (err) {
                    console.log(err);
                } else {
                    req.session.admMes = 'trueadd';
                    res.redirect(301, '/admin');
                }
            });
        }
    });
    
};

Controller.addgroup = function(req, res, next) {
    console.log('addgroup controller');
    var id = parseInt(req.body.id);
    var teacherid = parseInt(req.body.teacherid);
    connection.query('SELECT * FROM Teachers WHERE ID = ?', [teacherid], function(err, results) {
        if (err) {
            console.log(err);
        }
        if (results.length > 0) {
            connection.query('INSERT INTO groups (ID, Name, Teacher_ID) VALUES (?, ?, ?)', [id, req.body.name, req.body.teacherid], function(err, results) {
                if (err) {
                    console.log(err);
                } else {
                    req.session.admMes = 'trueadd';
                    res.redirect(301, '/admin');
                }
            });
        } else {
            req.session.admMes = 'falseadd';
            res.redirect(301, '/admin');
        }
    });
    
};

Controller.delteacher = function(req, res, next) {
    var id = parseInt(req.body.id);
    connection.query('SELECT * FROM teachers WHERE ID = ?', [id], function(err, results){
        if (results.length == 0) {
            req.session.admMes = 'falsedel';
            res.redirect(301, '/admin');
        } else {
            connection.query('DELETE FROM teachers WHERE ID = ?', [id], function(err, results) {
               if (err) {
                   console.log(err);
               } else {
                   req.session.admMes = 'truedel';
                   res.redirect(301, '/admin');
               }
            });
        }
    });
    
};

Controller.dellesson = function(req, res, next) {
    var id = parseInt(req.body.id);
    connection.query('SELECT * FROM lessons WHERE ID = ?', [id], function(err, results) {
        if (results.length == 0) {
            req.session.admMes = 'falsedel';
            res.redirect(301, '/admin');
        } else {
            connection.query('DELETE FROM lessons WHERE ID = ?', [id], function(err, results) {
               if (err) {
                   console.log(err);
               } else {
                   req.session.admMes = 'truedel';
                   res.redirect(301, '/admin');
               }
            });
        }
    });

};

Controller.delgroup = function(req, res, next) {
    var id = parseInt(req.body.id);
    connection.query('SELECT * FROM groups WHERE ID = ?', [id], function(err, results) {
        if (results.length == 0) {
            req.session.message = 'falsedel';
            res.redirect(301, '/admin');
        } else {
            connection.query('DELETE FROM groups WHERE ID = ?', [id], function(err, results) {
               if (err) {
                   console.log(err);
               } else {
                   req.session.mesage = 'truedel';
                   res.redirect(301, '/admin');
               }
            });
        }
    });
    
};


module.exports = Controller;
