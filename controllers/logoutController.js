let Controller = function(){}

Controller.logout = function(req, res, next) {
    req.session.destroy((err) => res.redirect(301, '/auth'));
};

module.exports = Controller;