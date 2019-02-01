var userModel = require('../../common/models/user');
var validate = require('validate.js');
var editUserValidationRules = require('../../backend/validations/editUser');
var createUserValidationRules = require('../../backend/validations/createUser');

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
module.exports.deleteUser = (req,res,next) => {
    var userId = req.body.id;
    if(userId) {
        userModel.deleteUser(userId,(response)=> {
            if(response) {
                res.status(200).json({ status: 'success' });
            } else {
                res.status(200).json({ status: 'error' });
            }
        })
    } else {
        res.status(400).end('Unable to fetch required parameter');
    }
}
module.exports.createUser = (req, res, next) => {
    res.render('user/create-user', {
        title: 'Create User',
        layout: 'layouts/layout_master',
        messages: req.flash()
      })
}
module.exports.saveUser = (req,res,next) => {
    var errors = null;
	errors = validate(req.body, createUserValidationRules.createUser());
	if(errors == null || errors == undefined) {
        userModel.saveUser(req,(response) => {
            if(response) {
                req.flash('success', 'User added successfully');
                res.redirect('/users');
            } else {
                req.flash('error', 'Unbale to add user');
                res.redirect('/users');
            }
        })
    } else {
        //to do
    }
}
module.exports.actOrDeactUser = (req,res,next) => {
    userModel.actOrDeactUser(req,(callback) => {
        if(callback) {
            res.status(200).json({ status: 'success' });
        } else {
            res.status(200).json({ status: 'error' });
        }
    })
}