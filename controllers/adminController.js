const mysql = require('mysql');
const connection = mysql.createConnection({
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

const Controller = function(){}

Controller.renderPage = async function(req, res, next){
    const groups = await Controller.getData("groups");
    const lessons = await Controller.getData("lessons");
    const teachers = await Controller.getData("teachers");

    res.render("admin", {
        groups: groups,
        lessons: lessons,
        teachers: teachers, 
        message: req.session.admMes
    });
};

Controller.getData = function(table) {
    const query = `SELECT * FROM ${table}`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

Controller.addteacher = function(req, res, next) {
    const id = parseInt(req.body.id);
    
    connection.query('INSERT IGNORE INTO teachers (ID, Name, Login, Email, Password) VALUES (?, ?, ?, ?, ?)',
      [id, req.body.name, req.body.login, req.body.email, req.body.password],
        (err, result) => Controller.redirect(req, res, err, result, "add")
    );
};

Controller.addlesson = function(req, res, next) {
    const id = parseInt(req.body.id);

    connection.query('INSERT IGNORE INTO lessons (ID, Name) VALUES (NULL, ?)',
      [req.body.name],
        (err, result) => Controller.redirect(req, res, err, result, "add")
    );
};

Controller.addgroup = function(req, res, next) {
    const id = parseInt(req.body.id);
    const teacherid = parseInt(req.body.teacherid);
    
    connection.query('INSERT IGNORE INTO groups (ID, Name, Teacher_ID) VALUES (?, ?, ?)',
      [id, req.body.name, req.body.teacherid],
        (err, result) => Controller.redirect(req, res, err, result, "add")
    );
};

Controller.delteacher = function(req, res, next) {
    const id = parseInt(req.body.id);
    connection.query('DELETE FROM teachers WHERE ID = ?', 
      [id], (err, result) => Controller.redirect(req, res, err, result, "del")
    );
};

Controller.dellesson = function(req, res, next) {
    const id = parseInt(req.body.id);
    connection.query('DELETE FROM lessons WHERE ID = ?', 
      [id], (err, result) => Controller.redirect(req, res, err, result, "del")
    );
};

Controller.delgroup = function(req, res, next) {
    const id = parseInt(req.body.id);
    connection.query('DELETE FROM groups WHERE ID = ?',
      [id], (err, results) => Controller.redirect(req, res, err, result, "del")
    ); 
};

Controller.redirect = function(req, res, err, result, method) {
    if (err || !result.affectedRows) {
        console.log(err);
        req.session.admMes = "false" + method;
    } else {
        req.session.admMes = "true" + method;
    }
    res.redirect(301, "/admin"); 
};

module.exports = Controller;
