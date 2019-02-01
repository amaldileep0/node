module.exports = (Sequelize, sequelize) => {
    const User = sequelize.define('user', {
            id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            emailid: {
                type: Sequelize.STRING
            },
            password: {
                type :Sequelize.STRING
            },
            status : {
                type:Sequelize.INTEGER(6)
            },
            mobile_no: {
                type: Sequelize.STRING(45)
            },
            created_at:{
                type: Sequelize.DATE
            },
            updated_at: {
                type: Sequelize.DATE
            },
            password_reset_token: {
                type: Sequelize.STRING
            },
            first_name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING(100)
            }
        },{
            timestamps: false,
            freezeTableName: true
        }
    );
  return User;    
}
