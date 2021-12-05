const Expense = require('../models/Expense')

class ExpenseRepository{
    insert(obj){
        const new_expense = Expense.create({ ...obj })
        return new_expense
    }
    async update(obj){
        const update_expense = await Expense.update({ ...obj }, { where: { id: obj.id } })
        return update_expense
    }
    async delete(id){
        const delete_expense = await Expense.findByPk(id)
        delete_expense.destroy()
    }
    findById(id){
        const _expense = Expense.findByPk(id)
        return _expense
    }
    findByUserId(userId){
        const _expenses = Expense.findAll({ where: { UserId: userId } })
        return _expenses
    }
    findAll(){
        return Expense.findAll()
    }
}

module.exports = ExpenseRepository;