const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database_connection')

class Expense extends Model {}
Expense.init({
    value:{ 
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    description:{ 
        type: DataTypes.STRING,
        allowNull: false
    },
},{ sequelize, modelName: 'Expense', tableName: 'expenses' });

module.exports = Expense;