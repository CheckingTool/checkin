module.exports = function dbconnection() {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'checkin',
    });

    connection.connect(function(err) {
        if (err) {
            console.log('Connection could not be established');
        } else {
            connection.query("SET SESSION wait_timeout = 604800");
            console.log('Connected to database');
        }
    });
    
};


