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
                           res.render('admin', {teachers: teachers, lessons: lessons, groups: results});
                       }
                    });
                }
            });
        }
        
    });  
};

Controller.addteacher = function(req, res, next) {
    var id = parseInt(req.body.id);
    console.log('addteacher controller');
    connection.query('INSERT INTO teachers (ID, Name, Login, Email, Password) VALUES (?, ?, ?, ?, ?)', [id, req.body.name, req.body.login, req.body.email, req.body.password], function(err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log('succeded');
            res.redirect(301, '/admin');
        }
    });
};

Controller.addlesson = function(req, res, next) {
    console.log('addlesson controller');
    var id = parseInt(req.body.id);
    connection.query('INSERT INTO lessons (ID, Name) VALUES (?, ?)', [id, req.body.name], function(err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log('succeded');
            res.redirect(301, '/admin');
        }
    });
};

Controller.addgroup = function(req, res, next) {
    console.log('addgroup controller');
    var id = parseInt(req.body.id);
    connection.query('INSERT INTO groups (ID, Name, Teacher_ID) VALUES (?, ?, ?)', [id, req.body.name, req.body.teacherid], function(err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log('succeded');
            res.redirect(301, '/admin');
        }
    });
};

Controller.delteacher = function(req, res, next) {
    console.log('delteacher controller');
    var id = parseInt(req.body.id);
    connection.query('DELETE FROM teachers WHERE ID = ?', [id], function(err, results) {
       if (err) {
           console.log(err);
       } else {
           console.log('succeded');
           res.redirect(301, '/admin');
       }
    });
};

Controller.dellesson = function(req, res, next) {
    console.log('dellesson controller');
    var id = parseInt(req.body.id);
    connection.query('DELETE FROM lessons WHERE ID = ?', [id], function(err, results) {
       if (err) {
           console.log(err);
       } else {
           console.log('succeded');
           res.redirect(301, '/admin');
       }
    });
};

Controller.delgroup = function(req, res, next) {
    console.log('delgroup controller');
    var id = parseInt(req.body.id);
    connection.query('DELETE FROM groups WHERE ID = ?', [id], function(err, results) {
       if (err) {
           console.log(err);
       } else {
           console.log('succeded');
           res.redirect(301, '/admin');
       }
    });
};



module.exports = Controller;
