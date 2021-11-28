const { Model, DataTypes } = require('sequelize');

class User extends Model { }
User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
},{ sequelize, modelName: 'user' });

(async () => {
    await sequelize.sync();
    const rUser = await User.create({
        username: 'defend_scotland',
        email: 'william_walace@braveheart.com',
    });
    console.log(rUser.toJSON());
});