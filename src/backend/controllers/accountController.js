var loginValidation = require('../validations/login');
var userEditValidation = require('../validations/editUser');
var userCreateValidation = require('../validations/createUser');

exports.index = (req, res) => {
    res.render('account/dashboard', {
        title: 'Dashboard',
        layout: 'layouts/layout_master'
    });
};
exports.login = (req, res) => {
    res.render('account/login', {
        title: 'Login',
        layout: 'layouts/layout_login',
        messages: req.flash()
    });
};
exports.getRules = (req, res, next) => {
    let validation;
	let page = req.params.page;
	if (page === 'login') {
		validation = loginValidation.login();
	} else if(page == 'editUser') {
		validation = userEditValidation.editUser();
	} else if(page =='createUser') {
        validation = userCreateValidation.createUser();
    }
	res.json({
		error: false,
		data: validation
	})
};
exports.forgotPassword = (req, res, next) => {
    res.send('This feature is not implemented')
};