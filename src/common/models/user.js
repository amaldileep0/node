var app = require('../../../src/app');
var dateTime = require('node-datetime');
//Gets config middleware for the application.
var config = require('config');

exports.authenticate = function (username,password,done) {
    const bcrypt = require('bcrypt');
    // search for attributes
    var User = app.locals.User;
    User.findOne({ where: {emailid: username, status: 1} }).then(function (user, err) {
    if (err) {
       return done(err); 
    }
    if (!user) { 
      return done(null, false); 
    }
    bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return done(err);
        }
        if (!result) {
          return done(null, false);
        }
        return done(null, user); 
      })
  })  
}
exports.serializeUser = function (user, done) {
    done(null, user.id);
}
exports.deserializeUser = function (id, done) {
    var User = app.locals.User;
    User.findOne({where: {id: id}}).then(function (user, err) {
        done(err, user);
    })
}
exports.getUsers = (callback)=> {
    var User = app.locals.User;
    User.findAll().then(function(users,err){
        if (err) {
            callback(false);
        }
        callback(users);
    })
}
exports.getUser = (userId,callback)=> {
    var User = app.locals.User;
    User.findOne({
		attributes:['id', 'emailid', 'first_name', 'last_name', 'mobile_no'],
		where: {id: userId}
	}).then(user => {
		callback(user);
	}).catch(err => {
		callback(false);
	})
}
exports.updateUser = (req,callback) => {
    var User = app.locals.User;
    var id = req.body.id;
    var emailid = req.body.emailid;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var mobile_no = req.body.mobile_no;
    if(!id) {
        callback(false)
    } else {
        var dt = dateTime.create();
        var formatted = dt.format('Y-m-d H:M:S');

        User.findOne({ where: {id: id} }).then(user => {
            user.update({
                emailid: emailid,
                first_name: first_name,
                last_name: last_name,
                mobile_no: mobile_no,
                updated_at: formatted
            }).then((result) => {
                if(result){
                    callback(true);
                } else {
                    callback(false);
                }
            }).catch(err => {
                callback(false);
            })
        }).catch(err => {
            callback(false);
        })
    }
}
exports.deleteUser = (id,callback) => {
    var User = app.locals.User;
    User.findOne({ where: {id: id} }).then(user => {
        if(user) {
           callback(user.destroy())
        } else {
            callback(false)
        }
    }).catch(err => {
        if (err) {
            callback(false);
        }
    })
}
exports.saveUser = (req,callback) => {
    var User = app.locals.User;
    var bcrypt = require('bcrypt');
    var emailid = req.body.emailid;
    var first_name = req.body.first_name;
    var password = req.body.password;
    var last_name = req.body.last_name;
    var mobile_no = req.body.mobile_no;

    var bcryptdata = config.get('bcrypt');
	bcrypt.hash(password, bcryptdata.saltRound, function (err, hash) {
        if (err) {
            callback(false)
        }
        var dt = dateTime.create();
        var formatted = dt.format('Y-m-d H:M:S');
        User.build(
            {  
                emailid: emailid,
                first_name: first_name,
                last_name :last_name,
                mobile_no: mobile_no,
                created_at:formatted,
                password: hash
            }).save().then(user => {
                if(user) {
                    callback(true)
                }
            }).catch(error => {
                if(error) {
                    callback(false)
                }
            })
    })
}
exports.actOrDeactUser = (req,callback) =>{
    var User = app.locals.User;
    var id = req.body.id;
    var status = req.body.status;
    console.log(status)
    if(!id) {
        res.status(400).send("We'r sorry required parameter missing.")
    }
    User.update({
		status: (status == 'true') ? 1 : 0,
	},
	{
		where:{
			id: id
		}
	}).then( result => {
		callback(true)
	}).catch(error => {
		callback(false)
	})

}



  
  