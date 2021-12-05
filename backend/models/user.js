const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database_connection')
const Expense = require('./Expense')
const Income = require('./Income')

class User extends Model {}
User.init({
    username:{ 
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{ sequelize, modelName: 'User', tableName: 'users' });

User.hasMany(Expense)
User.hasMany(Income)

Income.belongsTo(User)
Expense.belongsTo(User)

module.exports = User;