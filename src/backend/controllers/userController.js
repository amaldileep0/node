var userModel = require('../../common/models/user');
exports.listUsers = (req, res) => {
    userModel.getUsers((users) => {
        res.render('user/_list_users', {
            title: 'Users',
            layout: 'layouts/layout_master',
            data : users
        });
    }); 
};