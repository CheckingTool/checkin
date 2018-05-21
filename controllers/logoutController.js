let Controller = function(){}

Controller.logout = function(req, res, next) {
    req.session.destroy(() => res.redirect(301, '/'));
};

module.exports = Controller;