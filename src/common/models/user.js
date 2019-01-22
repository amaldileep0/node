var app = require('../../../src/app');
exports.authenticate = function (username,password,done) {
    const bcrypt = require('bcrypt');
    var User = app.locals.User;
    // search for attributes
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
exports.getUsers = ()=> {
    var User = app.locals.User;
    User.findAll().then(function(users,err){
        if (err) {
            return null;
        }
        return (JSON.stringify(users))
    })
}
