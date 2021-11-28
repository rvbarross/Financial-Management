const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mariadb',
});

try {
    await sequelize.authenticate();
    console.log('Connection successfull!');
}
catch (error) {
    console.error('Unable to connect to the database!', error);
}
