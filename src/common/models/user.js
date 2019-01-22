
module.exports.authenticate = function (username,password,done,app) {
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
module.exports.serializeUser = function (user, done) {
    done(null, user.id);
}
module.exports.deserializeUser = function (id, done, app) {
    var User = app.locals.User;
    User.findOne({where: {id: id}}).then(function (user, err) {
        done(err, user);
    })
}
