let Controller = function(){}

Controller.index = function(req,res,next){
	res.render('index', {user:'User'});
};

module.exports = Controller;