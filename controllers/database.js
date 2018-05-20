module.exports = function connect() {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'toor',
        database: 'checkin',
    });

    connection.connect((err) => {
        if (err) {
            console.log('Connection could not be established');
        } else {
            connection.query("SET SESSION wait_timeout = 604800");
            console.log('Connected to database');
        }
    });
    return connection;
};


