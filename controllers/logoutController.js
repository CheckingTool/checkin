let Controller = function(){}

Controller.logout = function(req, res, next) {
    req.session.destroy(function (err) {
          console.log('logout controller');
          res.redirect(301, '/auth');
    });
};

module.exports = Controller;