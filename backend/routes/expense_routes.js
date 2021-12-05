const express = require('express')
const router = express.Router();
const ExpenseRepository = require('../repository/ExpenseRepository')
const repository = new ExpenseRepository()


router.get('/', async (_, res) => {

    let expenses = await repository.findAll()
    
    resp = {
        status: 'OK',
        data: expenses
    }
    res.status(200).json(resp)
})

router.get('/:id', async (req, res) => {
    let id = req.params.id
    let expense = await repository.findById(id)

    if(expense == undefined){
        resp = {
            status: 'ERROR',
            data: 'Despesa não encontrada!'
        }
        res.status(404).json(resp)
    }

    resp = {
        status: 'OK',
        data: expense
    }
    res.status(200).json(resp)
})

router.post('/', async (req, res) => {

    if(req.body.value == undefined || req.body.description == undefined || req.body.UserId == undefined){
        resp = {
            status: 'ERROR',
            data: 'Campos value, description e UserId devem ser preenchidos'
        }
        res.status(400).json(resp)
    }

    let new_expense = await repository.insert(req.body)
    
    resp = {
        status: 'OK',
        data: new_expense
    }
    res.status(200).json(resp)
})

router.delete('/:id', async (req, res) => {

    let id = req.params.id
    let expense = await repository.findById(id)

    if(expense == undefined){
        resp = {
            status: 'ERROR',
            data: 'Despesa não encontrada!'
        }
        res.status(404).json(resp)
    }
    let delete_expense = await repository.delete(id)
    resp = {
        status: 'OK',
        data: delete_expense
    }
    res.status(200).json(resp)

})

router.put('/', async (req, res) => {

    let id = req.body.id
    let expense = await repository.findById(id)

    if(expense == undefined){
        resp = {
            status: 'ERROR',
            data: 'Despesa não encontrado!'
        }
        res.status(404).json(resp)
    }

    let update_expense = await repository.update(req.body)
    resp = {
        status: 'OK',
        data: update_expense
    }
    res.status(200).json(resp)

})


module.exports = router