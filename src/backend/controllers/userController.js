var userModel = require('../../common/models/user');
var validate = require('validate.js');
var editUserValidationRules = require('../../backend/validations/editUser');

module.exports.listUsers = (req, res) => {
    userModel.getUsers((users) => {
        res.render('user/_list_users', {
            title: 'Users',
            layout: 'layouts/layout_master',
            data : users,
            messages: req.flash(),
        });
    }); 
};
module.exports.ajaxGetUserDataForUpdate = (req,res,next) => {
    var userId = req.query.id;
    userModel.getUser(userId,(user) => {
        if(user) {
            // if a callback is specified, the rendered HTML string has to be sent explicitly
            res.render('user/edit-user',{ user: user, layout: false }, function(err, html) {
                if(err) {
                    res.status(200).send("<p>We'r Sorry unable to fetch user data.Please try again after sometime.</p>");
                }
                res.send(html);
            });
        } else {
            res.status(404).end('Requested resource not found');
        }
    });
}
module.exports.updateUser = (req,res,next) => {

    var errors = null;
	errors = validate(req.body, editUserValidationRules.editUser());
	if(errors == null || errors == undefined) {
        userModel.updateUser(req,(response)=> {
            if(response) {
                req.flash('success', 'User details updated successfully');
                res.redirect('/users');
            } else {
                req.flash('error', "We'r sorry unable to update user details");
                res.redirect('/users');
            }
        })
    } else {
        res.send('error')
		// let form = {}
		// form.errors = errors;
		// form.body = req.body;
		// callback(form);
	}
};