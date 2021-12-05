const income = require('../models/Income')

class IncomeRepository{
    insert(obj){
        const new_income = income.create({ ...obj })
        return new_income
    }
    async update(obj){
        const update_income = await income.update({ ...obj }, { where: { id: obj.id } })
        return update_income
    }
    async delete(id){
        const delete_income = await income.findByPk(id)
        delete_income.destroy()
    }
    findById(id){
        const _income = income.findByPk(id)
        return _income
    }
    findByUserId(userId){
        const _incomes = income.findAll({ where: { UserId: userId } })
        return _incomes
    }
    findAll(){
        return income.findAll()
    }
}

module.exports = IncomeRepository;