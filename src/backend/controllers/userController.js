var userModel = require('../../common/models/user');
exports.listUsers = (req, res) => {
    let users = userModel.getUsers();
    console.log(users)
    res.send('hai')
};