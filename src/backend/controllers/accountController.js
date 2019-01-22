var loginValidation = require('../validations/login');

exports.index = function(req, res) {
    res.render('account/dashboard', {
        title: 'Dashboard',
        layout: 'layouts/layout_master'
    });
};
exports.login = function(req, res) {
    res.render('account/login', {
        title: 'Login',
        layout: 'layouts/layout_login',
        messages: req.flash()
    });
};
exports.getRules = function(req, res, next) {
    let validation;
	let page = req.params.page;
	if(page === 'login'){
		validation = loginValidation.login();
	}
	res.json({
		error: false,
		data: validation
	})
};