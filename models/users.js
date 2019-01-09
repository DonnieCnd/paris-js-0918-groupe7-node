'use strict';

module.exports = (sequelize, DataTypes) => {
  const bcrypt = require("bcrypt");
  const users = sequelize.define('users', {
    email: {type : DataTypes.STRING, allowNull : false},
    password: {type : DataTypes.STRING, allowNull : false},
    reset_pass_token: {type : DataTypes.STRING, allowNull : true},
    gender: {type : DataTypes.ENUM('male', 'female'), allowNull : false},
    age_range: {type : DataTypes.ENUM('-30','30-39','40-49', '50-59', '60+'), allowNull : false},
    seniority: {type : DataTypes.ENUM('-5','5-9','10-14','15-19', '20+'), allowNull : false},
    role: {type : DataTypes.ENUM('client','admin','super_admin'), allowNull : false},
    is_active: {type : DataTypes.BOOLEAN , allowNull : false},
    business_focus: {type : DataTypes.ENUM('Corporate and Investment banking','Fintech and start-up','Insurance','Private Banking','Retail Banking', 'Specialized Financial Services') , allowNull : false},
  }, {
    // hooks: {
    //   beforeCreate : (user) => {
    //     const salt = bcrypt.genSaltSync();
    //     user.password = bcrypt.hashSync(user.password, salt)
    //   }
    // },
    // instanceMethods: {
    //   validPassword : function(password){
    //     return bcrypt.compareSync(password, this.password)
    //   }
    // }
  });
  // users.beforeSave((user, options) => {
  //   return bcrypt.hashSync(user.password, 10)
  //     .then(bcryptedPassword => {
  //         user.password = bcryptedPassword;
  //     })
  //     .catch(err => {
  //       throw new Error();
  //     });
  // });
  users.associate = function(models) {
    // associations can be defined here
    users.belongsTo(models.companies, {
      foreignKey : {
        allowNull : false,
      }
    });
    users.belongsTo(models.agencies, {
      foreignKey : {
        allowNull : false,
      }
    });
    users.belongsTo(models.poles, {
      foreignKey : {
        allowNull : false,
      }
    });
    users.hasMany(models.users_answers_possibilities_questions, {
      foreignKey : {
        primaryKey : true,
        allowNull : false,
      }
    });
  };
  return users;
};