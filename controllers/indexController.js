let Controller = function(){}

Controller.index = function(req,res,next){
    console.log(req.session.email);
	res.render('index', {admin: req.session.admin, user:req.session.email});
};

module.exports = Controller;