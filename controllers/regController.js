const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'toor',
  database: 'checkin',
});

let Controller = function(){}

Controller.index = function(req, res, next){
    res.render('reg');
};

Controller.register = function(req, res, next) {
  if (req.body.password === req.body.confirm) {//TODO move this logic to the frontend
    connection.query(`INSERT INTO teachers (ID, Name, Login, Email, Password)
      VALUES (null, ?, ?, ?, ?)`,
      [req.body.name, req.body.login, req.body.email, req.body.password],
      (err, result) => {
        if (err) {
          console.log(err);
          res.redirect(301, '/register'); //TODO inform user if an err happened
        } else {
          req.session.isLoggedIn = true;
          req.session.email = req.body.email;
          res.redirect(301, '/main');
        }
    });
  } else {
    res.redirect(301, '/register'); //TODO inform user that passes r not simillar
  }
};

module.exports = Controller;

