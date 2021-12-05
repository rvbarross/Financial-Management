const user = require('../models/User')

class UserRepository{
    insert(obj){
        const new_user = user.create({ ...obj })
        return new_user
    }
    async update(obj){
        const update_user = await user.update({ ...obj }, { where: { id: obj.id } })
        return update_user
    }
    async delete(id){
        const delete_user = await user.findByPk(id)
        delete_user.destroy()
    }
    findById(id){
        const _user = user.findByPk(id)
        return _user
    }
    findByUsername(username){
        return user.findAll({ where: { username: username } })
    }
    findAll(){
        return user.findAll()
    }
}

module.exports = UserRepository;