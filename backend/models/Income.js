const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database_connection')
const User = require('./User')

class Income extends Model {}
Income.init({
    value:{ 
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    description:{ 
        type: DataTypes.STRING,
        allowNull: false
    }
},{ sequelize, modelName: 'Income', tableName: 'income' });

module.exports = Income;