const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'checkin'
});

let Controller = function(){}

Controller.index = function(req, res, next) {
  connection.query('SELECT * FROM teachers WHERE Email=?',
    [req.session.email],  (err, result) => {
      if (err) {
          console.log(err);

      } else {
        res.render(
          'profile',
          {
            userinfo: result,
            message: req.session.profMes
          }
        );

      }
  })
};

Controller.newlogin = function(req, res) {
  connection.query('UPDATE teachers SET login = ? WHERE email = ?',
    [req.body.login, req.session.email],
    err => Controller.redirect(req, res, err, 'login')
  );
};

Controller.newname = function(req, res, next) {
  connection.query('UPDATE teachers SET name = ? WHERE email = ?',
    [req.body.name, req.session.email],
    err => Controller.redirect(req, res, err, 'name'));
};

Controller.newemail = function(req, res, next) {
  connection.query('UPDATE teachers SET email = ? WHERE email = ?',
    [req.body.email, req.session.email],
    err => Controller.redirect(req, res, err, 'email'));
};

Controller.newpass = function(req, res, next) {
  connection.query('UPDATE teachers SET password = ? WHERE email = ?',
    [req.body.password, req.session.email],
    err => Controller.redirect(req, res, err, 'password'));
};

Controller.redirect = function(req, res, err, changedField) {
  if (err) {
    console.log(err);
    req.session.profMes = 'false' + changedField;
  } else {
    req.session.email = req.body.email; // only in email case
    req.session.profMes = 'true' + changedField;
  }

  res.redirect(301, '/profile');
};

module.exports = Controller;

