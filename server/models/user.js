'use strict';

const {hashedPass} = require('../helpers/hashedPass')

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class User extends Model{}
  User.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'name cant be empty'
        }
      }
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'email cant be empty'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'password cant be empty'
        }
      }
    },
  }, {hooks:{
    beforeSave(instance,option){
      hashedPass(instance)
    }
  },sequelize});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Card)
  };
  return User;
};