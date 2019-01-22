var Sequelize = require('sequelize');
const config = require('config');
var sequelize = null;

var ormConnection = function(app){
    var db = config.get('db');
    sequelize = new Sequelize(db.name, db.user, db.password, {
        host: db.host,
        port: db.port,
        dialect: 'mysql',
        logging: true,
        raw: true,
        pool: {
            max: 5,
            min: 1,
            idle: 10000,
            acquire: 10000,
            evict: 60000,
            handleDisconnects: true
        },
    });
    app.locals.sequelize = sequelize;
}
module.exports.ormConnection = ormConnection;
var User = function (app){
    var User = require('./common/models/orm/user')(Sequelize, sequelize);
    app.locals.User = User;
}
module.exports.User = User;


