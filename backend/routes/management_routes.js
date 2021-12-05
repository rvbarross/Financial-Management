const express = require('express')
const router = express.Router()
const ExpenseRepository = require('../repository/ExpenseRepository')
const IncomeRepository = require('../repository/IncomeRepository')
const repositoryE = new ExpenseRepository()
const repositoryI = new IncomeRepository()

router.get('/expenses', async (req, res) => {
    let expenses = await repositoryE.findByUserId(req.user.id)
    res.render('pages/expenses', { user: req.user, expenses: expenses })
})

router.get('/incomes', async (req, res) => {
    let incomes = await repositoryI.findByUserId(req.user.id)
    res.render('pages/incomes', { user: req.user, incomes: incomes })
})

router.get('/expenses/new', async (req, res) => {
    let options = {
        formName: 'New Expense',
        buttonName: 'Register',
        expense: null,
        url: '/management/expenses/new'
    }

    res.render('pages/expense_new', { option: options, user: req.user, error: null })
})

router.get('/incomes/new', async (req, res) => {
    let options = {
        formName: 'New Income',
        buttonName: 'Register',
        income: null,
        url: '/management/incomes/new'
    }

    res.render('pages/income_new', { option: options, user: req.user, error: null })
})

router.post('/expenses/new', async (req, res) => {
    let value = req.body.value
    let description = req.body.description

    let options = {
        formName: 'New Expense',
        buttonName: 'Register',
        income: null,
        url: '/management/expenses/new'
    }

    if(value.length > 0 && description.length > 0){
        
        let exp = { value: value, description: description, UserId: req.user.id }
        repositoryE.insert(exp)
        res.redirect('/management/expenses')
        
    } else {
        let error = {
            message: "Name's and description's field obrigatory"
        }
        res.render('pages/expense_new', { option: options, user: req.user, error: error })
    }
})

router.post('/incomes/new', async (req, res) => {
    let value = req.body.value
    let description = req.body.description

    let options = {
        formName: 'New Incomee',
        buttonName: 'Register',
        income: null,
        url: '/dashboard/incomes/new'
    }

    if(value.length > 0 && description.length > 0){
        
        let inc = { value: value, description: description, UserId: req.user.id }
        repositoryI.insert(inc)
        res.redirect('/management/incomes')
        
    } else {
        let error = {
            message: "Name's and description's field obrigatory"
        }
        res.render('pages/income_new', { option: options, user: req.user, error: error })
    }
})

router.post('/expenses/edit', async (req, res) => {
    let id = parseInt(req.body.id)
    let value = req.body.value
    let description = req.body.description
    let expense = await repositoryE.findById(id)

    let options = {
        formName: 'Edit Income',
        buttonName: 'Edit',
        expense: expense,
        url: '/management/expenses/edit'
    }

    if(value.length > 0 || description.length > 0){
        let exp = {id: id, value: value, description: description, UserId: req.user.id }

        repositoryE.update(exp)

        res.redirect('/management/expenses')
    } else {
        let error = {
            message: "Fields can not be empty"
        }
        res.render('pages/expense_edit', { option: options, user: req.user, error: error })
    }

})

router.post('/incomes/edit', async (req, res) => {
    let id = parseInt(req.body.id)
    let value = req.body.value
    let description = req.body.description
    let income = await repositoryI.findById(id)

    let options = {
        formName: 'Edit Income',
        buttonName: 'Edit',
        income: income,
        url: '/management/incomes/edit'
    }

    if(value.length > 0 || description.length > 0){
        let inc = {id: id, value: value, description: description, UserId: req.user.id }

        repositoryI.update(inc)

        res.redirect('/management/incomes')
    } else {
        let error = {
            message: "Fields can not be empty"
        }
        res.render('pages/income_edit', { option: options, user: req.user, error: error })
    }

})

router.get('/expenses/edit/:id', async (req, res) => {
    let id = req.params.id
    let expense = await repositoryE.findById(id)

    let options = {
        formName: 'Edit Expense',
        buttonName: 'Edit',
        expense: expense,
        url: '/management/expenses/edit'
    }

    res.render('pages/expense_edit', { option: options, user: req.user, error: null })
})

router.get('/incomes/edit/:id', async (req, res) => {
    let id = req.params.id
    let income = await repositoryI.findById(id)

    let options = {
        formName: 'Edit Income',
        buttonName: 'Edit',
        income: income,
        url: '/management/incomes/edit'
    }

    res.render('pages/income_edit', { option: options, user: req.user, error: null })
})

router.post('/expenses/remove/:id', async (req, res) =>{
    let id = req.params.id
    repositoryE.delete(id)
    res.redirect('/management/expenses')
})

router.post('/incomes/remove/:id', async (req, res) =>{
    let id = req.params.id
    repositoryI.delete(id)
    res.redirect('/management/incomes')
})

module.exports = router